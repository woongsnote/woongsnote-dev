'use client';

import { allPosts } from '@/.contentlayer/generated';
import clsx from 'clsx';
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

  return (
    <div className="my-4 w-full gap-8 flex justify-center text-center mx-auto">
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
            className={clsx(
              'p-2 text-lg font-semibold lg:text-2xl text-gray-500',
              {
                'font-bold underline decoration-4 underline-offset-8 decoration-primary dark:decoration-secondary text-black dark:text-white':
                  searchParams.get('category') === category,
              },
            )}
          >
            {category} ({totalPosts})
          </button>
        );
      })}
    </div>
  );
};
