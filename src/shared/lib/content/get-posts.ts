import { getCollection } from 'astro:content';
import { sortPostsByDateDesc } from './posts';

export async function getAllPosts() {
  const posts = await getCollection('posts');
  return posts.sort(sortPostsByDateDesc);
}
