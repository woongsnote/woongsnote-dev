'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const Tabs = () => {
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

  return (
    <div className="my-4 w-fit gap-8 flex justify-center text-center rounded-lg px-3 py-1 mx-auto border-4">
      {categories.map((category) => (
        <button
          key={category}
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
          {category}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
