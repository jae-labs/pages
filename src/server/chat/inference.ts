import { buildSystemPrompt } from "./facts";

export const CHAT_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";
export const UPSTREAM_CHAT_COMPLETIONS_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";

const FETCH_TIMEOUT_MS = 20_000;

export class ChatInferenceError extends Error {
  constructor(
    readonly kind: "timeout" | "transport" | "http" | "invalid_response",
    readonly upstreamStatus?: number,
  ) {
    super(kind);
  }
}

interface UpstreamMessage {
  role: "system" | "user";
  content: string;
}

export const buildChatResponse = async (
  message: string,
  token: string,
  fetchUpstream: typeof fetch = fetch,
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const messages: UpstreamMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    { role: "user", content: message },
  ];

  try {
    const response = await fetchUpstream(UPSTREAM_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.3,
        chat_template_kwargs: { enable_thinking: false },
      }),
      signal: controller.signal,
    });

    if (!response.ok) throw new ChatInferenceError("http", response.status);

    const payload = (await response.json().catch(() => {
      throw new ChatInferenceError("invalid_response", response.status);
    })) as { choices?: Array<{ message?: { content?: unknown } }> } | null;
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      throw new ChatInferenceError("invalid_response", response.status);
    }

    return content.trim();
  } catch (error) {
    if (controller.signal.aborted) throw new ChatInferenceError("timeout");
    if (error instanceof ChatInferenceError) throw error;
    throw new ChatInferenceError("transport");
  } finally {
    clearTimeout(timeout);
  }
};
