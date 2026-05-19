// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrOrgPages =
  repository && owner && repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://luiz1361.github.io');
const base = process.env.SITE_BASE
  ?? (process.env.SITE_URL ? '/' : repository && !isUserOrOrgPages ? `/${repository}` : '/');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
