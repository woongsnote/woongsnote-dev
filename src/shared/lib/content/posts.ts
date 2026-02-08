import type { PostEntry } from '@/shared/types';

export const sortPostsByDateDesc = (a: PostEntry, b: PostEntry): number =>
  b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf();

export const groupPostsByYear = (
  posts: PostEntry[]
): { year: number; posts: PostEntry[] }[] => {
  const map = new Map<number, PostEntry[]>();

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

export function parseMinutes(input: string): number | null {
  const m = input.match(/\d+/);
  return m ? Number(m[0]) : null;
}
