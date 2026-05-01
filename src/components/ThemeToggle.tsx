import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center p-1 bg-bg-card border border-border-soft rounded-full backdrop-blur-md w-16 h-8 transition-colors hover:bg-bg-secondary"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`
        absolute w-6 h-6 rounded-full bg-bg-primary shadow-sm flex items-center justify-center transition-all duration-300
        ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}
      `}>
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-accent-gold" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-accent-gold" />
        )}
      </div>
      <div className="flex justify-between w-full px-1.5 pointer-events-none opacity-20">
        <Sun className="w-3 h-3 text-text-primary" />
        <Moon className="w-3 h-3 text-text-primary" />
      </div>
    </button>
  );
}

