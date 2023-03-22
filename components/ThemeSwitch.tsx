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
    <div className="md:mx-4 md:px-2 flex justify-center mx-1">
      {currentTheme === "dark" ? (
        <button
          aria-label="dark mode"
          className="p-1 hover:text-yellow-300 rounded-full bg-gray-700"
          onClick={() => setTheme("light")}
        >
          <BsSunFill size={24} />
        </button>
      ) : (
        <button
          aria-label="light mode"
          className="p-1 hover:text-yellow-900 rounded-full shadow-lg"
          onClick={() => setTheme("dark")}
        >
          <BsMoonFill size={24} />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitch;
