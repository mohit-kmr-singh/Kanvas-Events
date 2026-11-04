/**
 * Validation utilities for forms
 */

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g. name@domain.com).';
  }
  return '';
}

export function validateFullName(name) {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }
  if (name.trim().length < 3) {
    return 'Full name must be at least 3 characters.';
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(name.trim())) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
  }
  return '';
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return 'Phone number is required.';
  }
  // Strip spaces, dashes, brackets
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (cleaned.length < 10 || cleaned.length > 15 || !/^\d+$/.test(cleaned)) {
    return 'Please enter a valid phone number (at least 10 digits).';
  }
  return '';
}

export function validateRequired(value, fieldName = 'This field') {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required.`;
  }
  return '';
}
