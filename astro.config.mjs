// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://luiz1361.github.io');
const isUserOrOrgPages =
  repository && owner && repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;

// https://astro.build/config
export default defineConfig({
  site,
  base: repository && !isUserOrOrgPages ? `/${repository}` : '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});
