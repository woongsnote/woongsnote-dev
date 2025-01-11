import { defineCollection, z, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    cover: image(),
    coverAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    readingTime: z.number().optional(),
    link: z.string().optional(),
  });

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: blogSchema,
});

export const collections = { blog };
