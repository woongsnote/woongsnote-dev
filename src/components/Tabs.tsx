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
    <div className="mb-4 w-full gap-8 flex flex-row justify-center text-center rounded-lg px-3 py-1 mx-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => {
            router.push('/' + '?' + createQueryString('category', category));
          }}
          className={`${
            searchParams.get('category') === category
              ? 'text-primary dark:text-secondary underline underline-offset-8 font-bold'
              : 'text-gray-500'
          } px-2 py-1 text-lg font-semibold hover:text-primary hover:dark:text-secondary hover:underline hover:underline-offset-8 lg:text-3xl`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
