import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useRef } from 'react';
import { AiOutlineReload, AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ setKeyword }: SearchBarProps) {
  const pathname = usePathname();

  const searchRef = useRef<HTMLInputElement>(null);

  if (pathname === '/') return;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchRef.current!.value);
  };
  const clearSearchHandler = () => {
    setKeyword(''); // 검색어를 초기화합니다.
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };
  return (
    <form className="relative mx-auto pt-2" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        ref={searchRef}
        className="w-full pl-4 pr-14 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        className="absolute right-8 top-0 mt-5 mr-4 text-center text-lg"
        type="button"
        onClick={clearSearchHandler}
      >
        <AiOutlineReload className="text-gray-400" />
      </button>
      <button className="absolute right-0 top-0 mt-5 mr-4 text-center text-lg">
        <AiOutlineSearch className="text-gray-400" />
      </button>
    </form>
  );
}
