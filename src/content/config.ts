import { defineCollection, z } from 'astro:content';

// Define the blog collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // Title of the blog post
    title: z.string(),

    // Description of the blog post
    description: z.string(),

    // Publication date of the blog post
    publishedDate: z.string().transform((str) => new Date(str)),

    // URL of the hero image for the blog post
    image: z.object({
      url: z.string(), // Source URL of the image
      alt: z.string(), // Alternative text for the image
    }),

    // category that the blog post belongs to, defaulting to 'others'
    category: z.string(),

    // Tags associated with the blog post
    tags: z.array(z.string()),

    // Author of the blog post
    author: z.string(),
  }),
});

export const collections = { blog };
