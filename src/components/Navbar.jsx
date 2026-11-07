import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Ticket, 
  Heart, 
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
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDFBF7]/90 dark:bg-[#121B28]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#455A76]/40 shadow-lg shadow-black/5'
          : 'bg-[#FDFBF7]/60 dark:bg-[#121B28]/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <img
              src="/logo.png"
              alt="Kanvas Events Logo"
              className="w-11 h-11 object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#121B28] dark:text-white font-['Outfit'] leading-tight">
                Kanvas<span className="text-[#F2B006]">Events</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#455A76] dark:text-slate-400 font-semibold">
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
                      ? 'text-[#D79005] dark:text-[#F8D237] bg-[#F2B006]/15 dark:bg-[#F2B006]/20 font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#D79005] dark:hover:text-[#F8D237] hover:bg-[#F2B006]/10 dark:hover:bg-[#394D6A]/50'
                  }`
                }
              >
                <link.icon className="w-4 h-4 opacity-80" />
                {link.name}
              </NavLink>
            ))}

            {/* My Registrations Link */}
            <NavLink
              to="/my-registrations"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#D79005] dark:text-[#F8D237] bg-[#F2B006]/15 dark:bg-[#F2B006]/20 font-bold shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#D79005] dark:hover:text-[#F8D237] hover:bg-[#F2B006]/10 dark:hover:bg-[#394D6A]/50'
                }`
              }
            >
              <Ticket className="w-4 h-4 opacity-80" />
              <span>My Registrations</span>
              {registrationCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#F2B006] text-[#121B28] text-[10px] font-black rounded-full shadow-sm">
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
              className="relative p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-[#394D6A]/50 transition-colors"
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
            {isAuthenticated && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-[#455A76]/50">
                <div className="flex items-center gap-2 py-1 px-2.5 rounded-xl bg-[#F2B006]/10 border border-[#F2B006]/30">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-[#121B28] dark:text-white max-w-[90px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
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
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#394D6A]/50 transition-colors focus:outline-none"
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
          className="md:hidden border-b border-slate-200 dark:border-[#455A76]/50 bg-[#FDFBF7] dark:bg-[#121B28] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#F2B006]/20 text-[#D79005] dark:text-[#F8D237] font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2C3C55]'
                }`
              }
            >
              <link.icon className="w-5 h-5 text-[#F2B006]" />
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/my-registrations"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#F2B006]/20 text-[#D79005] dark:text-[#F8D237] font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2C3C55]'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-[#F2B006]" />
              <span>My Registrations</span>
            </div>
            {registrationCount > 0 && (
              <span className="px-2 py-0.5 bg-[#F2B006] text-[#121B28] text-xs font-bold rounded-full">
                {registrationCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#F2B006]/20 text-[#D79005] dark:text-[#F8D237] font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2C3C55]'
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
          {isAuthenticated && (
            <div className="pt-4 mt-3 border-t border-slate-200 dark:border-[#455A76]/50 flex flex-col gap-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F2B006]/10">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 rounded-lg cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
