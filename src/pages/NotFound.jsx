import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <span className="text-8xl sm:text-9xl font-black font-['Outfit'] text-[#F2B006]/25 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Page Not Found
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          The event or page you are looking for may have moved, expired, or doesn’t exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F2B006] text-[#121B28] font-bold text-sm hover:bg-[#D79005] shadow-lg shadow-[#F2B006]/25 flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/events"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-[#2C3C55] text-slate-800 dark:text-white border border-transparent dark:border-[#455A76] hover:border-[#F2B006] font-bold text-sm hover:bg-slate-200 dark:hover:bg-[#394D6A] flex items-center justify-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
