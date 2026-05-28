# Design Spec: Session-based Rate Limiting for AI Chat

**Date**: 2026-05-28  
**Topic**: Session-based Rate Limiting for Chatbot  
**Status**: Approved

## 1. Requirements & Scope
* **Session Message Limit**: Allow only 10 messages per session in a space of 5 minutes (300 seconds).
* **Identity Keying**: Rate limit must be keyed by the active `clientSessionId` when available, falling back to IP-based `clientIdentity` to prevent anonymous spamming.
* **Exceeded State Messaging**: When a user exceeds the quota, return a clear, clone-toned rate limit error message.
* **Tone**: Stay in line with the "lui.z artificial clone" persona of the website.

## 2. Technical Architecture

### 2.1 Configuration Changes (`src/server/chat/chat.ts`)
We will adjust the rate limiting configuration in the server chat utility:
* `RATE_LIMIT_MAX_REQUESTS`: Reduce from `40` to `10`.
* `RATE_LIMIT_WINDOW_SECONDS`: Increase from `60` (1 minute) to `300` (5 minutes).

### 2.2 Rate Limit Keying & Response Updates (`src/server/chat/chat.ts`)
* We will extract the `clientSessionId` from the parsed request payload.
* Hashing will be applied to the `clientSessionId` (or IP fallback) to ensure compliance with privacy and data protection principles (limiting short-lived hashed identities in Cloudflare KV).
* In `createChatHandler`:
  ```typescript
  const rateLimitIdentity = parsed.clientSessionId || clientIdentity;
  const limit = await checkRateLimit(
    env.RATE_LIMIT_KV,
    await hashClientIdentity(rateLimitIdentity),
    options.now?.()
  );
  ```
* When `!limit.allowed`, we will return a 429 status response with the clone-toned error message:
  ```json
  { "error": "Session message limit exceeded. The clone requires a 5-minute cooldown cycle." }
  ```

## 3. Test Coverage (`src/server/chat/chat.test.ts`)
* Update constants checked in unit tests.
* Update unit tests checking KV rate limits to reflect the new boundaries (10 requests, 300s window).
* Add a test verifying rate-limiting checks are correctly keyed by `clientSessionId` when present.

## 4. Verification & Quality Gates
* Run all local checks before concluding:
  ```bash
  npm run check
  ```
