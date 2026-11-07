import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Calendar, 
  MapPin, 
  Printer, 
  CheckCircle2 
} from 'lucide-react';

export default function TicketPass({ registration, showActions = true }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (!registration) return;

    // Generate verifiable QR payload
    const payload = JSON.stringify({
      id: registration.id,
      event: registration.eventTitle,
      attendee: registration.fullName,
      email: registration.email,
      date: registration.eventDate,
      verifiedBy: 'Kanvas-Events-Protocol-2026'
    });

    QRCode.toDataURL(payload, {
      width: 256,
      margin: 1,
      color: {
        dark: '#121B28',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate QR Code:', err));
  }, [registration]);

  if (!registration) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Printable Digital Ticket Card */}
      <div
        id={`ticket-${registration.id}`}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121B28] via-[#2C3C55] to-[#121B28] text-white border border-[#F2B006]/50 shadow-2xl p-6 sm:p-8 print:p-6 print:border print:border-black print:text-black print:bg-white"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 print:border-slate-300">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Kanvas Events Logo"
              className="w-10 h-10 object-contain drop-shadow"
            />
            <div>
              <span className="font-extrabold text-xl tracking-tight font-['Outfit']">
                Kanvas<span className="text-[#F2B006] print:text-black">Events</span>
              </span>
              <p className="text-[10px] tracking-widest uppercase text-slate-300 print:text-slate-600 font-semibold">
                Official Admission Pass
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#F8D237] print:text-slate-700 font-bold block">
              Registration ID
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-white print:text-black tracking-wider bg-white/10 print:bg-slate-100 px-2.5 py-1 rounded-lg">
              {registration.id}
            </span>
          </div>
        </div>

        {/* Event Title & Category */}
        <div className="py-6 border-b border-white/10 print:border-slate-300 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#F2B006] text-[#121B28] print:bg-slate-200 print:text-black">
              {registration.eventCategory || 'Event'}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white print:border print:text-black">
              {registration.ticketTier || 'General Admission'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white print:text-black leading-tight">
            {registration.eventTitle}
          </h2>
        </div>

        {/* Date, Time, Venue Grid */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-white/10 print:border-slate-300 text-xs">
          <div className="space-y-1">
            <span className="text-slate-300 print:text-slate-600 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F2B006] print:text-black" /> Date & Time
            </span>
            <p className="font-bold text-sm text-white print:text-black">
              {registration.eventDate}
            </p>
            <p className="text-slate-300 print:text-slate-600">
              {registration.eventTime}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-300 print:text-slate-600 font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F2B006] print:text-black" /> Venue & Location
            </span>
            <p className="font-bold text-sm text-white print:text-black">
              {registration.eventVenue}
            </p>
            <p className="text-slate-300 print:text-slate-600">
              {registration.eventCity}
            </p>
          </div>
        </div>

        {/* Attendee Info & QR Code Section */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          <div className="sm:col-span-8 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-300 print:text-slate-600 font-bold block">
                Attendee Name
              </span>
              <p className="font-bold text-base text-white print:text-black">
                {registration.fullName}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 print:text-slate-600 font-bold block">
                  Email
                </span>
                <p className="font-medium text-slate-200 print:text-black truncate">
                  {registration.email}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 print:text-slate-600 font-bold block">
                  Phone
                </span>
                <p className="font-medium text-slate-200 print:text-black">
                  {registration.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 print:text-emerald-700 font-semibold pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmed Entry • Pass Active</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-white text-slate-900 shadow-md">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt={`QR code for ${registration.id}`}
                className="w-28 h-28 object-contain"
              />
            ) : (
              <div className="w-28 h-28 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-[10px] text-slate-400">
                Generating QR...
              </div>
            )}
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600 mt-1 font-bold">
              Scan at Venue
            </span>
          </div>
        </div>

        {/* Decorative Notches for Ticket Effect */}
        <div className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FDFBF7] dark:bg-[#121B28] border-r border-[#F2B006]/40 print:hidden" />
        <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FDFBF7] dark:bg-[#121B28] border-l border-[#F2B006]/40 print:hidden" />
      </div>

      {/* Action Buttons: Print / Download */}
      {showActions && (
        <div className="flex items-center justify-center gap-3 pt-2 no-print">
          <button
            onClick={() => window.print()}
            type="button"
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-[#2C3C55] text-slate-800 dark:text-white border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006] shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#F2B006]" />
            <span>Print Pass / Save as PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}
