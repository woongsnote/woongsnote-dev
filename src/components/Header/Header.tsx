'use client';

import { Logo, NavBar } from '@/components';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Header() {
  return (
    <header>
      <Logo />
      <NavBar />
      {/* <ThemeSwitcher /> */}
    </header>
  );
}
