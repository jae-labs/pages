# Quality Gates

Run `pnpm check` before completing code changes. CI uses the same command after a frozen install.

## Checks

| Command | What it checks |
| --- | --- |
| `pnpm lint` | ESLint diagnostics |
| `pnpm typecheck` | Astro and TypeScript diagnostics |
| `pnpm test:run` | Repository tests |
| `pnpm build` | Static build in `dist/` |

Use individual commands for diagnosis. `pnpm check` runs them in this order. `pnpm prepare` installs the Lefthook hooks. The pre-commit hook runs lint and type checks. The pre-push hook runs the full gate.

## Extra validation

- Run `pnpm preview` after building to review static layout, metadata, and assets.
- For chat changes, run the [Pages smoke test](../deployment.md#chat-smoke-test). Astro preview serves static output. Local Functions testing requires Wrangler and local bindings.
- Recheck the built sitemap, canonical URL, and crawler files when their public URLs or indexing policy change.
