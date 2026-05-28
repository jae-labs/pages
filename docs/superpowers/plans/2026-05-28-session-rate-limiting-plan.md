# Implementation Plan: Session-based Rate Limiting

This plan describes the implementation steps for updating the chatbot's rate-limiting mechanism to support a 10 messages per 5 minutes per session restriction.

## Task List

- [ ] **Task 1: Update Rate Limiting Constants in `src/server/chat/chat.ts`**
  - **Goal**: Update maximum message limit and the time window constants.
  - **Details**:
    - `RATE_LIMIT_MAX_REQUESTS` = `10`
    - `RATE_LIMIT_WINDOW_SECONDS` = `300` (5 minutes)

- [ ] **Task 2: Implement Session Keying & Custom Clone-toned Limit Error**
  - **Goal**: Update rate-limiting key resolution and custom message in `src/server/chat/chat.ts`.
  - **Details**:
    - Extract rate limit identity using `parsed.clientSessionId` with `clientIdentity` as fallback: `const rateLimitIdentity = parsed.clientSessionId || clientIdentity;`.
    - Key the hashed identifier on the resolved `rateLimitIdentity`.
    - Return 429 error response with message: `"Session message limit exceeded. The clone requires a 5-minute cooldown cycle."`.

- [ ] **Task 3: Update and Add Tests in `src/server/chat/chat.test.ts`**
  - **Goal**: Align tests with new limits and verify session keying logic.
  - **Details**:
    - Update constants assertions for max requests and window duration.
    - Update rate-limit tests to expect limit enforcement at 10 requests.
    - Write a unit test ensuring that `createChatHandler` utilizes `clientSessionId` as the KV rate-limit key.

- [ ] **Task 4: Run Verification & Quality Gates**
  - **Goal**: Run code quality checks to guarantee code passes strict repository requirements.
  - **Details**:
    - Run `npm run lint`
    - Run `npm run typecheck`
    - Run `npm run test:run`
    - Run `npm run build`
    - Run `npm run check` (final verification gate)
