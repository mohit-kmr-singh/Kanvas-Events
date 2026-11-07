import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { validateEmail, validateFullName } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameErr = validateFullName(name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    signup(name, email, password);
    navigate('/events');
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
            Create an Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Join the Kanvas Events community to explore and manage your passes.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Smith"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1E2B3E] text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-[#455A76] focus:outline-none focus:border-[#F2B006]"
                required
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 font-semibold">{errors.name}</p>}
          </div>

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
                placeholder="e.g. jordan@example.com"
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
                placeholder="At least 6 characters"
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
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <span>Already registered? </span>
          <Link to="/login" className="text-[#D79005] dark:text-[#F8D237] font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
