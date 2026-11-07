import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, CheckCircle2 } from 'lucide-react';
import { validateEmail } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('attendee@kanvasevents.com');
  const [password, setPassword] = useState('demo1234');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    login(email, password);
    navigate(-1); // Return to previous page or home
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-3xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] shadow-2xl">
        <div className="text-center space-y-2">
          <img
            src="/logo.png"
            alt="Kanvas Events Logo"
            className="w-16 h-16 object-contain mx-auto drop-shadow-md"
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Log in to automatically prefill your registrations and sync passes.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-3.5 rounded-xl bg-[#F2B006]/15 border border-[#F2B006]/30 text-xs text-[#D79005] dark:text-[#F8D237] space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237]" />
            <span>Interactive Demo Credentials Pre-loaded</span>
          </div>
          <p className="text-[11px] opacity-80 text-slate-700 dark:text-slate-300">
            Email: <code className="font-mono font-bold">attendee@kanvasevents.com</code> • Password: <code className="font-mono font-bold">demo1234</code>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1E2B3E] text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-[#455A76] focus:outline-none focus:border-[#F2B006]"
                required
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 font-semibold">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1E2B3E] text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-[#455A76] focus:outline-none focus:border-[#F2B006]"
                required
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500 font-semibold">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] shadow-xl shadow-[#F2B006]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Kanvas</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <span>Don't have an account yet? </span>
          <Link to="/signup" className="text-[#D79005] dark:text-[#F8D237] font-bold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
