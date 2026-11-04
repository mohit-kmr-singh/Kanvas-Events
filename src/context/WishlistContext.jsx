import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { EVENTS_DATA } from '../data/events';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('kanvas_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('kanvas_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Error saving wishlist:', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (eventId) => {
    const exists = wishlistIds.includes(eventId);
    const event = EVENTS_DATA.find((e) => e.id === eventId);
    const title = event ? event.title : 'Event';

    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== eventId));
      addToast(`"${title}" removed from your wishlist.`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, eventId]);
      addToast(`"${title}" saved to your wishlist!`, 'success');
    }
  };

  const isInWishlist = (eventId) => wishlistIds.includes(eventId);

  const wishlistEvents = EVENTS_DATA.filter((e) => wishlistIds.includes(e.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistEvents,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
