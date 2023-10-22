'use client';

import { Logo } from '@/components';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container mx-auto justify-between flex">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <Link
            href="about"
            className="font-bold hover:text-primary text-base lg:text-xl"
          >
            About
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
