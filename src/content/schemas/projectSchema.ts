import { z, type ImageFunction } from 'astro:content';
export const projectSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    cover: image(),
    coverAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
  });
