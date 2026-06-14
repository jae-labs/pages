# Quality Gates

Run these checks before completion when code changes may affect them.

## Commands

```bash
pnpm prepare
lefthook run pre-commit
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm check
```

## Expectations

- `pnpm prepare`
  - installs local Git hooks
- `lefthook run pre-commit`
  - runs the local hook-defined pre-commit checks without needing a commit
- `pnpm lint`
  - ESLint passes without new violations
- `pnpm typecheck`
  - Astro and TypeScript diagnostics pass
- `pnpm test:run`
  - colocated contract and logic tests pass
- `pnpm build`
  - static production build completes without asset or resolution failures
- `pnpm check`
  - consolidated gate passes end to end

## When To Run Extra Validation

- Run `pnpm preview` for layout, SEO, asset, or deployment-sensitive changes.
- Smoke test the chatbot path when changing `src/server/chat/`, `functions/`, or `src/components/landing/ChatBot.astro`.
- Re-check crawler-facing files when editing `public/robots.txt`, `public/llms.txt`, metadata, or sitemap behavior.
