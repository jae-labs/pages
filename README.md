<p align="center">
<img src="public/readme-logo.png" alt="lui.z Logo" width="120"/>
</p>

<p align="center">
<a href="https://justanother.engineer"><img src="https://img.shields.io/website?url=https%3A%2F%2Fjustanother.engineer&label=website" alt="Website"></a>
<a href="https://github.com/jae-labs/pages/actions/workflows/ci.yml"><img src="https://github.com/jae-labs/pages/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/jae-labs/pages" alt="License"></a>
<a href="https://github.com/jae-labs/pages/issues"><img src="https://img.shields.io/github/issues/jae-labs/pages" alt="GitHub issues"></a>
<a href="https://github.com/jae-labs/pages/stargazers"><img src="https://img.shields.io/github/stars/jae-labs/pages" alt="GitHub stars"></a>
<a href="https://github.com/jae-labs/pages/network"><img src="https://img.shields.io/github/forks/jae-labs/pages" alt="GitHub forks"></a>
<a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-6-ff5d01?logo=astro&logoColor=white" alt="Astro 6"></a>
<a href="https://pages.cloudflare.com"><img src="https://img.shields.io/badge/Cloudflare%20Pages-deployed-f38020?logo=cloudflare&logoColor=white" alt="Cloudflare Pages"></a>
<a href="https://buymeacoffee.com/luiz1361"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-donate-orange.svg?logo=buymeacoffee" alt="Buy Me A Coffee"></a>
</p>

lui.z the true human agent.

Trained over 3.7 decades on production incidents, questionable dashboards, network cables, CI pipelines, cloud bills, human emotions, and the occasional moral judgment.

This repository powers [justanother.engineer](https://justanother.engineer): a cyberpunk-styled personal Single Page Application (SPA) that treats Luiz F. C. Martins like a highly opinionated SRE/DevOps model you can deploy into teams, platforms, incidents, and awkward architecture meetings.

Under the joke: career history, public recommendations, operating style, sponsorship options, contact paths, and enough blinking yellow to void at least one design warranty.

## Stack

- Astro 6 static Single Page Application (SPA)
- Tailwind CSS 4 with CSS-first theme tokens
- TypeScript
- Lucide Astro icons
- Cloudflare Pages
- Cloudflare Pages Functions for the public lui.z clone chat API
- Cloudflare KV for chat rate limiting
- Cloudflare Workers/CDN for public media
- OCI Object Storage for large media files
- GitHub Actions CI/CD with Doppler-synced secrets

## Local Development

Requires Node.js `22.12.0` or newer.

1. Install dependencies.

   ```bash
   pnpm install
   ```

2. Install Lefthook Git hooks.

   ```bash
   pnpm prepare
   ```

3. Start the development server.

   ```bash
   pnpm dev --force
   ```

4. Open the local URL printed by Astro, usually `http://localhost:4321`.

5. Edit content or components.

   - Portfolio data: `src/config/portfolio/`
   - Page sections: `src/components/landing/`
   - Chat API logic: `src/server/chat/`
   - Cloudflare Pages Functions: `functions/`
   - Global layout, SEO, analytics: `src/layouts/Layout.astro`
   - Theme tokens and global effects: `src/styles/global.css`
   - Static passthrough assets: `public/`
   - Astro-optimized image assets: `src/assets/`

6. Run the full local gate before pushing.

   ```bash
   pnpm check
   ```

7. Preview the production build if the change affects layout, assets, SEO, or deployment behavior.

   ```bash
   pnpm preview
   ```

Common commands:

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install locked dependencies |
| `pnpm prepare` | Install Lefthook Git hooks |
| `pnpm dev` | Start local dev server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run Astro diagnostics |
| `pnpm test:run` | Run unit tests once |
| `pnpm build` | Build static output into `dist/` |
| `pnpm check` | Run lint, typecheck, tests, and build |
| `pnpm preview` | Preview the production build locally |

## Project Structure

```text
src/pages/index.astro          page composition
src/components/layout/         layout-scoped UI
src/components/landing/        landing page sections
src/components/branding/       custom brand mark
src/components/icons/          local social icons
src/config/portfolio.ts        portfolio content exports
src/config/portfolio/          structured content by domain
src/server/chat/               chat prompt, public facts, upstream API client, rate limit logic
src/types/portfolio.ts         shared content types
src/layouts/Layout.astro       SEO, metadata, analytics, global scripts
src/assets/                    Astro-optimized image assets
src/styles/global.css          Tailwind theme tokens and global effects
functions/api/chat.ts          Cloudflare Pages Function for the chat endpoint
public/                        static passthrough assets
.github/workflows/ci.yml       linting, typechecking, testing, and build validation
.github/workflows/release.yml  production and preview deployments to Cloudflare Pages
```

## Reference Docs

- Architecture: `docs/architecture.md`
- Deployment and secrets: `docs/deployment.md`
- Chatbot runtime rules: `docs/chatbot.md`
- Content ownership: `docs/content-model.md`
- Quality gates: `docs/runbooks/quality-gates.md`

## Content Model

Most editable portfolio content lives in `src/config/portfolio/`, split by domain. `src/config/portfolio.ts` is the public export surface for components. Components should render that data, not duplicate it. Images that need Astro optimization belong in `src/assets/`; files that must be served unchanged belong in `public/`.

## Deployment

This website is automatically deployed to Cloudflare Pages via GitHub Actions CI/CD workflows on pushes to the `main` branch.

- **Production:** [justanother.engineer](https://justanother.engineer)
- **Previews:** Review deployments are posted automatically on active Pull Requests.

## Chatbot

The site includes a satirical clone chatbot that answers questions based on the public site content. While chat messages themselves are not persisted on the server, interaction events (such as messages sent and received) and session recordings/heatmaps are captured via PostHog and Google Analytics when the visitor grants cookie consent. Endpoint rate-limiting is handled server-side using Cloudflare KV.

## Media

To avoid committing large binary files to the repository and keep static builds lightweight for deployment to Cloudflare Pages, large media assets (like the hero video) are stored in OCI Object Storage. They are served behind a Cloudflare Worker CDN and delivered via adaptive HLS (HTTP Live Streaming) to optimize bandwidth and performance.

## License

MIT.
