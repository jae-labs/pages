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
- Keep the transcript in the page. Prompts are sent to the inference service for processing. Provider retention is governed by that service's settings and terms.
- Exclude the chat widget from PostHog and Sentry replay. PostHog replay and heatmaps are controlled by project settings. Consented PostHog chat events contain interaction metadata, including message lengths, HTTP statuses, and a generic client failure code.
- Google Analytics and PostHog load after analytics consent. Sentry initializes when a DSN is configured, with masking and chat exclusion in its replay configuration.
- Keep warning copy about secrets, credentials, personal data, and employer-confidential information.

## Safety Rules

- Never expose `NVN_LLM_TOKEN` to client-side JavaScript.
- Keep `functions/api/chat.ts` thin; business logic belongs in `src/server/chat/`.
- If rate limiting, validation, Turnstile, or inference behavior changes, update tests in the same change.

## Request and failure handling

- `GET /api/chat` reports the current cooldown. `POST /api/chat` accepts a text prompt of at most 1,200 characters after trimming.
- Each prompt is sent with public-site context. The upstream request has a 20-second deadline.
- A verification failure returns `400`. A saturated rate-limit window returns `429` and `Retry-After`. A rate-limit storage failure returns `503`. An inference failure returns `502` with a generic visitor-facing message.
- Pages Functions logs record the inference failure category, upstream HTTP status when available, and elapsed time. These diagnostics exclude prompts, responses, verification tokens, and credentials.
- KV stores a short-lived counter keyed by the hashed client identity. The read and write are separate operations, so enforcement is best-effort under concurrency.
