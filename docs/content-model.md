# Content Model

## Source Of Truth

- Portfolio content lives in `src/config/portfolio/`.
- `src/config/portfolio.ts` is the stable export surface consumed by components.
- `src/types/portfolio.ts` defines shared content contracts.

## Editing Rules

- Add or change reusable public copy in config files, not inside components.
- Keep components render-focused and driven by imported data.
- Update types and tests together when content structure changes.

## File Ownership

- `src/config/portfolio/menu.ts`
  - navigation content
- `src/config/portfolio/features.ts`
  - feature section data
- `src/config/portfolio/benchmarks.ts`
  - benchmark content
- `src/config/portfolio/deployments.ts`
  - deployment history content
- `src/config/portfolio/reviews.ts`
  - reviews and recommendations
- `src/config/portfolio/faq.ts`
  - FAQ content used by the page and chatbot
- `src/config/portfolio/logos.ts`
  - trusted-by and logo data

## Asset Rules

- Put Astro-optimized images in `src/assets/`.
- Put passthrough public files in `public/`.
- Do not commit large media binaries; use the external media delivery path.
