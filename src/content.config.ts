// Import utilities from `astro:content`
import { defineCollection, type ImageFunction } from 'astro:content';
// Import loader
import { glob } from 'astro/loaders';
//Import Zod
import { z } from 'astro/zod';
import { CATEGORY_TYPES } from './shared/types/content/category';

//Define a `loader` and `schema` for each collection
const postSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    category: z.enum(CATEGORY_TYPES),
    tags: z.array(z.string()),
    author: z.string(),
    readingTime: z.number().optional(),
    link: z.string().optional(),
  });

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.mdx',
  }),
  schema: postSchema,
});

export const collections = { posts };
