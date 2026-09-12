import { defineCollection, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_TYPES } from './types/category';
import { TAG_TYPES } from './types/tag';

const postSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    category: z.enum(CATEGORY_TYPES),
    tags: z.array(z.enum(TAG_TYPES)).min(1).max(2),
    link: z.url().optional(),
  });

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
  }),
  schema: postSchema,
});

export const collections = { posts };
