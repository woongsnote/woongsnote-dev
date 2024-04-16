import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

type WithPublishedDate = {
  data: { publishedDate: Date };
};

export const sortPostsByDateDesc = <T extends WithPublishedDate>(
  postA: T,
  postB: T
) => {
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
