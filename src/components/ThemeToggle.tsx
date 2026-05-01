import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center p-1 bg-bg-primary/50 border border-border-soft rounded-full backdrop-blur-xl w-16 h-8 transition-all hover:bg-bg-primary/80 group overflow-hidden"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`
        absolute w-6 h-6 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-500 ease-out z-10
        ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}
      `}>
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-black" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-black" />
        )}
      </div>
      <div className="flex justify-between w-full px-1.5 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
        <Sun className="w-3 h-3 text-text-primary" />
        <Moon className="w-3 h-3 text-text-primary" />
      </div>
    </button>
  );
}

