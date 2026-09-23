import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-colors"
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-slate-700" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
