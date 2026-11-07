import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0C131D] text-slate-300 border-t border-[#394D6A]/40 pt-12 pb-10 overflow-hidden">
      {/* Background glow effect with gold palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#F2B006]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-8 border-b border-[#394D6A]/40 text-center md:text-left">
          {/* Brand info */}
          <div className="space-y-3 max-w-xl">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Kanvas Events Logo"
                className="w-11 h-11 object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                Kanvas<span className="text-[#F2B006]">Events</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Every Event Has a Story. Discover, explore, and register for premier technology conventions, music odysseys, cultural festivals, sports championships, and workshops hosted at Kalinga Institute of Industrial Technology, Bhubaneswar.
            </p>
          </div>

          {/* GitHub Repo Link */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mohit-kmr-singh/Kanvas-Events"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121B28] hover:bg-[#2C3C55] text-xs font-semibold text-slate-300 hover:text-[#F8D237] transition-colors border border-[#394D6A]/50 shadow-sm"
              aria-label="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Kanvas Events. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-[#F8D237] transition-colors">
              Contact & Support
            </Link>
            <span className="inline-flex items-center gap-1 text-[#F2B006]">
              <ShieldCheck className="w-3.5 h-3.5" /> Client-Side Local Storage Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
