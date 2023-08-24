import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

export default function DarkModeToggleButton() {
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
      className="m-1 rounded-full hover:text-yellow-700 dark:hover:text-yellow-300"
      onClick={() => {
        changeTheme();
      }}
    >
      {currentTheme === 'dark' ? (
        <BsSunFill size={30} />
      ) : (
        <BsMoonFill size={30} />
      )}
    </button>
  );
}
