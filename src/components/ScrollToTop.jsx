import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Monitor scroll for floating button
  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] font-bold shadow-xl shadow-[#F2B006]/35 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F2B006] cursor-pointer no-print"
      aria-label="Scroll to top of page"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
