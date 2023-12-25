import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

/**
 * Returns an array of unique tags extracted from an array of Post objects.
 *
 * @param {Post[]} posts - An array of Post objects.
 * @return {string[]} - An array of unique tags.
 */
export const getTags = (posts: Post[]): string[] => {
  return [...new Set(posts.map((post) => post.data.tags).flat())];
};
