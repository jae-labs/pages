# AGENTS.md

## Mission

- Treat this repository as production marketing infrastructure for `justanother.engineer`.
- Optimize for correctness, accessibility, SEO, performance, static output, and clean public presentation.
- Preserve the satirical `lui.z` persona unless the user explicitly asks to change branding or voice.

## Start Here

- Use the Node version in `.nvmrc` and the pnpm version in `package.json`.
- Install dependencies with `pnpm install --frozen-lockfile`.
- Install hooks with `pnpm prepare` if needed.
- Start the static site locally with `pnpm dev`.

## Required Verification

For code changes, run `pnpm check` once before completion. It runs lint, type checking, tests, and the static build in order. See [Quality Gates](docs/runbooks/quality-gates.md) for targeted checks and Pages smoke tests.

## Routing

- Page composition: `src/pages/index.astro`
- Document shell, metadata, global scripts: `src/layouts/Layout.astro`
- Landing sections: `src/components/landing/`
- Layout-scoped UI: `src/components/layout/`
- Portfolio content source: `src/config/portfolio/`
- Public content export surface: `src/config/portfolio.ts`
- Shared content types: `src/types/portfolio.ts`
- Browser scripts: `src/scripts/`
- Server-only chatbot logic: `src/server/chat/`
- Cloudflare Pages functions: `functions/`
- Global styles and theme tokens: `src/styles/global.css`
- Astro-optimized images: `src/assets/`
- Static passthrough files: `public/`

## Change Rules

- Keep portfolio text and structured content in `src/config/portfolio/`. Do not hardcode reusable portfolio copy inside components.
- Keep components render-focused. If a page or layout grows UI-heavy, extract a focused component instead of expanding the shell.
- Keep server-only chat logic out of client code. Never expose `NVN_LLM_TOKEN` or related secrets to the browser.
- Preserve static output. Do not introduce SSR unless explicitly requested.
- Use `src/assets/` for optimized imports and `public/` for unchanged public files.
- Keep chatbot provider wording vendor-generic in docs and copy unless exact env var names are required.
- Do not persist chat messages. Store only short-lived rate-limit counters keyed by hashed identities in KV. Exclude the chat widget from session replay.
- Do not add migration scripts unless explicitly requested.
- Do not commit large media. Use the external media delivery path at `media.justanother.engineer` for large public assets.

## Update Triggers

- If UI behavior changes, update the relevant tests in the same change.
- If content contracts change, update `src/config/portfolio/`, `src/config/portfolio.ts`, `src/types/portfolio.ts`, and tests together.
- Update the README and affected docs when behavior changes their claims. Update `public/llms.txt` when public discovery content changes and `public/robots.txt` when crawler policy or the sitemap URL changes.
- If workflows, config syntax, dependencies, or external APIs change, check current official docs before editing.

## High-Risk Changes

- If changing deployment, secrets, runtime bindings, or GitHub Actions, read `docs/deployment.md` first.
- If changing chatbot behavior, validation, rate limiting, Turnstile, or inference flow, read `docs/chatbot.md` first.
- If changing content boundaries or where portfolio data lives, read `docs/content-model.md` first.
- If changing architecture-level responsibilities, read `docs/architecture.md` first.

## Boundaries

- Do not casually change SEO metadata, canonical behavior, crawler files, external links, or satirical framing.
- Do not add secrets, private profile data, or employer-confidential information.
- Do not downgrade tests, bypass checks, or remove coverage to make changes pass.
- Do not introduce new dependencies or patterns when existing repo patterns solve the problem cleanly.

## Docs Map

- Architecture: `docs/architecture.md`
- Deployment and secrets: `docs/deployment.md`
- Chatbot runtime and privacy constraints: `docs/chatbot.md`
- Content ownership and edit paths: `docs/content-model.md`
- Verification commands and expectations: `docs/runbooks/quality-gates.md`
