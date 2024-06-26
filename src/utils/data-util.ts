import type { Post, PostsByYear } from './types';

export const sortPostsByDateDesc = (postA: Post, postB: Post) => {
  return (
    postB.data.publishedDate.valueOf() - postA.data.publishedDate.valueOf()
  );
};

export const generateYears = (posts: Post[]): string[] => {
  return [
    ...new Set(
      posts.map((post) => post.data.publishedDate.getFullYear().toString())
    ),
  ].sort((a, b) => b.localeCompare(a));
};
