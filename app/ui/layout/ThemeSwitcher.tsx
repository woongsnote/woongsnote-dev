'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';
export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttonStyle =
    'w-fit h-fit hover:text-black dark:hover:text-white bg-transparent text-gray-500 p-1';

  const options = [
    {
      icon: <RiSunLine />,
      text: 'light',
    },
    {
      icon: <RiMoonLine />,
      text: 'dark',
    },
    {
      icon: <RiComputerLine />,
      text: 'system',
    },
  ];

  return (
    <div className="flex gap-2 border shadow-sm p-2 rounded-md">
      {options.map((opt) => (
        <button
          key={opt.text}
          aria-label={`set ${opt.text} theme button`}
          className={`${buttonStyle} ${
            theme === opt.text && 'text-primary dark:text-secondary'
          }`}
          onClick={() => setTheme(opt.text)}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};
