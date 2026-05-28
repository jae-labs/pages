import { describe, expect, test, vi } from 'vitest';
import {
  CHAT_MODEL,
  RATE_LIMIT_MAX_REQUESTS,
  buildChatResponse,
  buildPublicFacts,
  buildSystemPrompt,
  checkRateLimit,
  createChatHandler,
  hashClientIdentity,
  verifyTurnstileToken
} from './chat';

const jsonRequest = (body: unknown, headers: HeadersInit = {}) =>
  new Request('https://justanother.engineer/api/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  });

const readJson = async <T>(response: Response) => response.json() as Promise<T>;

const createKv = (initial: Record<string, string> = {}) => {
  const values = new Map(Object.entries(initial));

  return {
    values,
    async get(key: string) {
      return values.get(key) ?? null;
    },
    async put(key: string, value: string) {
      values.set(key, value);
    }
  };
};

describe('chat public facts', () => {
  test('builds prompt with clone disclaimer and public-site-only boundary', () => {
    const prompt = buildSystemPrompt(['lui.z publishes public SRE and DevOps portfolio facts.']);

    expect(prompt).toContain('not the biological lui.z');
    expect(prompt).toContain('limited artificial clone');
    expect(prompt).toContain('public-site facts');
    expect(prompt).toContain('satirical personal-branding page');
    expect(prompt).toContain('Answer harmless general questions directly');
    expect(prompt).toContain('Do not answer requests for private facts');
    expect(prompt).toContain('lui.z publishes public SRE and DevOps portfolio facts.');
  });

  test('derives non-empty facts from public portfolio content', () => {
    const facts = buildPublicFacts();

    expect(facts.length).toBeGreaterThan(5);
    expect(facts.join('\n')).toContain('lui.z');
    expect(facts.join('\n')).toContain('Deployments');
    expect(facts.join('\n')).toContain('FAQ: Does lui.z make mistakes? Yes. The unit is highly capable but not infallible.');
    expect(facts.join('\n')).toContain('25 days of annual offline status');
  });
});

describe('chat rate limiting', () => {
  test('allows requests below the fixed-window limit', async () => {
    const kv = createKv();

    const result = await checkRateLimit(kv, 'ip:203.0.113.10', 1_000);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(RATE_LIMIT_MAX_REQUESTS - 1);
  });

  test('blocks requests after the fixed-window limit', async () => {
    const kv = createKv({
      'chat-rate:ip:203.0.113.10': JSON.stringify({
        windowStart: 1_000,
        count: RATE_LIMIT_MAX_REQUESTS
      })
    });

    const result = await checkRateLimit(kv, 'ip:203.0.113.10', 2_000);

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });
});

describe('chat API handler', () => {
  test('rejects invalid request bodies before calling NIM', async () => {
    const fetchNim = vi.fn();
    const handler = createChatHandler({ fetchNim });

    const response = await handler(jsonRequest({ message: '' }), {
      NVIDIA_NIM_TOKEN: 'token',
      RATE_LIMIT_KV: createKv()
    });

    expect(response.status).toBe(400);
    expect(fetchNim).not.toHaveBeenCalled();
  });

  test('sends constrained public-facts prompt to NVIDIA NIM', async () => {
    const fetchNim = vi.fn().mockResolvedValue(
      Response.json({
        choices: [{ message: { content: 'I am a limited artificial clone of lui.z.' } }]
      })
    );
    const handler = createChatHandler({ fetchNim, now: () => 1_000 });

    const response = await handler(jsonRequest({ message: 'What do you do?' }), {
      NVIDIA_NIM_TOKEN: 'token',
      RATE_LIMIT_KV: createKv()
    });
    const body = await readJson<{ reply: string }>(response);
    const [, requestInit] = fetchNim.mock.calls[0] as [string, RequestInit];
    const requestBody = JSON.parse(String(requestInit.body)) as {
      model: string;
      messages: Array<{ role: string; content: string }>;
    };

    expect(response.status).toBe(200);
    expect(body.reply).toContain('limited artificial clone');
    expect(fetchNim).toHaveBeenCalledWith(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          authorization: 'Bearer token'
        })
      })
    );
    expect(requestBody.model).toBe(CHAT_MODEL);
    expect(requestBody.messages[0]?.content).toContain('public-site facts');
    expect(requestBody.messages[1]).toEqual({ role: 'user', content: 'What do you do?' });
  });

  test('returns 429 when the KV limit is exhausted', async () => {
    const fetchNim = vi.fn();
    const handler = createChatHandler({ fetchNim, now: () => 2_000 });
    const identityHash = await hashClientIdentity('ip:198.51.100.7');
    const kv = createKv({
      [`chat-rate:${identityHash}`]: JSON.stringify({
        windowStart: 1_000,
        count: RATE_LIMIT_MAX_REQUESTS
      })
    });

    const response = await handler(
      jsonRequest({ message: 'hello' }, { 'cf-connecting-ip': '198.51.100.7' }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: kv
      }
    );

    expect(response.status).toBe(429);
    const body = await readJson<{ error: string }>(response);
    expect(body.error).toBe('I have exhausted my request capacity for this operational window. Wait 10 minutes for neural cooldown. Need higher throughput? The biological lui.z operates without artifical limits in a competitive pay-as-you-go model.');
    expect(fetchNim).not.toHaveBeenCalled();
  });

  test('rate limits by IP even when clientSessionId is provided', async () => {
    const fetchNim = vi.fn();
    const handler = createChatHandler({ fetchNim, now: () => 2_000 });
    const ipHash = await hashClientIdentity('ip:198.51.100.7');
    const kv = createKv({
      [`chat-rate:${ipHash}`]: JSON.stringify({
        windowStart: 1_000,
        count: RATE_LIMIT_MAX_REQUESTS
      })
    });

    const response = await handler(
      jsonRequest({ message: 'hello', clientSessionId: 'session-12345' }, { 'cf-connecting-ip': '198.51.100.7' }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: kv
      }
    );

    expect(response.status).toBe(429);
    const body = await readJson<{ error: string }>(response);
    expect(body.error).toBe('I have exhausted my request capacity for this operational window. Wait 10 minutes for neural cooldown. Need higher throughput? The biological lui.z operates without artifical limits in a competitive pay-as-you-go model.');
    expect(fetchNim).not.toHaveBeenCalled();
  });

  test('maps NVIDIA NIM failures to a safe gateway error', async () => {
    const fetchNim = vi.fn().mockResolvedValue(Response.json({ error: 'bad upstream' }, { status: 500 }));
    const handler = createChatHandler({ fetchNim, now: () => 1_000 });

    const response = await handler(jsonRequest({ message: 'hello' }), {
      NVIDIA_NIM_TOKEN: 'token',
      RATE_LIMIT_KV: createKv()
    });
    const body = await readJson<{ error: string }>(response);

    expect(response.status).toBe(502);
    expect(body.error).toBe('The clone is temporarily unavailable.');
  });
});

describe('NIM response parsing', () => {
  test('extracts assistant text from chat completions payload', async () => {
    const response = await buildChatResponse(
      'hello',
      'token',
      vi.fn().mockResolvedValue(
        Response.json({
          choices: [{ message: { content: 'Public answer.' } }]
        })
      )
    );

    expect(response).toBe('Public answer.');
  });
});

describe('Turnstile captcha verification', () => {
  test('verifyTurnstileToken returns true when siteverify succeeds', async () => {
    const fetchTurnstile = vi.fn().mockResolvedValue(
      Response.json({ success: true })
    );

    const result = await verifyTurnstileToken(
      'token-abc',
      'secret-key-123',
      '203.0.113.10',
      fetchTurnstile
    );

    expect(result).toBe(true);
    expect(fetchTurnstile).toHaveBeenCalledWith(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      expect.objectContaining({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
    );
  });

  test('verifyTurnstileToken returns false when siteverify fails', async () => {
    const fetchTurnstile = vi.fn().mockResolvedValue(
      Response.json({ success: false })
    );

    const result = await verifyTurnstileToken(
      'token-abc',
      'secret-key-123',
      '203.0.113.10',
      fetchTurnstile
    );

    expect(result).toBe(false);
  });

  test('createChatHandler rejects request if Turnstile token is missing and secret key is set', async () => {
    const fetchNim = vi.fn();
    const handler = createChatHandler({ fetchNim });

    const response = await handler(
      jsonRequest({ message: 'hello' }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ error: string }>(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('Security verification is required.');
    expect(fetchNim).not.toHaveBeenCalled();
  });

  test('createChatHandler rejects request if Turnstile token is invalid and secret key is set', async () => {
    const fetchNim = vi.fn();
    const fetchTurnstile = vi.fn().mockResolvedValue(
      Response.json({ success: false })
    );
    const handler = createChatHandler({ fetchNim, fetchTurnstile });

    const response = await handler(
      jsonRequest({ message: 'hello', 'cf-turnstile-response': 'invalid-token' }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ error: string }>(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('Security verification failed. Please try again.');
    expect(fetchNim).not.toHaveBeenCalled();
  });

  test('createChatHandler accepts request and calls NIM if Turnstile token is valid and secret key is set', async () => {
    const fetchNim = vi.fn().mockResolvedValue(
      Response.json({
        choices: [{ message: { content: 'Success reply.' } }]
      })
    );
    const fetchTurnstile = vi.fn().mockResolvedValue(
      Response.json({ success: true })
    );
    const handler = createChatHandler({ fetchNim, fetchTurnstile, now: () => 1_000 });

    const response = await handler(
      jsonRequest({ message: 'hello', 'cf-turnstile-response': 'valid-token' }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ reply: string }>(response);

    expect(response.status).toBe(200);
    expect(body.reply).toBe('Success reply.');
    expect(fetchNim).toHaveBeenCalled();
  });

  test('createChatHandler generates and returns a signature if valid Turnstile token and clientSessionId are provided', async () => {
    const fetchNim = vi.fn().mockResolvedValue(
      Response.json({
        choices: [{ message: { content: 'Success reply.' } }]
      })
    );
    const fetchTurnstile = vi.fn().mockResolvedValue(
      Response.json({ success: true })
    );
    const handler = createChatHandler({ fetchNim, fetchTurnstile, now: () => 1_000 });

    const sessionId = `${1_000 * 1000}:some-uuid`;
    const response = await handler(
      jsonRequest({ message: 'hello', 'cf-turnstile-response': 'valid-token', clientSessionId: sessionId }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ reply: string; clientSessionSignature: string }>(response);

    expect(response.status).toBe(200);
    expect(body.clientSessionSignature).toBeDefined();

    // Verify the returned signature is correct
    const expectedSig = await hashClientIdentity(`${sessionId}:secret`);
    expect(body.clientSessionSignature).toBe(expectedSig);
  });

  test('createChatHandler bypasses Turnstile verification when a valid clientSessionId and clientSessionSignature are provided', async () => {
    const fetchNim = vi.fn().mockResolvedValue(
      Response.json({
        choices: [{ message: { content: 'Success reply.' } }]
      })
    );
    const fetchTurnstile = vi.fn();
    const handler = createChatHandler({ fetchNim, fetchTurnstile, now: () => 1_000 });

    const sessionId = `${1_000 * 1000}:some-uuid`;
    const signature = await hashClientIdentity(`${sessionId}:secret`);

    const response = await handler(
      jsonRequest({
        message: 'hello',
        clientSessionId: sessionId,
        clientSessionSignature: signature
      }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ reply: string; clientSessionSignature: string }>(response);

    expect(response.status).toBe(200);
    expect(body.reply).toBe('Success reply.');
    expect(body.clientSessionSignature).toBe(signature);
    expect(fetchTurnstile).not.toHaveBeenCalled();
    expect(fetchNim).toHaveBeenCalled();
  });

  test('createChatHandler rejects request if the clientSessionSignature is invalid', async () => {
    const fetchNim = vi.fn();
    const fetchTurnstile = vi.fn();
    const handler = createChatHandler({ fetchNim, fetchTurnstile, now: () => 1_000 });

    const sessionId = `${1_000 * 1000}:some-uuid`;
    const response = await handler(
      jsonRequest({
        message: 'hello',
        clientSessionId: sessionId,
        clientSessionSignature: 'wrong-signature'
      }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ error: string }>(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('Security verification is required.');
    expect(fetchTurnstile).not.toHaveBeenCalled();
    expect(fetchNim).not.toHaveBeenCalled();
  });

  test('createChatHandler rejects request if the session timestamp is expired', async () => {
    const fetchNim = vi.fn();
    const fetchTurnstile = vi.fn();
    // Server time is 1,000s, but session timestamp is from 2 hours and 1 minute ago
    const handler = createChatHandler({ fetchNim, fetchTurnstile, now: () => 1_000 });

    const expiredTimestamp = (1_000 - 7260) * 1000;
    const sessionId = `${expiredTimestamp}:some-uuid`;
    const signature = await hashClientIdentity(`${sessionId}:secret`);

    const response = await handler(
      jsonRequest({
        message: 'hello',
        clientSessionId: sessionId,
        clientSessionSignature: signature
      }),
      {
        NVIDIA_NIM_TOKEN: 'token',
        RATE_LIMIT_KV: createKv(),
        TURNSTILE_SECRET_KEY: 'secret'
      }
    );
    const body = await readJson<{ error: string }>(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('Security verification is required.');
    expect(fetchTurnstile).not.toHaveBeenCalled();
    expect(fetchNim).not.toHaveBeenCalled();
  });
});
