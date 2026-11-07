import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Trash2, 
  Eye, 
  Search, 
  Compass, 
  X, 
  AlertTriangle 
} from 'lucide-react';
import { getSavedRegistrations, cancelRegistration } from '../utils/registrationUtils';
import TicketPass from '../components/TicketPass';
import { useToast } from '../context/ToastContext';

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState(() => getSavedRegistrations());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null); // For full ticket modal
  const [confirmCancelId, setConfirmCancelId] = useState(null); // ID of registration to cancel
  const { addToast } = useToast();

  const loadRegistrations = () => {
    const list = getSavedRegistrations();
    setRegistrations(list);
  };

  const handleCancel = (id) => {
    const success = cancelRegistration(id);
    if (success) {
      addToast('Registration cancelled successfully.', 'info');
      setConfirmCancelId(null);
      if (selectedTicket?.id === id) {
        setSelectedTicket(null);
      }
      loadRegistrations();
    } else {
      addToast('Failed to cancel registration.', 'error');
    }
  };

  // Filter registrations by search term
  const filtered = registrations.filter((reg) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      reg.eventTitle.toLowerCase().includes(q) ||
      reg.id.toLowerCase().includes(q) ||
      reg.eventCity?.toLowerCase().includes(q) ||
      reg.fullName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
            <Ticket className="w-4 h-4" />
            <span>Attendee Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            My Event Passes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View, download, print, or manage your confirmed admissions stored in your browser.
          </p>
        </div>

        {registrations.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] font-bold text-xs border border-[#F2B006]/30">
              {registrations.length} Active {registrations.length === 1 ? 'Pass' : 'Passes'}
            </span>
          </div>
        )}
      </div>

      {/* Main Body */}
      {registrations.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-20 text-center rounded-3xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] shadow-xl space-y-5 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] mx-auto flex items-center justify-center">
            <Ticket className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Registrations Yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            You haven't registered for any events yet. Explore our curated events directory and claim your spot today!
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#F2B006]/20 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Events</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search Filter when multiple */}
          {registrations.length > 2 && (
            <div className="max-w-md">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by event name, city, or ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#2C3C55] text-slate-800 dark:text-white placeholder-slate-400 text-xs font-medium border border-slate-200 dark:border-[#455A76] focus:outline-none focus:border-[#F2B006]"
                />
              </div>
            </div>
          )}

          {/* Registrations Grid / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006]/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Top */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={item.eventImage}
                    alt={item.eventTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* ID Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {item.id}
                  </span>

                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500 text-white">
                    Confirmed
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
                      {item.eventCategory} • {item.ticketTier}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 mt-1 group-hover:text-[#D79005] dark:group-hover:text-[#F8D237] transition-colors">
                      {item.eventTitle}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237]" />
                        <span>{item.eventDate} ({item.eventTime})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237]" />
                        <span className="truncate">{item.eventVenue}, {item.eventCity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-[#455A76]/50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedTicket(item)}
                      type="button"
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] flex items-center justify-center gap-1.5 shadow-md shadow-[#F2B006]/20 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View QR Pass</span>
                    </button>

                    <button
                      onClick={() => setConfirmCancelId(item.id)}
                      type="button"
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Cancel Registration"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TICKET DETAILS MODAL                                     */}
      {/* ======================================================== */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FDFBF7] dark:bg-[#121B28] p-4 sm:p-6 border border-slate-200 dark:border-[#455A76] shadow-2xl">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 transition-colors z-20 no-print"
              aria-label="Close ticket view"
            >
              <X className="w-5 h-5" />
            </button>

            <TicketPass registration={selectedTicket} />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CANCEL REGISTRATION CONFIRMATION MODAL                   */}
      {/* ======================================================== */}
      {confirmCancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Cancel Registration?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to cancel pass <strong>{confirmCancelId}</strong>? Your reservation will be removed and your seat made available for other attendees.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setConfirmCancelId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                Keep Registration
              </button>
              <button
                onClick={() => handleCancel(confirmCancelId)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30"
              >
                Yes, Cancel Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
