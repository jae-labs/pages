# lui.z website

Landing page built with Astro, Tailwind CSS, and React integrations.

## Requirements

- Node.js 22.12.0 or newer
- npm

## Commands

Run from the repository root:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies |
| `npm run dev` | Start local development server |
| `npm run build` | Build static site into `dist/` |
| `npm run preview` | Preview production build locally |

## Deployment

- GitHub Actions workflow: `.github/workflows/ci.yml`
- Static output directory: `dist/`
- Custom domain: `justanother.engineer` (see `public/CNAME`)

## Key Paths

- `src/pages/index.astro` - main page composition
- `src/components/landing/` - landing page sections
- `src/layouts/Layout.astro` - shared layout, SEO, and analytics
- `astro.config.mjs` - Astro configuration (site/base/sitemap)
