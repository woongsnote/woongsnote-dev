import { defineCollection } from 'astro:content';
import { blogSchema } from './schemas/blogSchema';
import { projectSchema } from './schemas/projectSchema';

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  posts: blogCollection,
  projects: projectCollection,
};
