# Agent Instructions

Read `docs/agents.md` before changing code, docs, dependencies, or workflows.

Deployment, media, DNS, and CI secret behavior spans this repo plus the `conCIerge` Terraform roots for Cloudflare, OCI, and Doppler. Inspect `docs/agents.md` for the ownership map before touching those paths.

Minimum gate before completion:

```bash
npm run check
```

Do not edit public branding/content casually. This is a personal branding site; preserve voice, claims, links, SEO metadata, and deployment behavior unless the task explicitly changes them.

For every change, explicitly check whether docs or tests need updates. Update them in the same change when behavior, structure, commands, content contracts, or workflows change.

Always keep `README.md`, `AGENTS.md`, `docs/agents.md`, `public/llms.txt`, and `public/robots.txt` current when repo behavior, deployment, public content, SEO, crawler access, or agent workflow changes.
