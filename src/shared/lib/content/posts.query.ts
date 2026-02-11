import { getCollection } from 'astro:content';
import { sortPostsByDateDesc } from './posts';

export async function getPosts(limit?: number) {
  const posts = await getCollection('posts');
  const sorted = posts.sort(sortPostsByDateDesc);

  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}
