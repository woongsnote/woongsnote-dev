import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const DarkModeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <button
          aria-label="dark mode"
          className="m-1 hover:text-yellow-300 rounded-full bg-gray-700"
          onClick={() => setTheme("light")}
        >
          <BsSunFill size={28} />
        </button>
      ) : (
        <button
          aria-label="light mode"
          className="m-1 hover:text-yellow-700 rounded-full"
          onClick={() => setTheme("dark")}
        >
          <BsMoonFill size={28} />
        </button>
      )}
    </>
  );
};

export default DarkModeToggleButton;
