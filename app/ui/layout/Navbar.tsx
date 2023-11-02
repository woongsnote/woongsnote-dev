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
    <div className="flex items-center gap-8">
      {navLinks.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          aria-label={`move to ${title} page`}
          className={clsx(
            'text-base lg:text-xl',
            {
              'font-bold text-content underline decoration-primary decoration-4 underline-offset-8':
                pathname === href,
            },
            { 'text-gray-500': pathname !== href },
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
