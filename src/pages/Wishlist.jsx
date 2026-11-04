import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import EventCard from '../components/EventCard';

export default function Wishlist() {
  const { wishlistEvents, wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500">
            <Heart className="w-4 h-4 fill-current" />
            <span>Saved Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Your Event Wishlist
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Keep track of the summits, concerts, and workshops you’re planning to attend.
          </p>
        </div>

        {wishlistCount > 0 && (
          <span className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 font-bold text-xs border border-rose-500/20">
            {wishlistCount} Saved {wishlistCount === 1 ? 'Event' : 'Events'}
          </span>
        )}
      </div>

      {wishlistCount === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-20 text-center rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-xl space-y-5 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Click the heart icon on any event card to save it here for quick access later.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#8055FF] hover:bg-[#6c40f5] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#8055FF]/25 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Events</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
