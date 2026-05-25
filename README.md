# lui.z

The true human agent.

Trained over 3.7 decades on production incidents, questionable dashboards, network cables, CI pipelines, cloud bills, human emotions, and the occasional moral judgment.

This repository powers [justanother.engineer](https://justanother.engineer): a cyberpunk-styled personal site that treats Luiz F. C. Martins like a highly opinionated SRE/DevOps model you can deploy into teams, platforms, incidents, and awkward architecture meetings.

Under the joke: career history, public recommendations, operating style, sponsorship options, contact paths, and enough blinking yellow to void at least one design warranty.

## Stack

- Astro 6 static site
- Tailwind CSS 4 with CSS-first theme tokens
- TypeScript
- Lucide Astro icons
- GitHub Pages
- GitHub Actions CI/CD

## Local Development

Requires Node.js `22.12.0` or newer.

1. Install dependencies.

   ```bash
   npm ci
   ```

2. Install local Git hooks.

   ```bash
   npm run prepare
   ```

3. Start the development server.

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Astro, usually `http://localhost:4321`.

5. Edit content or components.

   - Portfolio data: `src/config/portfolio/`
   - Page sections: `src/components/landing/`
   - Global layout, SEO, analytics: `src/layouts/Layout.astro`
   - Theme tokens and global effects: `src/styles/global.css`
   - Static passthrough assets: `public/`
   - Astro-optimized image assets: `src/assets/`

6. Run the full local gate before pushing.

   ```bash
   npm run check
   ```

7. Preview the production build if the change affects layout, assets, SEO, or deployment behavior.

   ```bash
   npm run preview
   ```

Common commands:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install locked dependencies |
| `npm run prepare` | Install Lefthook Git hooks |
| `npm run dev` | Start local dev server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run Astro diagnostics |
| `npm run test:run` | Run unit tests once |
| `npm run build` | Build static output into `dist/` |
| `npm run check` | Run lint, typecheck, tests, and build |
| `npm run preview` | Preview the production build locally |

## Project Structure

```text
src/pages/index.astro          page composition
src/components/landing/        landing page sections
src/components/branding/       custom brand mark
src/components/icons/          local social icons
src/config/portfolio.ts        portfolio content exports
src/config/portfolio/          structured content by domain
src/types/portfolio.ts         shared content types
src/layouts/Layout.astro       SEO, metadata, analytics, global scripts
src/styles/global.css          Tailwind theme tokens and global effects
public/                        static passthrough assets
.github/workflows/ci.yml       GitHub Pages build and deploy
```

## Content Model

Most editable portfolio content lives in `src/config/portfolio/`, split by domain. `src/config/portfolio.ts` is the public export surface for components. Components should render that data, not duplicate it. Images that need Astro optimization belong in `src/assets/`; files that must be served unchanged belong in `public/`.

## Deployment

Every push to `main` runs CI, builds the static site, uploads `dist/`, and deploys to GitHub Pages. The production domain is configured through `public/CNAME`.

## License

MIT.
