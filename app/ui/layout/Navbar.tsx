'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/about', title: 'About' },
  { href: '/posts', title: 'Posts' },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center">
      {navLinks.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          aria-label={`move to ${title} page`}
          className={`hover:text-primary hover:dark:text-secondary hover:underline underline-offset-8 text-base lg:text-xl ${
            pathname === href
              ? 'text-primary dark:text-secondary font-bold'
              : 'text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-secondary'
          }`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
