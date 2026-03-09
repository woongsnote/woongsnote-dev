import type { PostEntry } from '@/shared/types';
import { getPosts } from './posts.query';

export const sortPostsByDateDesc = (a: PostEntry, b: PostEntry): number =>
  b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf();

export type PostsByYear = {
  year: number;
  posts: PostEntry[];
};

export const getPostsGroupedByYear = async (): Promise<PostsByYear[]> => {
  const posts = await getPosts();

  const map = new Map<number, PostEntry[]>();

  for (const post of posts) {
    const year = post.data.publishedDate.getFullYear();
    const bucket = map.get(year);
    if (bucket) bucket.push(post);
    else map.set(year, [post]);
  }

  return [...map.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, posts: items }));
};

export function parseMinutes(input: string): number | null {
  const m = input.match(/\d+/);
  return m ? Number(m[0]) : null;
}
