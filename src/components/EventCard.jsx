import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Heart, Users, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function EventCard({ event, featuredVariant = false }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(event.id);

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 border ${
        featuredVariant
          ? 'bg-gradient-to-br from-white/95 to-slate-50 dark:from-[#20212A] dark:to-[#171821] border-[#8055FF]/40 shadow-xl shadow-[#8055FF]/10'
          : 'bg-white dark:bg-[#20212A] border-slate-200 dark:border-white/10 hover:border-[#8055FF]/60 hover:shadow-xl hover:shadow-[#8055FF]/10 hover:-translate-y-1'
      }`}
    >
      {/* Event Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/20">
              {event.category}
            </span>
            {event.featured && (
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                Featured
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(event.id);
            }}
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 border ${
              wishlisted
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 scale-105'
                : 'bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border-white/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price Tag in Bottom Right of Image */}
        <div className="absolute bottom-3 right-3 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md ${
              event.price.toLowerCase() === 'free'
                ? 'bg-emerald-500 text-white'
                : 'bg-[#8055FF] text-white'
            }`}
          >
            {event.price}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#8055FF]" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#8055FF]" />
            {event.city}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/events/${event.id}`}
          className="group-hover:text-[#8055FF] transition-colors focus:outline-none"
        >
          <h3 className="font-bold text-lg leading-snug line-clamp-2 text-slate-900 dark:text-[#F4F2EE] mb-2">
            {event.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
          {event.shortDescription}
        </p>

        {/* Attendance & Organizer */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>
              <strong className="text-slate-900 dark:text-white font-semibold">{event.registeredCount}</strong> / {event.totalSeats} registered
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center gap-1 font-semibold text-xs text-[#8055FF] dark:text-purple-400 hover:underline"
            >
              Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
