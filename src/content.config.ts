import { defineCollection, z } from 'astro:content';

const config = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    github: z.string(),
    linkedin: z.string(),
    email: z.string(),
  }),
});

export const collections = {
  config,
};