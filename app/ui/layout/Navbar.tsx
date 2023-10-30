'use client';

import clsx from 'clsx';
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
          className={clsx('text-base lg:text-xl', {
            'decoration-4 underline underline-offset-8 decoration-primary dark:decoration-secondary font-bold':
              pathname === href,
            'text-zinc-600 dark:text-zinc-400': pathname !== href,
          })}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
