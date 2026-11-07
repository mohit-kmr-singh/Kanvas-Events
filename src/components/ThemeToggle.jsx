import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F2B006] cursor-pointer ${
        isDark
          ? 'bg-[#2C3C55] hover:bg-[#394D6A] text-[#F8D237] border border-[#455A76] shadow-sm'
          : 'bg-white hover:bg-slate-100 text-[#D79005] border border-slate-300 shadow-sm'
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
