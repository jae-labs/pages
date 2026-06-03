export const RATE_LIMIT_MAX_REQUESTS = 10;
export const RATE_LIMIT_WINDOW_SECONDS = 600;

export interface RateLimitKv {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface RateLimitState {
  windowStart: number;
  count: number;
}

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

export const probeRateLimit = async (
  kv: RateLimitKv,
  identity: string,
  nowMs = Date.now()
): Promise<{ retryAfter: number; allowed: boolean }> => {
  const key = `chat-rate:${identity}`;
  const raw = await kv.get(key);
  const nowSeconds = Math.floor(nowMs / 1_000);
  const current = parseRateLimitState(raw);
  if (!current || nowSeconds - current.windowStart >= RATE_LIMIT_WINDOW_SECONDS) {
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, RATE_LIMIT_WINDOW_SECONDS - (nowSeconds - current.windowStart))
    };
  }
  return { allowed: true, retryAfter: 0 };
};
