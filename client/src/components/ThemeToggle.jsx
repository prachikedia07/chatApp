import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);



  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="theme-button fixed p-2 rounded-full glow-on-hover z-50 bottom-16 right-4 sm:bottom-6 sm:right-8"
      title="Toggle Theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export default ThemeToggle;
