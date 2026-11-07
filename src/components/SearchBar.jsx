import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search events by name, topic, or keyword...',
  className = ''
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-4 pointer-events-none text-slate-400 dark:text-slate-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-[#2C3C55] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 border border-slate-200 dark:border-[#455A76]/50 shadow-sm focus:outline-none focus:border-[#F2B006] focus:ring-2 focus:ring-[#F2B006]/25 text-sm font-medium transition-all"
      />

      {value && (
        <button
          onClick={onClear}
          type="button"
          aria-label="Clear search"
          className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#394D6A] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
