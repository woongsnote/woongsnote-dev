import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

export const sortPostsByDateDesc = (postA: Post, postB: Post) => {
  return (
    postB.data.publishedDate.valueOf() - postA.data.publishedDate.valueOf()
  );
};

type Acc = {
  [year: string]: CollectionEntry<'blog'>[];
};

export const filterPostsByYear = (posts: Post[]) => {
  return posts.reduce((acc: Acc, post) => {
    const year = post.data.publishedDate.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});
};
