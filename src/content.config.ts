// Import utilities from `astro:content`
import { defineCollection, type ImageFunction } from 'astro:content';
// Import loader
import { glob } from 'astro/loaders';
//Import Zod
import { z } from 'astro/zod';

import { CATEGORY_TYPES } from '@/utils/types';

//Define a `loader` and `schema` for each collection
const blogSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    cover: image(),
    coverAlt: z.string().optional(),
    category: z.enum(CATEGORY_TYPES),
    tags: z.array(z.string()),
    author: z.string(),
    readingTime: z.number().optional(),
    link: z.string().optional(),
  });

const blog = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.mdx',
  }),
  schema: blogSchema,
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog };
