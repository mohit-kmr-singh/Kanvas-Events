import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Zap, 
  Compass, 
  Ticket, 
  Award,
  ChevronRight,
  Cpu,
  Music,
  Palette,
  Trophy,
  Hammer,
  GraduationCap
} from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import EventCard from '../components/EventCard';
import { EVENTS_DATA } from '../data/events';
import { CATEGORIES } from '../data/categories';

export default function Home() {
  // Major featured event for Next Big Event countdown
  const nextMajorEvent = EVENTS_DATA[0]; // Global AI & Future Tech Summit 2026

  // Featured events
  const featuredEvents = EVENTS_DATA.filter((e) => e.featured);

  // Upcoming preview events (excluding the top 2 featured to show variety)
  const upcomingPreview = EVENTS_DATA.slice(2, 6);

  // Map category icons
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'technology': return Cpu;
      case 'music': return Music;
      case 'cultural': return Palette;
      case 'sports': return Trophy;
      case 'workshops': return Hammer;
      case 'seminars': return GraduationCap;
      default: return Sparkles;
    }
  };

  const stats = [
    { label: 'Upcoming Events', value: `${EVENTS_DATA.length}+`, icon: Calendar },
    { label: 'Community Attendees', value: '25,000+', icon: Users },
    { label: 'Curated Categories', value: '6+', icon: Award },
    { label: 'Campus Venues', value: '25+', icon: MapPin }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Seamless Digital Booking',
      desc: 'Instant registration in under 60 seconds. No clunky account setup required.'
    },
    {
      icon: Ticket,
      title: 'Dynamic QR-Code Passes',
      desc: 'Receive digital passes with unique verifiable QR codes instantly stored in your browser.'
    },
    {
      icon: ShieldCheck,
      title: 'Curated High-Value Gatherings',
      desc: 'Every convention, concert, and workshop is vetted for peer-level quality.'
    },
    {
      icon: Compass,
      title: 'Personalized Discovery',
      desc: 'Filter by interest, dates, and locations. Save favorites to your private wishlist.'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ======================================================== */}
      {/* HERO SECTION                                             */}
      {/* ======================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Cinematic Gradient Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=80"
            alt="Event Atmosphere"
            className="w-full h-full object-cover object-center opacity-15 dark:opacity-20 scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-[#FDFBF7]/90 to-[#FDFBF7] dark:from-[#121B28]/85 dark:via-[#121B28]/95 dark:to-[#121B28]" />
          {/* Ambient Gold/Amber Light Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F2B006]/10 dark:bg-[#F2B006]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#D79005]/10 dark:bg-[#D79005]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2B006]/15 border border-[#F2B006]/30 text-[#D79005] dark:text-[#F8D237] text-xs sm:text-sm font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4 text-[#D79005] dark:text-[#F8D237]" />
            <span>Discover Unforgettable Moments & Gatherings</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-[1.1]">
            Every Event <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#D79005] via-[#F2B006] to-[#F8D237] bg-clip-text text-transparent">
              Has a Story.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Kanvas Events is your gateway to world-class technology summits, electrifying music odysseys, cultural festivals, and hands-on masterclasses. Explore, wishlist, and register in seconds.
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] shadow-xl shadow-[#F2B006]/25 hover:shadow-2xl hover:shadow-[#F2B006]/35 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/calendar"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-white dark:bg-[#2C3C55] hover:bg-amber-50/60 dark:hover:bg-[#394D6A] text-slate-800 dark:text-white border border-slate-300 dark:border-[#455A76] shadow-md dark:shadow-none backdrop-blur-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-[#D79005] dark:text-[#F8D237]" />
              <span>View Event Calendar</span>
            </Link>
          </div>

          {/* Quick search hint pills */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Popular Searches:</span>
            <Link to="/events?category=technology" className="px-2.5 py-1 rounded-lg bg-slate-200/70 hover:bg-slate-300 dark:bg-[#2C3C55] dark:hover:bg-[#394D6A] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent dark:border-[#455A76]/40">
              #AI-Summit
            </Link>
            <Link to="/events?category=music" className="px-2.5 py-1 rounded-lg bg-slate-200/70 hover:bg-slate-300 dark:bg-[#2C3C55] dark:hover:bg-[#394D6A] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent dark:border-[#455A76]/40">
              #ElectronicMusic
            </Link>
            <Link to="/events?category=sports" className="px-2.5 py-1 rounded-lg bg-slate-200/70 hover:bg-slate-300 dark:bg-[#2C3C55] dark:hover:bg-[#394D6A] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent dark:border-[#455A76]/40">
              #CityMarathon
            </Link>
            <Link to="/events?category=workshops" className="px-2.5 py-1 rounded-lg bg-slate-200/70 hover:bg-slate-300 dark:bg-[#2C3C55] dark:hover:bg-[#394D6A] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent dark:border-[#455A76]/40">
              #UIDesignSprint
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* NEXT BIG EVENT COUNTDOWN BANNER                          */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="relative rounded-3xl overflow-hidden border border-amber-200/70 dark:border-[#455A76] bg-white dark:bg-gradient-to-r dark:from-[#121B28] dark:via-[#2C3C55] dark:to-[#121B28] shadow-2xl p-6 sm:p-10 backdrop-blur-xl">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F2B006] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Event Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Next Flagship Gathering
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] leading-tight">
                {nextMajorEvent.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {nextMajorEvent.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#D79005] dark:text-[#F8D237]" />
                  {nextMajorEvent.date} ({nextMajorEvent.time})
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#D79005] dark:text-[#F8D237]" />
                  {nextMajorEvent.venue}, {nextMajorEvent.city}
                </span>
              </div>
            </div>

            {/* Countdown & CTA */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-6 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-[#455A76] pt-6 lg:pt-0 lg:pl-8">
              <CountdownTimer
                targetDate={nextMajorEvent.countdownTarget}
                label="Countdown to Kickoff"
              />

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to={`/events/${nextMajorEvent.id}/register`}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] shadow-lg shadow-[#F2B006]/25 transition-all text-center"
                >
                  Reserve Your Seat
                </Link>
                <Link
                  to={`/events/${nextMajorEvent.id}`}
                  className="px-4 py-3 rounded-xl font-bold text-sm bg-slate-100 dark:bg-[#394D6A] hover:bg-slate-200 dark:hover:bg-[#455A76] text-slate-800 dark:text-white border border-slate-200 dark:border-[#455A76] transition-all text-center"
                >
                  Event Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PLATFORM STATISTICS                                      */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative p-6 rounded-2xl bg-white/80 dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] shadow-lg backdrop-blur-md flex flex-col items-center text-center group hover:border-[#F2B006]/60 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* EXPLORE BY CATEGORY                                      */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
              <Compass className="w-4 h-4" />
              <span>Browse Specializations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D79005] dark:text-[#F8D237] hover:gap-2.5 transition-all"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            return (
              <Link
                key={cat.id}
                to={`/events?category=${cat.id}`}
                className="group relative p-6 rounded-2xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006]/70 hover:shadow-xl hover:shadow-[#F2B006]/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2B006]/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F2B006] group-hover:text-[#121B28] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#394D6A] text-slate-600 dark:text-slate-300">
                      {cat.count} Events
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#D79005] dark:group-hover:text-[#F8D237] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#455A76]/50 flex items-center justify-between text-xs font-bold text-[#D79005] dark:text-[#F8D237]">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* FEATURED EVENTS SECTION                                  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              Featured Events
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              High-demand experiences you will not want to miss.
            </p>
          </div>
          <Link
            to="/events?featured=true"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D79005] dark:text-[#F8D237] hover:gap-2.5 transition-all"
          >
            <span>See all featured</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} featuredVariant={true} />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* WHY CHOOSE KANVAS EVENTS                                 */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#F4EFE6] dark:bg-[#1E2B3E] border border-amber-200/60 dark:border-[#455A76] relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
              The Kanvas Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              Why Choose Kanvas Events?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              We empower curious minds and passionate communities to gather effortlessly with state-of-the-art frontend tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat) => (
              <div key={feat.title} className="flex flex-col items-start space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F2B006]/20 text-[#D79005] dark:text-[#F8D237] flex items-center justify-center">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* UPCOMING EVENTS PREVIEW                                  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
              <Calendar className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              More Upcoming Experiences
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D79005] dark:text-[#F8D237] hover:gap-2.5 transition-all"
          >
            <span>Browse Complete Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingPreview.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* PROMOTIONAL CTA SECTION                                  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center bg-gradient-to-r from-[#121B28] via-[#2C3C55] to-[#121B28] border border-[#F2B006]/35 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F2B006]/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-[#F2B006]/20 border border-[#F2B006]/30 text-[#F8D237] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              Join Our Community
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight">
              Ready to Experience Something Extraordinary?
            </h2>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed">
              Browse dozens of live events, secure your access pass, or sync your tickets straight to your device.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/events"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] shadow-xl shadow-[#F2B006]/20 transition-all duration-200"
              >
                Find Your Next Event
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold bg-[#394D6A]/80 hover:bg-[#455A76] text-white border border-[#455A76] backdrop-blur-md transition-all duration-200"
              >
                Host an Event With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
