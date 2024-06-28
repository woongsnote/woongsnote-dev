import { getCollection } from 'astro:content';
import type { Post, TocHeadings } from './types';

export const getPosts = async (maxPosts?: number) => {
  return (await getCollection('blog'))
    .sort(sortPostsByDateDesc)
    .slice(0, maxPosts);
};

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

export const getFilteredPostsByYear = async (year: string) => {
  const filteredList = await getCollection('blog', ({ data }) => {
    return data.publishedDate.getFullYear().toString() === year;
  });
  return filteredList.sort(sortPostsByDateDesc);
};

export const generateToc = (headings: TocHeadings[]) => {
  const toc: TocHeadings[] = [];
  const parentHeadings = new Map();
  headings.forEach((h) => {
    const heading = { ...h, subHeadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subHeadings.push(heading);
    }
  });
  return toc;
};