import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="md:mx-4 md:px-2 flex justify-center mx-1 fixed top-2 sm:top-auto sm:bottom-24 right-4 pb-1 z-50">
      {currentTheme === "dark" ? (
        <button
          aria-label="dark mode"
          className="p-1 hover:text-yellow-300 rounded-full bg-gray-700"
          onClick={() => setTheme("light")}
        >
          <BsSunFill size={28} />
        </button>
      ) : (
        <button
          aria-label="light mode"
          className="p-1 hover:text-yellow-900 rounded-full shadow-lg"
          onClick={() => setTheme("dark")}
        >
          <BsMoonFill size={28} />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitch;
