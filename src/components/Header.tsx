import Link from 'next/link';
import { Logo } from '@/components';
const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 items-center bg-white dark:bg-darkBlack w-full px-2 lg:px-4 py-2 shadow-sm">
      <div className="container mx-auto justify-between flex">
        <Logo />
        <div className="flex gap-2 items-center">
          <Link
            href="about"
            className="font-bold hover:text-primary text-base lg:text-xl"
          >
            About
          </Link>
          <Link
            href="posts"
            className="font-bold hover:text-primary text-base lg:text-xl"
          >
            Posts
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
