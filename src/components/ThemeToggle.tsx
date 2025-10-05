'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />;

    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />;
    } else if (resolvedTheme === 'dark') {
      return <Moon className="w-5 h-5" />;
    } else {
      return <Sun className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    if (!mounted) return 'Loading...';

    if (theme === 'system') {
      return `System (${systemTheme === 'dark' ? 'Dark' : 'Light'})`;
    } else if (theme === 'dark') {
      return 'Dark';
    } else {
      return 'Light';
    }
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
        disabled
      >
        <Monitor className="w-5 h-5 text-gray-400" />
      </button>
    );
  }

  return (
    <div className="relative group">
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Current: ${getLabel()}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme + resolvedTheme}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {getIcon()}
          </motion.div>
        </AnimatePresence>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-full opacity-0"
          whileTap={{
            scale: [0, 2],
            opacity: [0.3, 0],
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg px-3 py-1 whitespace-nowrap">
          {getLabel()}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
