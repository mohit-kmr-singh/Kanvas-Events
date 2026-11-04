import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Ticket, 
  Heart, 
  Info, 
  Mail, 
  Menu, 
  X, 
  LogOut,
  CalendarRange
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { getSavedRegistrations } from '../utils/registrationUtils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const registrationCount = getSavedRegistrations().length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Events', path: '/events', icon: Compass },
    { name: 'Calendar', path: '/calendar', icon: CalendarRange },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#101116]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/5'
          : 'bg-white/50 dark:bg-[#101116]/50 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8055FF] via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-[#8055FF]/25 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-purple-900 to-[#8055FF] dark:from-white dark:via-purple-200 dark:to-[#8055FF] bg-clip-text text-transparent font-['Outfit']">
                Kanvas<span className="text-[#8055FF]">Events</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold -mt-1">
                Every Event Has a Story
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#8055FF] dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/15 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <link.icon className="w-4 h-4 opacity-75" />
                {link.name}
              </NavLink>
            ))}

            {/* My Registrations Link */}
            <NavLink
              to="/my-registrations"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#8055FF] dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/15 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`
              }
            >
              <Ticket className="w-4 h-4 opacity-75" />
              <span>My Registrations</span>
              {registrationCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black rounded-full">
                  {registrationCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Button or User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 py-1 px-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[90px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#8055FF] dark:hover:text-[#8055FF] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8055FF] hover:bg-[#6c40f5] text-white shadow-lg shadow-[#8055FF]/25 hover:shadow-xl hover:shadow-[#8055FF]/35 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 dark:text-slate-200"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#101116] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-purple-500/15 text-[#8055FF] dark:text-purple-300 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`
              }
            >
              <link.icon className="w-5 h-5 text-[#8055FF]" />
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/my-registrations"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-purple-500/15 text-[#8055FF] dark:text-purple-300 font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-[#8055FF]" />
              <span>My Registrations</span>
            </div>
            {registrationCount > 0 && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                {registrationCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-purple-500/15 text-[#8055FF] dark:text-purple-300 font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          {/* Auth section in mobile menu */}
          <div className="pt-4 mt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="w-full py-2.5 text-center text-sm font-bold rounded-xl border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-white/5"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="w-full py-2.5 text-center text-sm font-bold rounded-xl bg-[#8055FF] text-white hover:bg-[#6c40f5]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
