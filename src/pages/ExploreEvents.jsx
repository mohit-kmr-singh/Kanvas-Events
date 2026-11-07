import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ChevronDown, 
  Search, 
  Heart, 
  Users 
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import { EVENTS_DATA } from '../data/events';
import { CATEGORIES } from '../data/categories';
import { useWishlist } from '../context/WishlistContext';

export default function ExploreEvents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Search param state - single source of truth from URL
  const selectedCategory = searchParams.get('category') || 'all';
  const featuredOnly = searchParams.get('featured') === 'true';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // all, this-month, upcoming
  const [priceFilter, setPriceFilter] = useState('all'); // all, free, paid
  const [sortBy, setSortBy] = useState('date-asc'); // date-asc, date-desc, name-asc, name-desc
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [visibleCount, setVisibleCount] = useState(8);

  // Extract unique campus locations from event data
  const uniqueCampuses = useMemo(() => {
    const campuses = new Set(
      EVENTS_DATA.map((e) => {
        const match = e.venue.match(/Campus \d+/);
        return match ? match[0] : e.venue;
      })
    );
    return Array.from(campuses).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
      return numA - numB;
    });
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // 1. Search keyword
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.shortDescription.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesCity = event.city.toLowerCase().includes(query);
        const matchesTag = event.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesCity && !matchesTag) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Location / Campus
      if (selectedCity !== 'all') {
        if (!event.venue.includes(selectedCity) && event.city !== selectedCity) {
          return false;
        }
      }

      // 4. Price
      if (priceFilter === 'free' && event.price.toLowerCase() !== 'free') {
        return false;
      }
      if (priceFilter === 'paid' && event.price.toLowerCase() === 'free') {
        return false;
      }

      // 5. Featured only
      if (featuredOnly && !event.featured) {
        return false;
      }

      // 6. Date filter
      if (dateFilter === 'this-month') {
        const eventDate = new Date(event.date);
        const now = new Date();
        if (eventDate.getMonth() !== now.getMonth() || eventDate.getFullYear() !== now.getFullYear()) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedCity, dateFilter, priceFilter, featuredOnly, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setDateFilter('all');
    setPriceFilter('all');
    setSortBy('date-asc');
    setSearchParams({});
    setVisibleCount(8);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedCity !== 'all' ||
    dateFilter !== 'all' ||
    priceFilter !== 'all' ||
    featuredOnly;

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D79005] dark:text-[#F8D237]">
          <Compass className="w-4 h-4" />
          <span>Curated Event Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Explore All Events
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Search across technology conferences, stadium music shows, world culture festivals, competitive sports, and hands-on workshops.
        </p>
      </div>

      {/* Search and Top Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="w-full md:flex-1">
          <SearchBar
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setVisibleCount(8);
            }}
            onClear={() => setSearchTerm('')}
            placeholder="Search by title, keynote, city, or topic (e.g. AI, Cyber, Marathon, Techno)..."
          />
        </div>

        {/* View Toggle & Quick Sort */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#F2B006] text-[#D79005] dark:text-[#121B28] shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#F2B006] text-[#D79005] dark:text-[#121B28] shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white dark:bg-[#2C3C55] text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-[#455A76] shadow-sm focus:outline-none focus:border-[#F2B006] cursor-pointer"
            >
              <option value="date-asc">Date: Soonest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="name-asc">Alphabetical: A → Z</option>
              <option value="name-desc">Alphabetical: Z → A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setVisibleCount(8);
              const next = new URLSearchParams(searchParams);
              if (cat.id === 'all') {
                next.delete('category');
              } else {
                next.set('category', cat.id);
              }
              setSearchParams(next);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-[#F2B006] text-[#121B28] shadow-md shadow-[#F2B006]/20 scale-105'
                : 'bg-white dark:bg-[#2C3C55] text-slate-600 dark:text-slate-300 hover:bg-amber-50/60 dark:hover:bg-[#394D6A] border border-slate-200 dark:border-[#455A76]'
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategory === cat.id ? 'bg-[#121B28]/20 text-[#121B28]' : 'bg-slate-200 dark:bg-[#121B28]/60 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat.id === 'all' ? EVENTS_DATA.length : cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Secondary Multi-Filters Bar */}
      <div className="p-4 rounded-2xl bg-[#F4EFE6] dark:bg-[#1E2B3E] border border-amber-200/60 dark:border-[#455A76] mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* City / Location filter */}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setVisibleCount(8);
              }}
              className="appearance-none pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-[#2C3C55] text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#455A76] focus:outline-none focus:border-[#F2B006] cursor-pointer"
            >
              <option value="all">All KIIT Campuses ({uniqueCampuses.length})</option>
              {uniqueCampuses.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
            <MapPin className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Price Filter */}
          <div className="relative">
            <select
              value={priceFilter}
              onChange={(e) => {
                setPriceFilter(e.target.value);
                setVisibleCount(8);
              }}
              className="appearance-none pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-[#2C3C55] text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#455A76] focus:outline-none focus:border-[#F2B006] cursor-pointer"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free Events Only</option>
              <option value="paid">Paid Events</option>
            </select>
            <DollarSign className="w-3.5 h-3.5 text-emerald-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Featured Toggle Button */}
          <button
            onClick={() => {
              setVisibleCount(8);
              const next = new URLSearchParams(searchParams);
              if (!featuredOnly) {
                next.set('featured', 'true');
              } else {
                next.delete('featured');
              }
              setSearchParams(next);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              featuredOnly
                ? 'bg-[#F2B006] text-[#121B28] shadow-sm font-bold'
                : 'bg-white dark:bg-[#2C3C55] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#121B28]" />
            <span>Featured Only</span>
          </button>
        </div>

        {/* Right side: Result count and Clear Filters */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{filteredEvents.length}</strong> events
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Events Results Area */}
      {filteredEvents.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-20 text-center rounded-3xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] shadow-lg space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            No Events Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We couldn't find any events matching your selected filters or search terms. Try searching with different keywords or reset your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-[#F2B006] text-[#121B28] font-bold text-xs hover:bg-[#D79005] shadow-lg shadow-[#F2B006]/20 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        /* List Layout */
        <div className="space-y-4">
          {visibleEvents.map((event) => {
            const wishlisted = isInWishlist(event.id);
            return (
              <div
                key={event.id}
                className="group flex flex-col md:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006]/60 hover:shadow-xl transition-all duration-200 gap-5"
              >
                {/* Image */}
                <div className="relative w-full md:w-56 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                    {event.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F2B006] text-[#121B28]">
                    {event.price}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237]" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237]" />
                      {event.venue}, {event.city}
                    </span>
                  </div>

                  <Link to={`/events/${event.id}`}>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#D79005] dark:group-hover:text-[#F8D237] transition-colors">
                      {event.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {event.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#D79005] dark:text-[#F8D237]" />
                      {event.registeredCount} / {event.totalSeats} seats taken
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center md:flex-col justify-end gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-[#455A76]/50">
                  <button
                    onClick={() => toggleWishlist(event.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      wishlisted
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-slate-100 dark:bg-[#121B28]/50 border-slate-200 dark:border-[#455A76] text-slate-400 hover:text-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>

                  <Link
                    to={`/events/${event.id}`}
                    className="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F2B006] hover:bg-[#D79005] text-[#121B28] text-center shadow-md shadow-[#F2B006]/20 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {visibleEvents.length < filteredEvents.length && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white dark:bg-[#2C3C55] text-slate-800 dark:text-white border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006] hover:text-[#D79005] dark:hover:text-[#F8D237] shadow-lg transition-all"
          >
            Load More Events ({filteredEvents.length - visibleEvents.length} Remaining)
          </button>
        </div>
      )}
    </div>
  );
}
