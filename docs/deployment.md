# Deployment

## Hosting Model

- Static Astro output is built into `dist/`.
- Cloudflare Pages hosts the site.
- Cloudflare Pages Functions serve the chatbot endpoint.
- Large media is delivered outside the repo through `media.justanother.engineer`.

## CI

- Workflow: `.github/workflows/ci.yml`
- Triggers:
  - push to `main`
  - pull request targeting `main`
  - manual dispatch
- Gate:
  - installs dependencies with `pnpm install --frozen-lockfile`
  - runs `pnpm check`

## Release

- Workflow: `.github/workflows/release.yml`
- Triggers:
  - push to `main`
  - pull request targeting `main`
  - manual dispatch
- Build step runs `pnpm build`
- Deploy step pushes `dist/` to the Cloudflare Pages project `jae-pages`
- Pull requests receive a preview deployment comment

## Runtime Inputs

- `SITE_URL=https://justanother.engineer`
- `SITE_BASE=/`
- `PAGES_NVN_LLM_TOKEN`
- `RATE_LIMIT_KV`
- `PAGES_PUBLIC_POSTHOG_KEY`
- `PAGES_PUBLIC_POSTHOG_HOST`
- `PAGES_PUBLIC_SENTRY_DSN`
- `PAGES_SENTRY_AUTH_TOKEN`
- `PUBLIC_GA_TRACKING_ID` (optional)
- `PAGES_PUBLIC_TURNSTILE_SITE_KEY`
- `PAGES_TURNSTILE_SECRET_KEY`

## Secret Flow

- Doppler is the upstream secret source.
- GitHub organization secrets receive synced values.
- GitHub Actions writes required runtime secrets into Cloudflare Pages.
- Never move secret values into source files, client code, examples, or public docs.

## Change Rules

- Before editing workflows, Wrangler behavior, or Pages secret handling:
  - inspect `package.json` and current workflow files
  - verify syntax and behavior in current official docs
- Keep release and CI behavior aligned with `README.md`, `AGENTS.md`, and this file.
- If deployment behavior changes, update docs and verification expectations in the same change.
