'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function Tabs() {
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
    <div className="mb-8 w-full lg:w-fit gap-8 flex flex-row justify-center text-center lg:text-start border shadow-md rounded-lg px-3 py-1 mx-auto lg:mx-0">
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
          } px-2 py-1 text-lg font-semibold hover:text-primary hover:dark:text-secondary hover:underline hover:underline-offset-8`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
