'use client';
import DarkModeToggleButton from './DarkModeToggleButton';
import GitHubLink from './GitHubLink';
import NavBar from '../Nav/NavBar';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 items-center bg-white dark:bg-darkBlack w-full sm:px-4 py-2 justify-between flex shadow-md dark:border-b-2">
      <Logo />
      <div className="flex items-center justify-between">
        <NavBar />
        <DarkModeToggleButton />
        <GitHubLink />
      </div>
    </header>
  );
}
