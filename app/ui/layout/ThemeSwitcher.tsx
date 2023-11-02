'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';
import clsx from 'clsx';
export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
          className={clsx(
            'w-fit h-fit hover:text-primary bg-transparent text-gray-500 p-1',
            { 'text-primary': theme === opt.text },
          )}
          onClick={() => setTheme(opt.text)}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};
