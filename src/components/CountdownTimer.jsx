import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, label = 'Starts In', size = 'normal' }) {
  const calculateTimeLeft = React.useCallback(() => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      ended: false
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (timeLeft.ended) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2B006]/15 border border-[#F2B006]/40 text-[#D79005] dark:text-[#F8D237] text-sm font-bold">
        <span className="w-2 h-2 rounded-full bg-[#F2B006] animate-ping" />
        Event Live or Concluded
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds }
  ];

  const isCompact = size === 'compact';

  return (
    <div className="flex flex-col items-start gap-2">
      {label && (
        <span className="text-xs uppercase tracking-wider font-extrabold text-[#D79005] dark:text-[#F8D237]">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center">
            <div
              className={`flex flex-col items-center justify-center rounded-xl font-mono border backdrop-blur-md transition-all shadow-md ${
                isCompact
                  ? 'min-w-[50px] py-1.5 px-2 bg-[#F2B006]/10 dark:bg-[#121B28] border-[#D79005]/30 dark:border-[#455A76]/50'
                  : 'min-w-[64px] sm:min-w-[72px] py-2 sm:py-3 px-2 sm:px-3 bg-white/95 dark:bg-[#2C3C55] border-slate-200 dark:border-[#455A76]/60'
              }`}
            >
              <span
                className={`font-black tracking-tight leading-none text-[#D79005] dark:text-[#F8D237] ${
                  isCompact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'
                }`}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
              <span
                className={`uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ${
                  isCompact ? 'text-[9px] mt-0.5' : 'text-[10px] sm:text-xs mt-1'
                }`}
              >
                {unit.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span className="text-slate-400 dark:text-[#455A76] font-bold mx-1 text-sm sm:text-base">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
