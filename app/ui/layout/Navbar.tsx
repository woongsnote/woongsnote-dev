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
    <div className="flex gap-8 items-center">
      {navLinks.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          aria-label={`move to ${title} page`}
          className={`text-base lg:text-xl ${
            pathname === href
              ? 'border-b-4 rounded-b-sm border-primary dark:border-secondary font-bold'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
