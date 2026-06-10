// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';
import tailwindcss from '@tailwindcss/vite';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

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

  integrations: [
    sitemap({
      serialize(item) {
        try {
          const parsedUrl = new URL(item.url);
          if (parsedUrl.pathname === '/' || parsedUrl.pathname === '') {
            // @ts-expect-error - video is not typed in Astro's SitemapItem Pick utility but is fully supported by the underlying sitemap engine
            item.video = [
              {
                thumbnail_loc: `${parsedUrl.origin}/agent-hover.png`,
                title: 'lui.z: The True Human Agent',
                description: 'Consciousness, Moral Judgment, and Emotions. Trained over 3.7 decades for peak SRE/DevOps intuition.',
                content_loc: 'https://media.justanother.engineer/lui-z-promo.mp4',
                publication_date: '2026-05-29T00:00:00Z',
              }
            ];
          }
        } catch {
          // Ignore URL parsing errors
        }
        return item;
      }
    }),
    {
      name: 'rename-sitemap',
      hooks: {
        'astro:build:done': async ({ dir, logger }) => {
          const destDir = fileURLToPath(dir);
          const oldIndex = path.join(destDir, 'sitemap-index.xml');
          const oldSitemap = path.join(destDir, 'sitemap-0.xml');
          const newSitemap = path.join(destDir, 'sitemap.xml');

          try {
            const sitemapContent = await fs.readFile(oldSitemap, 'utf8');
            await fs.writeFile(newSitemap, sitemapContent, 'utf8');
            logger.info('Copied sitemap-0.xml to sitemap.xml');

            await fs.unlink(oldIndex);
            await fs.unlink(oldSitemap);
            logger.info('Removed old sitemap-index.xml and sitemap-0.xml');
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            logger.error(`Error processing sitemap files: ${errorMessage}`);
          }
        }
      }
    },
    sentry({
      org: 'jae-ij',
      project: 'pages',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ]
});

