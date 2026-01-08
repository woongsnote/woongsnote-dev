import { defineCollection, z, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_TYPES } from '@config/site-config';

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

export const collections = { blog };
