'use client';

import DarkModeToggleButton from './DarkModeToggleButton';
import GitHubLink from './GitHubLink';
import NavBar from '../Nav/NavBar';
import Logo from './Logo';

export default function Header() {
  return (
    <header>
      <Logo />
      <div className="flex items-center justify-between">
        <NavBar />
        <DarkModeToggleButton />
        <GitHubLink />
      </div>
    </header>
  );
}
