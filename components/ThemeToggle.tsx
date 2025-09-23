"use client";

import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
     <button onClick={toggleTheme} className="p-2 rounded">
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6 text-gray-800" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      )}
    </button>
  );
}
