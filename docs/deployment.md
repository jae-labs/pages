# Deployment

## Hosting

Cloudflare Pages project `jae-pages` serves static Astro output from `dist/` and runs `functions/api/chat.ts`. Production is [justanother.engineer](https://justanother.engineer). The hero video is delivered as HLS from `media.justanother.engineer`.

## CI and release

- [CI](../.github/workflows/ci.yml) runs a frozen install and `pnpm check` on pushes and pull requests targeting `main` and on manual dispatch.
- [Release](../.github/workflows/release.yml) builds and deploys production from `main`. Same-repository pull requests targeting `main` deploy a preview and post a PR comment on success. Manual dispatch uses production for `main` and preview for other refs.
- Release runs are grouped by Git ref, so production and pull requests have independent queues. A newer queued run may replace an older pending run for the same ref.
- Cloudflare Pages previews use an `X-Robots-Tag: noindex` header by default. See [Cloudflare preview indexing](https://developers.cloudflare.com/pages/configuration/preview-deployments/#preview-indexing-by-search-engines).

## Build and deployment settings

| GitHub source | Build or deploy destination | Scope |
| --- | --- | --- |
| Workflow constants | `SITE_URL=https://justanother.engineer`, `SITE_BASE=/` | CI and release builds |
| `PAGES_PUBLIC_POSTHOG_KEY`, `PAGES_PUBLIC_POSTHOG_HOST` | `PUBLIC_POSTHOG_KEY`, `PUBLIC_POSTHOG_HOST` | Browser analytics build settings |
| `PAGES_PUBLIC_SENTRY_DSN` | `PUBLIC_SENTRY_DSN` | Browser monitoring and Pages Functions |
| `PAGES_SENTRY_AUTH_TOKEN` | `SENTRY_AUTH_TOKEN` | Build-time source map upload |
| `PAGES_PUBLIC_TURNSTILE_SITE_KEY` | `PUBLIC_TURNSTILE_SITE_KEY` | Browser verification widget |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Wrangler action inputs | Release deploy step |
| `HONEYCOMB_API_KEY` | Build telemetry action | CI and release |

`PUBLIC_GA_TRACKING_ID` and `PUBLIC_VIDEO_HLS_URL` are optional build overrides with defaults in source. The workflows do not supply these overrides.

## Pages Functions bindings

| Binding | Provisioning | Scope |
| --- | --- | --- |
| `NVN_LLM_TOKEN` | Release writes it from `PAGES_NVN_LLM_TOKEN` | Required for chat POSTs |
| `RATE_LIMIT_KV` | Configured in the Pages project | Required for chat POSTs |
| `TURNSTILE_SECRET_KEY` | Release writes it from `PAGES_TURNSTILE_SECRET_KEY` when present | Enables server-side verification |
| `PUBLIC_SENTRY_DSN` | Release writes it from `PAGES_PUBLIC_SENTRY_DSN` | Functions monitoring |

The workflow uses its shell variable `CLOUDFLARE_PAGES_ENV` to select where to write secrets. If Functions monitoring uses a runtime variable of the same name to select a sampling rate, configure that variable separately in Pages. Verify the bindings in both environments when changing deploy configuration. Keep credential values in the secret store. The repository records the GitHub-to-Pages handoff. Upstream secret sync and the media origin are managed outside this repository.

## Chat smoke test

1. Open the Pages preview URL and note its Git commit. Use the deployed production URL for a post-release check.
2. Open the chat, let verification complete, and ask “What is lui.z?” Expect a concise answer grounded in the site. In browser Network tools, check that `POST /api/chat` returns `200` promptly. The inference call itself has a 20-second deadline.
3. Start a new chat and verify the greeting returns. For failures, record the timestamp, deploy commit, HTTP status, and duration. Inspect the deployment’s [Functions logs](https://developers.cloudflare.com/pages/functions/debugging-and-logging/) and follow the [chat failure guide](chatbot.md#request-and-failure-handling).

## Rollback

In Cloudflare, open **Workers & Pages → jae-pages → Deployments**. Find the previous known-good production deployment and select **Rollback to this deployment** from its actions menu. Verify the production home page and repeat the chat smoke test. Follow up on `main` so the next release includes the correction. See [Cloudflare Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/).
