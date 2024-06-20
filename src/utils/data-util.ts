import type { Post, PostsByYear } from './types';

export const sortPostsByDateDesc = (postA: Post, postB: Post) => {
  return (
    postB.data.publishedDate.valueOf() - postA.data.publishedDate.valueOf()
  );
};

export const filterPostsByYear = (posts: Post[]): PostsByYear => {
  return posts.reduce((acc: PostsByYear, post) => {
    const year = post.data.publishedDate.getFullYear().toString();
    acc[year] = acc[year] || [];
    acc[year].push(post);
    return acc;
  }, {});
};
