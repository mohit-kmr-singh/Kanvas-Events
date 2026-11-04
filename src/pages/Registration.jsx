import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  ShieldCheck, 
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { validateEmail, validateFullName, validatePhone } from '../utils/validation';
import { saveRegistration, isAlreadyRegistered } from '../utils/registrationUtils';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Registration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const event = EVENTS_DATA.find((e) => e.id === id);

  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    ticketTier: 'General Admission',
    specialRequests: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email
      }));
    }
  }, [user]);

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
        <p className="text-slate-500">The event you are attempting to register for does not exist.</p>
        <Link to="/events" className="inline-flex px-6 py-3 rounded-xl bg-[#8055FF] text-white font-bold text-xs">
          Browse Events
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Reset duplicate warning if email changed
    if (name === 'email') {
      setDuplicateWarning(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    const nameErr = validateFullName(formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions to complete registration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDuplicateWarning(false);

    if (!validate()) {
      addToast('Please resolve the errors highlighted below.', 'error');
      return;
    }

    // Check duplicate registration
    if (isAlreadyRegistered(event.id, formData.email)) {
      setDuplicateWarning(true);
      addToast('You have already registered for this event with this email.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const newRegistration = saveRegistration({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue,
        eventCity: event.city,
        eventCategory: event.category,
        eventPrice: event.price,
        eventImage: event.image,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        ticketTier: formData.ticketTier,
        specialRequests: formData.specialRequests.trim()
      });

      addToast('Registration confirmed successfully!', 'success');

      // Navigate to registration success with registration object in state
      navigate('/registration-success', {
        state: { registration: newRegistration },
        replace: true
      });
    } catch (err) {
      console.error(err);
      addToast('Failed to complete registration. Please try again.', 'error');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-[#8055FF] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/events" className="hover:text-[#8055FF] transition-colors">
          Events
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/events/${event.id}`} className="hover:text-[#8055FF] transition-colors max-w-[180px] truncate">
          {event.title}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#8055FF] font-bold">Register</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (7 cols): Registration Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8055FF]">
              <Ticket className="w-4 h-4" />
              <span>Attendee Registration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Register for {event.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Complete your attendee information below to generate your verifiable digital pass.
            </p>
          </div>

          {/* Duplicate Registration Warning Banner */}
          {duplicateWarning && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Existing Registration Detected</span>
              </div>
              <p className="leading-relaxed">
                A registration for <strong>{event.title}</strong> is already recorded for <strong>{formData.email}</strong>. Each attendee can only register once per email address.
              </p>
              <div className="pt-1">
                <Link
                  to="/my-registrations"
                  className="font-bold underline text-amber-300 hover:text-white"
                >
                  View your confirmed pass in My Registrations →
                </Link>
              </div>
            </div>
          )}

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-xl space-y-6"
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-slate-900 dark:text-white text-sm border focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-rose-500 font-semibold">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-slate-900 dark:text-white text-sm border focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                  }`}
                />
              </div>
              {errors.email ? (
                <p className="text-xs text-rose-500 font-semibold">{errors.email}</p>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Your digital ticket confirmation and QR pass will be linked to this email.
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 555-019-2834"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-slate-900 dark:text-white text-sm border focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-500 font-semibold">{errors.phone}</p>
              )}
            </div>

            {/* Ticket Tier */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Pass Tier Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['General Admission', 'VIP Access Pass', 'Early Supporter'].map((tier) => (
                  <label
                    key={tier}
                    className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.ticketTier === tier
                        ? 'border-[#8055FF] bg-purple-500/10 text-slate-900 dark:text-white font-bold ring-1 ring-[#8055FF]'
                        : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#171822] text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ticketTier"
                      value={tier}
                      checked={formData.ticketTier === tier}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold leading-tight">{tier}</span>
                    <span className="text-[10px] text-slate-400 mt-1">Included with entry</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests / Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Special Requests or Dietary / Accessibility Notes (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={2}
                placeholder="Wheelchair seating, dietary preferences, or specific breakout topic interests..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#8055FF] focus:ring-2 focus:ring-[#8055FF]/20 transition-all resize-none"
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="space-y-1 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded text-[#8055FF] focus:ring-[#8055FF] accent-[#8055FF] cursor-pointer"
                />
                <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  I agree to the Kanvas Events{' '}
                  <span className="text-[#8055FF] font-semibold underline">Attendee Code of Conduct</span> and acknowledge that my registration will be recorded securely in local storage.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-500 font-semibold">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#8055FF] to-purple-600 hover:from-[#6c40f5] hover:to-purple-700 text-white shadow-xl shadow-[#8055FF]/30 hover:shadow-2xl hover:shadow-[#8055FF]/40 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-purple-200" />
              <span>{submitting ? 'Confirming Registration...' : 'Complete & Generate Digital Pass'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Instant client-side verification • No card needed for free events</span>
            </div>
          </form>
        </div>

        {/* Right Column (5 cols): Selected Event Summary Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8055FF]">
              Selected Event Summary
            </span>

            {/* Event Media Preview */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-black/60 text-white backdrop-blur-md">
                {event.category}
              </span>
              <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#8055FF] text-white">
                {event.price}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white leading-snug">
                {event.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                {event.shortDescription}
              </p>
            </div>

            {/* Event Key Meta Items */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-[#8055FF] shrink-0" />
                <span>
                  <strong>Date:</strong> {event.date}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-[#8055FF] shrink-0" />
                <span>
                  <strong>Time:</strong> {event.time}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-[#8055FF] shrink-0" />
                <span>
                  <strong>Venue:</strong> {event.venue}, {event.city}
                </span>
              </div>
            </div>

            {/* Back link */}
            <div className="pt-2">
              <Link
                to={`/events/${event.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Event or Review Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
