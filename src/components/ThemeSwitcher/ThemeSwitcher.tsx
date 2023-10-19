'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
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
      className="w-fit h-fit p-1 justify-self-end hover:text-yellow-700 dark:hover:text-yellow-300 bg-transparent"
      onClick={() => {
        changeTheme();
      }}
    >
      {currentTheme === 'dark' ? (
        <RiSunFill size={24} />
      ) : (
        <RiMoonFill size={24} />
      )}
    </button>
  );
}
