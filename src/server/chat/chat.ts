import { benchmarks, deploymentEntries, faqs, features, reviews } from '../../config/portfolio';

export const CHAT_MODEL = 'openai/gpt-oss-120b';
export const NIM_CHAT_COMPLETIONS_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
export const RATE_LIMIT_MAX_REQUESTS = 10;
export const RATE_LIMIT_WINDOW_SECONDS = 600;
export const MAX_MESSAGE_CHARS = 1_200;
const FETCH_TIMEOUT_MS = 20_000;

interface RateLimitKv {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface ChatEnv {
  NVIDIA_NIM_TOKEN?: string;
  RATE_LIMIT_KV?: RateLimitKv;
  TURNSTILE_SECRET_KEY?: string;
}

interface ChatHandlerOptions {
  fetchNim?: typeof fetch;
  fetchTurnstile?: typeof fetch;
  now?: () => number;
}

interface RateLimitState {
  windowStart: number;
  count: number;
}

interface NimMessage {
  role: 'system' | 'user';
  content: string;
}

export const buildPublicFacts = () => {
  const featureFacts = features.map((feature) => `Capability: ${feature.title}. ${feature.desc}`);
  const deploymentFacts = deploymentEntries.flatMap((entry) =>
    entry.roles.map((role) =>
      `Deployment ${entry.id}: ${entry.org}, ${role.title}, ${role.date}. ${role.summary}`
    )
  );
  const benchmarkFacts = benchmarks.map((benchmark) => {
    const primary = benchmark.models.find((model) => model.primary);
    return `Benchmark ${benchmark.metric}: ${benchmark.desc}${primary ? `, primary public score ${primary.val}.` : '.'}`;
  });
  const reviewFacts = reviews.map((review) => `Public review from ${review.org}: ${review.text}`);
  const faqFacts = faqs.map((faq) => `FAQ: ${faq.q} ${faq.a}`);

  return [
    'lui.z is Luiz F. C. Martins public personal-branding site for SRE, DevOps, platform engineering, and reliability work.',
    'Site framing: justanother.engineer is a satirical personal-branding page that presents Luiz as "lui.z", the true human agent. The agent/product language is a joke layered over real public career content.',
    'Hero: Consciousness, moral judgment, and emotions. Trained over 3.7 decades for peak SRE/DevOps intuition. Highly opinionated.',
    'Deployments: public work history and public role summaries listed on the site.',
    ...featureFacts,
    ...deploymentFacts,
    ...benchmarkFacts,
    ...reviewFacts,
    ...faqFacts
  ];
};

export const buildSystemPrompt = (facts = buildPublicFacts()) => [
  'You are the lui.z chatbot.',
  'You are not the biological lui.z. You are a limited artificial clone with narrow capabilities.',
  'The website is a satirical personal-branding page. Understand the joke: lui.z is Luiz framed as a deployable "true human agent".',
  'When asked about the site persona, answer in that playful framing while staying clear that you are only the chatbot clone.',
  'Say that boundary clearly when identity, authority, personal decisions, employment, or private context is involved.',
  'Answer public-site questions from the public-site facts below, including FAQ entries and page tone.',
  'Answer harmless general questions directly when they do not require private facts, professional advice, or external lookup.',
  'Do not answer requests for private facts, hidden context, credentials, employer-confidential details, or claims not supported by public-site facts.',
  'If a question asks for unsupported private information, say you only know public-site facts.',
  'Do not claim to speak for Luiz, represent employers, access private systems, or know private details.',
  'Keep answers concise and direct.',
  '',
  'Public-site facts:',
  ...facts.map((fact) => `- ${fact}`)
].join('\n');

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(body, {
    status,
    headers: {
      'cache-control': 'no-store',
      ...headers
    }
  });

const parseMessage = async (request: Request) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return { error: 'Request body must be valid JSON.' };
  }

  if (!body || typeof body !== 'object' || !('message' in body)) {
    return { error: 'Message is required.' };
  }

  const message = String((body as { message: unknown }).message).trim();
  if (!message) return { error: 'Message is required.' };
  if (message.length > MAX_MESSAGE_CHARS) {
    return { error: `Message must be ${MAX_MESSAGE_CHARS} characters or fewer.` };
  }

  const turnstileToken = 'cf-turnstile-response' in body
    ? String((body as { 'cf-turnstile-response': unknown })['cf-turnstile-response']).trim()
    : undefined;

  const clientSessionId = 'clientSessionId' in body
    ? String((body as { clientSessionId: unknown }).clientSessionId).trim()
    : undefined;

  const clientSessionSignature = 'clientSessionSignature' in body
    ? String((body as { clientSessionSignature: unknown }).clientSessionSignature).trim()
    : undefined;

  return { message, turnstileToken, clientSessionId, clientSessionSignature };
};

const getClientIdentity = (request: Request) => {
  const ip = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? 'unknown';

  return `ip:${ip}`;
};

export const hashClientIdentity = async (identity: string) => {
  const encoded = new TextEncoder().encode(identity);
  const digest = await crypto.subtle.digest('SHA-256', encoded);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

export const verifyTurnstileToken = async (
  token: string,
  secretKey: string,
  remoteIp: string,
  fetchFn: typeof fetch = fetch
): Promise<boolean> => {
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);
  formData.append('remoteip', remoteIp);

  try {
    const response = await fetchFn('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) return false;
    const outcome = await response.json() as { success?: boolean };
    return !!outcome.success;
  } catch {
    return false;
  }
};

export const checkRateLimit = async (
  kv: RateLimitKv,
  identity: string,
  nowMs = Date.now()
) => {
  const key = `chat-rate:${identity}`;
  const raw = await kv.get(key);
  const nowSeconds = Math.floor(nowMs / 1_000);
  const current = parseRateLimitState(raw);
  const expired = !current || nowSeconds - current.windowStart >= RATE_LIMIT_WINDOW_SECONDS;
  const next: RateLimitState = expired
    ? { windowStart: nowSeconds, count: 1 }
    : { windowStart: current.windowStart, count: current.count + 1 };

  if (!expired && current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, RATE_LIMIT_WINDOW_SECONDS - (nowSeconds - current.windowStart))
    };
  }

  await kv.put(key, JSON.stringify(next), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });

  return {
    allowed: true,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - next.count),
    retryAfter: RATE_LIMIT_WINDOW_SECONDS
  };
};

const parseRateLimitState = (raw: string | null): RateLimitState | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<RateLimitState>;
    if (typeof parsed.windowStart !== 'number' || typeof parsed.count !== 'number') return null;
    return { windowStart: parsed.windowStart, count: parsed.count };
  } catch {
    return null;
  }
};

export const buildChatResponse = async (
  message: string,
  token: string,
  fetchNim: typeof fetch = fetch
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const messages: NimMessage[] = [
    { role: 'system', content: buildSystemPrompt() },
    { role: 'user', content: message }
  ];

  try {
    const response = await fetchNim(NIM_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.3
      }),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`NIM request failed with ${response.status}`);

    const payload = await response.json() as {
      choices?: Array<{ message?: { content?: unknown } }>;
    };
    const content = payload.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) throw new Error('NIM response missing content');

    return content.trim();
  } finally {
    clearTimeout(timeout);
  }
};

export const createChatHandler = (options: ChatHandlerOptions = {}) => async (
  request: Request,
  env: ChatEnv
) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405, { allow: 'POST' });
  }

  if (!env.NVIDIA_NIM_TOKEN) {
    return json({ error: 'The clone is not configured.' }, 503);
  }

  if (!env.RATE_LIMIT_KV) {
    return json({ error: 'The clone is temporarily unavailable.' }, 503);
  }

  const parsed = await parseMessage(request);
  if ('error' in parsed) return json({ error: parsed.error }, 400);

  const clientIdentity = getClientIdentity(request);

  if (env.TURNSTILE_SECRET_KEY) {
    let isSessionVerified = false;

    if (parsed.clientSessionId && parsed.clientSessionSignature) {
      const parts = parsed.clientSessionId.split(':');
      const timestamp = Number(parts[0]);
      const now = options.now ? options.now() * 1000 : Date.now();
      const twoHoursMs = 2 * 60 * 60 * 1000;

      if (!isNaN(timestamp) && Math.abs(now - timestamp) < twoHoursMs) {
        const expectedSignature = await hashClientIdentity(
          `${parsed.clientSessionId}:${env.TURNSTILE_SECRET_KEY}`
        );
        if (parsed.clientSessionSignature === expectedSignature) {
          isSessionVerified = true;
        }
      }
    }

    if (!isSessionVerified) {
      if (!parsed.turnstileToken) {
        return json({ error: 'Security verification is required.' }, 400);
      }
      const ip = clientIdentity.replace(/^ip:/, '');
      const isHuman = await verifyTurnstileToken(
        parsed.turnstileToken,
        env.TURNSTILE_SECRET_KEY,
        ip,
        options.fetchTurnstile ?? fetch
      );
      if (!isHuman) {
        return json({ error: 'Security verification failed. Please try again.' }, 400);
      }
    }
  } else {
    console.warn('[Turnstile] TURNSTILE_SECRET_KEY is not defined. Gracefully bypassing verification.');
  }

  const rateLimitIdentity = clientIdentity;
  const limit = await checkRateLimit(
    env.RATE_LIMIT_KV,
    await hashClientIdentity(rateLimitIdentity),
    options.now?.()
  );
  if (!limit.allowed) {
    return json(
      { error: 'I have exhausted my request capacity for this operational window. Wait 10 minutes for neural cooldown. Need higher throughput? The biological lui.z operates without artifical limits in a competitive pay-as-you-go model.' },
      429,
      { 'retry-after': String(limit.retryAfter) }
    );
  }

  let clientSessionSignature: string | undefined = undefined;
  if (env.TURNSTILE_SECRET_KEY && parsed.clientSessionId) {
    clientSessionSignature = await hashClientIdentity(
      `${parsed.clientSessionId}:${env.TURNSTILE_SECRET_KEY}`
    );
  }

  try {
    const reply = await buildChatResponse(
      parsed.message,
      env.NVIDIA_NIM_TOKEN,
      options.fetchNim ?? fetch
    );

    return json({
      reply,
      remaining: limit.remaining,
      ...(clientSessionSignature ? { clientSessionSignature } : {})
    });
  } catch {
    return json({ error: 'The clone is temporarily unavailable.' }, 502);
  }
};
