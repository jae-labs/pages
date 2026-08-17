# Chatbot

## Role

The floating chatbot is a satirical clone of `lui.z`, not a general assistant and not the biological person.

## Behavior Contract

- It must state that it is a limited artificial clone.
- It answers from public-site facts only.
- It should avoid implying access to private memory, confidential history, or internal systems.
- It should keep provider wording generic in user-facing copy and documentation.

## Runtime Path

- UI shell: `src/components/landing/ChatBot.astro`
- Client behavior: `src/scripts/landing/chat-bot.ts`
- Pages entrypoint: `functions/api/chat.ts`
- Server logic: `src/server/chat/`

## Server Responsibilities

- request validation
- rate-limit identity derivation and hashing
- Turnstile verification when enabled
- upstream chat completion call
- response shaping and error handling

## Privacy Rules

- Do not persist chat messages.
- Do not add storage for transcripts unless explicitly requested.
- Only short-lived hashed client identity data belongs in KV for rate limiting.
- Keep warning copy about secrets, credentials, personal data, and employer-confidential information.

## Safety Rules

- Never expose `NVN_LLM_TOKEN` to client-side JavaScript.
- Keep `functions/api/chat.ts` thin; business logic belongs in `src/server/chat/`.
- If rate limiting, validation, Turnstile, or inference behavior changes, update tests in the same change.
