import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarRange, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';

export default function CalendarView() {
  // Center initial calendar on November 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDateStr(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDateStr(null);
  };

  // Compute days in current month
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Map events to date strings "YYYY-MM-DD"
  const eventsByDate = {};
  EVENTS_DATA.forEach((event) => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }
    eventsByDate[event.date].push(event);
  });

  // Events in this current viewed month
  const currentMonthEvents = EVENTS_DATA.filter((event) => {
    const d = new Date(event.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  // Filtered displayed events: if date selected, show that date; otherwise show all month events
  const displayedEvents = selectedDateStr
    ? eventsByDate[selectedDateStr] || []
    : currentMonthEvents;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8055FF]">
          <CalendarRange className="w-4 h-4" />
          <span>Interactive Schedule</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Event Calendar
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Browse upcoming schedules across days and months to plan your participation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Widget (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
          {/* Calendar Month Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Blank offset days */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayEvents = eventsByDate[dateStr] || [];
              const hasEvents = dayEvents.length > 0;
              const isSelected = selectedDateStr === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedDateStr(null); // Deselect to show all month
                    } else {
                      setSelectedDateStr(dateStr);
                    }
                  }}
                  type="button"
                  className={`aspect-square relative rounded-2xl flex flex-col items-center justify-center p-1 sm:p-2 transition-all font-medium text-xs sm:text-sm ${
                    isSelected
                      ? 'bg-[#8055FF] text-white shadow-lg shadow-[#8055FF]/30 font-bold scale-105 z-10'
                      : hasEvents
                      ? 'bg-purple-500/10 dark:bg-purple-500/20 text-[#8055FF] dark:text-purple-300 font-bold hover:scale-105 border border-purple-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{day}</span>
                  {hasEvents && (
                    <div className="flex items-center gap-1 mt-0.5">
                      {dayEvents.map((e, idx) => (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-[#8055FF]'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend and Helper */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8055FF]" />
              <span>Indicates scheduled event date</span>
            </div>
            {selectedDateStr && (
              <button
                onClick={() => setSelectedDateStr(null)}
                className="font-bold text-[#8055FF] hover:underline"
              >
                Show All Month
              </button>
            )}
          </div>
        </div>

        {/* Selected Date or Month Events Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {selectedDateStr ? `Events on ${selectedDateStr}` : `All Events in ${monthNames[currentMonth]} ${currentYear}`}
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              {displayedEvents.length} {displayedEvents.length === 1 ? 'Event' : 'Events'}
            </span>
          </div>

          {displayedEvents.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No events scheduled for this selection
              </p>
              <p className="text-xs text-slate-400">
                Click on highlighted dates or explore other months.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-md space-y-3 hover:border-[#8055FF]/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#8055FF]/10 text-[#8055FF] dark:text-purple-300">
                      {event.category}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {event.price}
                    </span>
                  </div>

                  <Link to={`/events/${event.id}`}>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white hover:text-[#8055FF] transition-colors leading-snug">
                      {event.title}
                    </h4>
                  </Link>

                  <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8055FF]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8055FF]" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      to={`/events/${event.id}`}
                      className="text-xs font-bold text-[#8055FF] dark:text-purple-300 hover:underline flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/events/${event.id}/register`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#8055FF] text-white text-xs font-bold hover:bg-[#6c40f5] shadow-sm"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
