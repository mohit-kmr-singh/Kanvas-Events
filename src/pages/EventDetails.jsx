import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart, 
  Share2, 
  ArrowLeft, 
  CheckCircle, 
  Ticket, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import CountdownTimer from '../components/CountdownTimer';
import EventCard from '../components/EventCard';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { addRecentlyViewed } from '../utils/registrationUtils';

export default function EventDetails() {
  const { id } = useParams();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const event = EVENTS_DATA.find((e) => e.id === id);

  // Track in recently viewed
  useEffect(() => {
    if (event) {
      addRecentlyViewed(event.id);
    }
  }, [event]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Event Not Found
        </h1>
        <p className="text-slate-500">
          The event you are seeking could not be found or has expired.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8055FF] text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(event.id);
  const seatsLeft = event.totalSeats - event.registeredCount;
  const isSoldOut = seatsLeft <= 0;

  // Related events: same category or other events excluding current
  const relatedEvents = EVENTS_DATA.filter(
    (e) => e.id !== event.id && (e.category === event.category || e.featured)
  ).slice(0, 3);

  // Share Event handler
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: event.title,
      text: `${event.title} — Happening on ${event.date} at ${event.venue}. Register now on Kanvas Events!`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast('Event link copied to clipboard!', 'success');
  };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen pb-20">
      {/* ======================================================== */}
      {/* HERO BANNER SECTION                                      */}
      {/* ======================================================== */}
      <div className="relative min-h-[420px] md:min-h-[500px] flex items-end overflow-hidden">
        {/* Banner image with overlay */}
        <img
          src={event.bannerImage || event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-900/60 to-black/50 dark:from-[#101116] dark:via-[#101116]/80 dark:to-transparent" />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6 flex-wrap">
            <Link to="/" className="hover:text-[#8055FF] dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <Link to="/events" className="hover:text-[#8055FF] dark:hover:text-white transition-colors">
              Events
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="text-[#8055FF] max-w-[200px] truncate">{event.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-[#8055FF] text-white">
              {event.category}
            </span>
            {event.featured && (
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Featured
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                event.price.toLowerCase() === 'free' ? 'bg-emerald-500 text-white' : 'bg-black/50 dark:bg-white/20 text-white backdrop-blur-md'
              }`}
            >
              {event.price}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] max-w-4xl leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700 dark:text-slate-300 mt-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#8055FF]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#8055FF]" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#8055FF]" />
              {event.venue}, {event.city}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN CONTENT & SIDEBAR GRID                              */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (8 cols): Event Overview, Highlights, Schedule */}
          <div className="lg:col-span-8 space-y-10">
            {/* About the Event */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                About This Event
              </h2>
              <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {event.description}
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Tags:</span>
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Event Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8055FF]">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Experience Points</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  Event Highlights & Takeaways
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {event.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20"
                    >
                      <CheckCircle className="w-5 h-5 text-[#8055FF] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Event Schedule / Agenda */}
            {event.schedule && event.schedule.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8055FF]">
                    <Clock className="w-4 h-4" />
                    <span>Run of Show</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
                    Event Schedule & Agenda
                  </h2>
                </div>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-500/30 space-y-6">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#8055FF] border-4 border-white dark:border-[#20212A]" />

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#171822] border border-slate-200 dark:border-white/10 space-y-1">
                        <span className="text-xs font-mono font-bold text-[#8055FF]">
                          {item.time}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        {item.speaker && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Led by: <strong className="text-slate-700 dark:text-slate-300">{item.speaker}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Organizer Info */}
            {event.organizer && (
              <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#8055FF]/30"
                  />
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8055FF]">
                      Presented By
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {event.organizer.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {event.organizer.role} • {event.organizer.email}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                      {event.organizer.bio}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Booking & Meta Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Registration Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-2xl space-y-6">
                {/* Price & Status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Registration Pass
                    </span>
                    <div className="text-3xl font-black text-slate-900 dark:text-white font-['Outfit']">
                      {event.price}
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      isSoldOut
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}
                  >
                    {isSoldOut ? 'Sold Out' : 'Registration Open'}
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="pb-4 border-b border-slate-100 dark:border-white/10">
                  <CountdownTimer
                    targetDate={event.countdownTarget || `${event.date}T09:00:00`}
                    label="Event Countdown"
                    size="compact"
                  />
                </div>

                {/* Capacity Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#8055FF]" />
                      Seat Capacity
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      {event.registeredCount} / {event.totalSeats} ({seatsLeft} left)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8055FF] to-purple-400"
                      style={{ width: `${Math.min(100, (event.registeredCount / event.totalSeats) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-2">
                  {isSoldOut ? (
                    <button
                      disabled
                      className="w-full py-4 rounded-2xl font-bold text-sm bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed text-center"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <Link
                      to={`/events/${event.id}/register`}
                      className="w-full py-4 rounded-2xl font-bold text-sm bg-[#8055FF] hover:bg-[#6c40f5] text-white shadow-xl shadow-[#8055FF]/30 hover:shadow-2xl hover:shadow-[#8055FF]/40 transition-all text-center flex items-center justify-center gap-2 group"
                    >
                      <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>Register for Event</span>
                    </Link>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => toggleWishlist(event.id)}
                      type="button"
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                        wishlisted
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                      <span>{wishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      type="button"
                      className="py-3 px-4 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-[#8055FF] transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share Event</span>
                    </button>
                  </div>
                </div>

                {/* Security Guarantee Note */}
                <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Instant confirmation & QR code badge</span>
                </div>
              </div>

              {/* Venue & Location Preview Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-lg space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8055FF]" />
                  <span>Venue Information</span>
                </h3>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {event.venue}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {event.city} • United States
                </p>
                {/* Mock Interactive Map styling */}
                <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <MapPin className="w-6 h-6 text-[#8055FF] mx-auto animate-bounce" />
                    <span className="text-[11px] text-slate-300 font-mono">
                      {event.venue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RELATED & RECOMMENDED EVENTS                             */}
        {/* ======================================================== */}
        {relatedEvents.length > 0 && (
          <section className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8055FF]">
                  More to Discover
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
                  Related Events in {event.category.toUpperCase()}
                </h2>
              </div>
              <Link
                to={`/events?category=${event.category}`}
                className="text-xs font-bold text-[#8055FF] dark:text-purple-400 hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((rel) => (
                <EventCard key={rel.id} event={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
