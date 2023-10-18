'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const changeTheme = () => {
    return currentTheme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <button
      aria-label="dark mode toggle"
      className="w-fit h-fit p-2 shadow-md rounded-full hover:text-yellow-700 dark:hover:text-yellow-300 justify-self-end fixed bottom-4 right-2 bg-white dark:bg-darkBlack dark:border"
      onClick={() => {
        changeTheme();
      }}
    >
      {currentTheme === 'dark' ? (
        <BsSunFill size={24} />
      ) : (
        <BsMoonFill size={24} />
      )}
    </button>
  );
}
