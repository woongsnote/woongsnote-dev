'use client';

import { allPosts } from '@/.contentlayer/generated';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const Tabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const categories = ['All', 'Tech', 'Diary', 'Project'];

  const getPostsLength = (category: string) => {
    return allPosts.filter((post) => post.category.match(category)).length;
  };

  console.log(getPostsLength('Tech'));

  return (
    <div className="my-4 w-fit gap-8 flex justify-center text-center rounded-lg px-3 py-1 mx-auto">
      {categories.map((category) => {
        const totalPosts =
          category === 'All' ? allPosts.length : getPostsLength(category);
        return (
          <button
            key={category}
            aria-label={`filter posts by ${category}`}
            role="button"
            onClick={() => {
              router.push(
                '/posts' + '?' + createQueryString('category', category),
              );
            }}
            className={`${
              searchParams.get('category') === category
                ? 'text-white font-bold border bg-primary dark:bg-secondary border-primary dark:border-secondary'
                : 'text-gray-500'
            } px-2 py-1 text-lg font-semibold rounded-lg hover:underline hover:underline-offset-8 lg:text-2xl`}
          >
            {category} ({totalPosts})
          </button>
        );
      })}
    </div>
  );
};
