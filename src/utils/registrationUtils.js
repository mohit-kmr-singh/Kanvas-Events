const REGISTRATIONS_KEY = 'kanvas_registrations';
const RECENTLY_VIEWED_KEY = 'kanvas_recently_viewed';

export function generateRegistrationId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KNV-2026-${code}`;
}

export function getSavedRegistrations() {
  try {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error fetching registrations from localStorage:', err);
    return [];
  }
}

export function saveRegistration(registrationData) {
  try {
    const list = getSavedRegistrations();
    const newEntry = {
      ...registrationData,
      id: registrationData.id || generateRegistrationId(),
      registeredAt: new Date().toISOString()
    };
    const updated = [newEntry, ...list];
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Error saving registration to localStorage:', err);
    throw new Error('Failed to save registration.', { cause: err });
  }
}

export function isAlreadyRegistered(eventId, email) {
  if (!eventId || !email) return false;
  const list = getSavedRegistrations();
  const normalizedEmail = email.trim().toLowerCase();
  return list.some(
    (item) => item.eventId === eventId && item.email?.trim().toLowerCase() === normalizedEmail
  );
}

export function cancelRegistration(registrationId) {
  try {
    const list = getSavedRegistrations();
    const filtered = list.filter((item) => item.id !== registrationId);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Error canceling registration:', err);
    return false;
  }
}

export function getRecentlyViewed() {
  try {
    const data = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(eventId) {
  try {
    if (!eventId) return;
    let list = getRecentlyViewed().filter((id) => id !== eventId);
    list.unshift(eventId);
    if (list.length > 8) {
      list = list.slice(0, 8);
    }
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error updating recently viewed:', err);
  }
}
