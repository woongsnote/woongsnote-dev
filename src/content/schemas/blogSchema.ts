import { z, type ImageFunction } from 'astro:content';
export const blogSchema = ({ image }: { image: ImageFunction }) =>
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
