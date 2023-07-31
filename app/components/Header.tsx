'use client';
import Link from 'next/link';
import Image from 'next/image';
import DarkModeToggleButton from './Nav/DarkModeToggleButton';
import GitHubLink from './Nav/GitHubLink';
import NavBar from './Nav/NavBar';

const Header = (): React.ReactElement => {
  return (
    <header className="sticky left-0 top-0 right-0 z-50 items-center mx-auto bg-white dark:bg-[#111111] shadow-sm">
      <div className="flex justify-between items-center py-1 mx-auto max-w-5xl">
        <Link href="/" className="flex flex-row space-x-2 items-center">
          <Image
            width={40}
            height={40}
            src="https://avatars.githubusercontent.com/u/83802168?v=4"
            alt="프로필이미지"
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-center">Woongsnote</h1>
        </Link>
        <div className="flex items-center justify-between">
          <NavBar />
          <DarkModeToggleButton />
          <GitHubLink />
        </div>
      </div>
    </header>
  );
};
export default Header;
