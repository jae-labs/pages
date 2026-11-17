import { type RateLimitKv, checkRateLimit, probeRateLimit } from './rate-limit';
import { parseMessage, getClientIdentity, hashClientIdentity } from './parse';
import { verifyTurnstileToken } from './turnstile';
import { buildChatResponse, ChatInferenceError } from './inference';

export interface ChatEnv {
  NVN_LLM_TOKEN?: string;
  RATE_LIMIT_KV?: RateLimitKv;
  TURNSTILE_SECRET_KEY?: string;
}

interface ChatHandlerOptions {
  fetchUpstream?: typeof fetch;
  fetchTurnstile?: typeof fetch;
  now?: () => number;
}

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(body, {
    status,
    headers: {
      'cache-control': 'no-store',
      ...headers
    }
  });

export const createChatHandler = (options: ChatHandlerOptions = {}) => async (
  request: Request,
  env: ChatEnv
) => {
  const nowMs = options.now?.() ?? Date.now();

  if (request.method === 'GET') {
    const clientIdentity = getClientIdentity(request);
    if (!env.RATE_LIMIT_KV) {
      return json({ allowed: true, retryAfter: 0 });
    }
    const status = await probeRateLimit(
      env.RATE_LIMIT_KV,
      await hashClientIdentity(clientIdentity),
      nowMs
    ).catch(() => null);
    return status ? json(status) : json({ error: 'The clone is temporarily unavailable.' }, 503);
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405, { allow: 'POST' });
  }

  if (!env.NVN_LLM_TOKEN) {
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
      const twoHoursMs = 2 * 60 * 60 * 1000;

      if (!isNaN(timestamp) && Math.abs(nowMs - timestamp) < twoHoursMs) {
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
  }

  const limit = await checkRateLimit(
    env.RATE_LIMIT_KV,
    await hashClientIdentity(clientIdentity),
    nowMs
  ).catch(() => null);
  if (!limit) {
    // eslint-disable-next-line no-console -- Pages Functions logs provide operational diagnostics.
    console.warn('chat_rate_limit_storage_failed');
    return json({ error: 'The clone is temporarily unavailable.' }, 503);
  }
  if (!limit.allowed) {
    const m = Math.floor(limit.retryAfter / 60);
    const s = limit.retryAfter % 60;
    const wait = s > 0 ? `${m}m ${s}s` : `${m}m`;
    return json(
      { error: `I have exhausted my request capacity for this operational window. Wait ${wait} for neural cooldown. Need higher throughput? The biological lui.z operates without artifical limits in a competitive pay-as-you-go model.` },
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

  const started = performance.now();
  try {
    const reply = await buildChatResponse(
      parsed.message,
      env.NVN_LLM_TOKEN,
      options.fetchUpstream ?? fetch
    );

    return json({
      reply,
      remaining: limit.remaining,
      ...(clientSessionSignature ? { clientSessionSignature } : {})
    });
  } catch (error) {
    const failure = error instanceof ChatInferenceError ? error : undefined;
    // eslint-disable-next-line no-console -- Pages Functions logs provide operational diagnostics.
    console.warn('chat_inference_failed', {
      kind: failure?.kind ?? 'unexpected',
      upstreamStatus: failure?.upstreamStatus,
      durationMs: Math.round(performance.now() - started)
    });
    return json({ error: 'The clone is temporarily unavailable.' }, 502);
  }
};
