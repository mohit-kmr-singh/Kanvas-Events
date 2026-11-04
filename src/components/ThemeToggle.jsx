import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8055FF] cursor-pointer ${
        isDark
          ? 'bg-[#20212A] hover:bg-[#2c2d3a] text-amber-300 border border-white/10 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-purple-900 border border-slate-300 shadow-sm'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle visual theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
