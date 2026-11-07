import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Ticket, Compass } from 'lucide-react';
import TicketPass from '../components/TicketPass';
import { getSavedRegistrations } from '../utils/registrationUtils';

export default function RegistrationSuccess() {
  const location = useLocation();

  // Try getting passed registration or fallback to latest saved
  const passedRegistration = location.state?.registration;
  const latestRegistration = passedRegistration || getSavedRegistrations()[0];

  useEffect(() => {
    // Fire festive celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const timeout = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  if (!latestRegistration) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          No Recent Registration Found
        </h2>
        <p className="text-slate-500">
          You haven’t registered for any events yet, or your previous tickets are in your account.
        </p>
        <Link
          to="/events"
          className="inline-flex px-6 py-3 rounded-xl bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] font-bold text-xs shadow-md"
        >
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Top Congratulatory Header */}
      <div className="text-center space-y-3 no-print">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20 shadow-xl shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Registration Confirmed
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          You’re Officially In!
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          Your attendance pass has been generated and securely saved to your local browser storage.
        </p>
      </div>

      {/* Ticket Pass with QR Code */}
      <TicketPass registration={latestRegistration} />

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 no-print">
        <Link
          to="/my-registrations"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] shadow-xl shadow-[#F2B006]/20 flex items-center justify-center gap-2 transition-all"
        >
          <Ticket className="w-4 h-4" />
          <span>Go to My Registrations</span>
        </Link>

        <Link
          to="/events"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white dark:bg-[#2C3C55] text-slate-800 dark:text-white border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006] flex items-center justify-center gap-2 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore More Events</span>
        </Link>
      </div>
    </div>
  );
}
