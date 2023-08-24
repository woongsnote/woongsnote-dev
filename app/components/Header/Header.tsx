'use client';
import DarkModeToggleButton from './DarkModeToggleButton';
import GitHubLink from './GitHubLink';
import NavBar from '../Nav/NavBar';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="sticky left-0 top-0 right-0 z-50 items-center mx-auto bg-white dark:bg-darkBlack max-w-5xl py-1 justify-between flex">
      <Logo />
      <div className="flex items-center justify-between">
        <NavBar />
        <DarkModeToggleButton />
        <GitHubLink />
      </div>
    </header>
  );
}
