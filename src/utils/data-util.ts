import { getCollection } from 'astro:content';
import type { Post, TocHeadings, CategoryCounts, CategoryPosts } from './types';

export const getPosts = async () => {
  return (await getCollection('blog')).sort(sortPostsByDateDesc);
};

export const sortPostsByDateDesc = (postA: Post, postB: Post) => {
  return (
    postB.data.publishedDate.valueOf() - postA.data.publishedDate.valueOf()
  );
};

export const getCategoryPosts = (
  allPosts: Post[],
  categories: { page: string }[]
): { categoryCounts: CategoryCounts; categoryPosts: CategoryPosts } => {
  const categoryCounts: CategoryCounts = { all: allPosts.length };
  const categoryPosts: CategoryPosts = { all: allPosts };

  categories.forEach(({ page }) => {
    if (page && page !== 'all') {
      const postsInCategory = allPosts.filter((post: Post) =>
        post.data.category.toLowerCase()?.includes(page)
      );

      categoryCounts[page] = postsInCategory.length;
      categoryPosts[page] = postsInCategory;
    }
  });

  return { categoryCounts, categoryPosts };
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
