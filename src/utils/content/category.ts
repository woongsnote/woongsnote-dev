import type { Post, CategoryCounts, CategoryPosts } from '@utils/types';
import type { CategoryKey } from '@utils/types';

export const getCategoryPosts = (
  posts: Post[],
  categories: CategoryKey[]
): {
  categoryCounts: CategoryCounts;
  categoryPosts: CategoryPosts;
} => {
  const postsMap = new Map<CategoryKey, Post[]>();

  categories.forEach((key) => postsMap.set(key, []));
  postsMap.set('all', posts);

  posts.forEach((post) => {
    const category = post.data.category.toLowerCase() as CategoryKey;
    postsMap.get(category)?.push(post);
  });

  const categoryPosts = Object.fromEntries(postsMap) as CategoryPosts;

  const categoryCounts = Object.fromEntries(
    Object.entries(categoryPosts).map(([key, posts]) => [key, posts.length])
  ) as CategoryCounts;

  return { categoryCounts, categoryPosts };
};
