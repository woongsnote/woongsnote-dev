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
    <div className="md:mx-4 md:px-2 flex justify-center">
      {currentTheme === "dark" ? (
        <button
          className="p-1 border-2 rounded-md"
          onClick={() => setTheme("light")}
        >
          <BsSunFill />
        </button>
      ) : (
        <button
          className="p-1 border-2 rounded-md"
          onClick={() => setTheme("dark")}
        >
          <BsMoonFill />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitch;
