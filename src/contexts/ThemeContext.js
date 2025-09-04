"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(theme === "dark" || (!theme && systemTheme));
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log("Theme changing to:", isDark ? "dark" : "light");
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        console.log("Dark class added to HTML");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        console.log("Dark class removed from HTML");
      }
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    console.log("Toggle theme clicked, current isDark:", isDark);
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
