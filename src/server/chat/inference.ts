import { buildSystemPrompt } from "./facts";

export const CHAT_MODEL = "openai/gpt-oss-20b";
export const UPSTREAM_CHAT_COMPLETIONS_URL =
  "https://integrate.api.nvidia.com/v1/chat/completions";

const FETCH_TIMEOUT_MS = 20_000;

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
      }),
      signal: controller.signal,
    });

    if (!response.ok)
      throw new Error(`Upstream request failed with ${response.status}`);

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: unknown } }>;
    };
    const content = payload.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim())
      throw new Error("Upstream response missing content");

    return content.trim();
  } finally {
    clearTimeout(timeout);
  }
};
