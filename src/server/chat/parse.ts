export const MAX_MESSAGE_CHARS = 1_200;

export interface ParsedMessage {
  message: string;
  turnstileToken?: string;
  clientSessionId?: string;
  clientSessionSignature?: string;
}

export interface ParseError {
  error: string;
}

export const parseMessage = async (request: Request): Promise<ParsedMessage | ParseError> => {
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

export const getClientIdentity = (request: Request): string => {
  const ip = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? 'unknown';

  return `ip:${ip}`;
};

export const hashClientIdentity = async (identity: string): Promise<string> => {
  const encoded = new TextEncoder().encode(identity);
  const digest = await crypto.subtle.digest('SHA-256', encoded);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};
