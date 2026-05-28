// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrOrgPages =
  repository && owner && repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://luiz1361.github.io');
const base = process.env.SITE_BASE
  ?? (process.env.SITE_URL ? '/' : repository && !isUserOrOrgPages ? `/${repository}` : '/');

import { fileURLToPath, URL } from 'url';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@videojs/core/dist/': fileURLToPath(new URL('./node_modules/@videojs/core/dist/', import.meta.url))
      }
    }
  },

  integrations: [
    sitemap(),
    sentry({
      org: 'jae-ij',
      project: 'pages',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ]
});
