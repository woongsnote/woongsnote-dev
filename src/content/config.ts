import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.date(),
      cover: image(),
      coverAlt: z.string().optional(),
      category: z.string(),
      tags: z.array(z.string()),
      author: z.string(),
    }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.date(),
      cover: image(),
      coverAlt: z.string().optional(),
      category: z.string(),
      tags: z.array(z.string()),
      author: z.string(),
    }),
});

export const collections = {
  posts: postCollection,
  projects: projectCollection,
};
