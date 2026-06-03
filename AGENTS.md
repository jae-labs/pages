# Agent Instructions

Welcome, Agent. This repository powers `justanother.engineer` (Luiz's public personal branding site). It is highly optimized for performance, accessibility, SEO, and secure operations.

You MUST read `docs/agents.md` to understand the architecture, codebase organization, deployment workflows, and ownership boundaries before making any changes.

## Quality Gates

Before completing any task, you must run the following quality gates sequentially to prevent regressions:

### 1. Code Style and Quality (Linting)
Run ESLint to ensure compliance with styling and coding standards:
```bash
npm run lint
```

### 2. Static Typechecking
Run Astro diagnostics and TypeScript typechecking:
```bash
npm run typecheck
```

### 3. Unit and Logic Tests
Run Vitest to verify all backend logic, portfolio content contracts, and helper scripts:
```bash
npm run test:run
```

### 4. Production Build Validation
Validate that the static Astro bundle compiles without build-time warnings or asset resolution errors:
```bash
npm run build
```

### 5. Consolidated Quality Gate (Mandatory)
Run the consolidated local verification script (combining lint, typecheck, tests, and build). This is the minimum gate required before completion:
```bash
npm run check
```

## Running the Application Locally

To test features dynamically or run manual smoke checks:
1. Ensure dependencies are locked and installed:
   ```bash
   npm ci
   ```
2. Start the local Astro development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:4321` in your environment.
4. Preview production builds:
   ```bash
   npm run preview
   ```

## Git hooks

Install local hooks before starting work:

```bash
npm run prepare
```

Run the local hook gate directly when needed:

```bash
lefthook run pre-commit
```

## Development and Regression Guidelines

- **No Casually Edited Branding**: Preserve the satirical "lui.z" persona voice, SRE/DevOps claims, external links, SEO metadata, and structural layout unless explicitly asked by the user.
- **Generic Chatbot Provider Wording**: Keep all chatbot-related descriptions and documentation vendor-generic (e.g. refer to the "upstream completions API" or "inference provider" instead of specific vendor names). The environment variable `NVN_LLM_TOKEN` is used in code/secret mappings, but must be described generically in text.
- **Maintain Test Integrity**: If behavior, structure, or content contracts change, update the corresponding test files in the same changeset. Never lower coverage or skip tests.
- **Centralized Content**: Always keep portfolio text and data in `src/config/portfolio/` rather than hardcoding it inside UI components.
- **Maintain Documentation Integrity**: Keep `README.md`, `AGENTS.md`, `docs/agents.md`, `public/llms.txt`, and `public/robots.txt` updated when workflows, deployment environments, or crawler instructions change.
