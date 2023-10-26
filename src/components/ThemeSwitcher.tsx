'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const buttonStyle =
    'w-fit h-fit hover:text-yellow-700 dark:hover:text-yellow-300 bg-transparent active:text-yellow-800';

  return (
    <div className="flex gap-2 border shadow-sm p-2 rounded-md">
      <button
        className={`${buttonStyle}`}
        onClick={() => {
          setTheme('light');
        }}
      >
        <RiSunLine />
      </button>
      <button
        className={`${buttonStyle}`}
        onClick={() => {
          setTheme('dark');
        }}
      >
        <RiMoonLine />
      </button>
      <button
        className={`${buttonStyle} ${
          currentTheme === 'system' ? 'text-yellow-500' : ''
        }`}
        onClick={() => {
          setTheme('system');
        }}
      >
        <RiComputerLine />
      </button>
    </div>
  );
}
