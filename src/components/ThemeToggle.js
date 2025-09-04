"use client";

import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-10">
        <div className="glass-button p-4 rounded-full shadow-2xl border-2 border-white/40 dark:border-white/30">
          <div className="w-8 h-8"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-10"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="glass-button p-4 rounded-full shadow-2xl border-2 border-white/40 dark:border-white/30"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <FaSun className="text-yellow-400 text-2xl drop-shadow-lg" />
          ) : (
            <FaMoon className="text-blue-500 text-2xl drop-shadow-lg" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ThemeToggle;
