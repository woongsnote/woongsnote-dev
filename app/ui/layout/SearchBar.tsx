'use client';

import { useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineReload, AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  if (pathname === '/') return;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      pathname + '?' + createQueryString('search', searchRef.current?.value!),
    );
  };

  const clearSearchHandler = () => {
    if (searchRef.current) {
      searchRef.current.value = '';
      router.replace(pathname);
    }
  };

  return (
    <form
      className="relative mx-auto mb-4 px-2 pt-2 lg:px-0"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder="검색할 제목을 입력하세요"
        ref={searchRef}
        className="w-full rounded-md border-2 border-gray-300 py-2 pl-4 pr-14 focus:border-blue-500 focus:outline-none"
      />
      <button
        className="absolute right-8 top-0 mr-4 mt-5 text-center text-lg"
        type="button"
        onClick={clearSearchHandler}
      >
        <AiOutlineReload className="text-gray-400" />
      </button>
      <button
        className="absolute right-0 top-0 mr-4 mt-5 text-center text-lg"
        type="submit"
      >
        <AiOutlineSearch className="text-gray-400" />
      </button>
    </form>
  );
};
