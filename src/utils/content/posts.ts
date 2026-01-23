import { getCollection } from 'astro:content';
import type { Post } from '@utils/types';

export const sortPostsByDateDesc = (a: Post, b: Post): number =>
  b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf();

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await getCollection('blog');
  return posts.sort(sortPostsByDateDesc);
};

export const groupPostsByYear = (
  posts: Post[]
): { year: number; posts: Post[] }[] => {
  const map = new Map<number, Post[]>();

  posts.forEach((post) => {
    const year = post.data.publishedDate.getFullYear();
    map.set(year, [...(map.get(year) ?? []), post]);
  });

  return [...map.entries()]
    .map(([year, posts]) => ({
      year,
      posts: posts.sort(sortPostsByDateDesc),
    }))
    .sort((a, b) => b.year - a.year);
};
