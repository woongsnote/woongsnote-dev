import Link from 'next/link';
import Logo from '@/app/ui/Logo';

const navLinks = [
  { href: '/about', title: 'About' },
  { href: '/posts', title: 'Posts' },
];

export const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 items-center bg-white dark:bg-darkBlack w-full px-2 lg:px-4 py-2 shadow-sm">
      <div className="container mx-auto justify-between flex">
        <Logo />
        <div className="flex gap-2 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              aria-label={`move to ${link.title} page`}
              className="font-bold hover:text-primary text-base lg:text-xl"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
