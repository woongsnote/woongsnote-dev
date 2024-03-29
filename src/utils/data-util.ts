import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

export const sortPostsByDateDesc = (postA: Post, postB: Post) => {
  return (
    postB.data.publishedDate.valueOf() - postA.data.publishedDate.valueOf()
  );
};

export const getUniqueTags = (posts: Post[]): string[] => {
  return [...new Set(posts.map((post) => post.data.tags).flat())];
};

export const getPostsByTag = (posts: Post[], tag: string): Post[] => {
  return posts.filter((post) => post.data.tags.includes(tag));
};
