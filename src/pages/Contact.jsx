import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info,
  MessageSquare
} from 'lucide-react';
import { validateEmail, validateFullName } from '../utils/validation';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); // Index of open FAQ item

  const faqs = [
    {
      q: 'How do I register for an event on Kanvas Events?',
      a: 'Simply browse any event from the Home or Explore Events pages, click "Register Now", enter your name, email, and phone number, and confirm. Your official admission pass and verifiable QR code will be generated instantly.'
    },
    {
      q: 'Where are my event passes and tickets stored?',
      a: 'All event registrations are stored securely in your browser\'s Local Storage. You can access them at any time from the "My Registrations" page, even offline or after page reloads.'
    },
    {
      q: 'Can I cancel or modify my registration?',
      a: 'Yes. Navigate to "My Registrations" and click the trash can icon on the desired pass. Confirming cancellation will remove the record from your browser and release your reserved seat.'
    },
    {
      q: 'How does the QR Code check-in pass work?',
      a: 'Each ticket comes with an encoded high-resolution QR pass that includes your unique registration ID, event title, attendee name, and verification signature. Event organizers can scan this directly from your mobile screen or a printed sheet.'
    },
    {
      q: 'Can I host or submit my own event to Kanvas Events?',
      a: 'Currently, Kanvas Events operates as a curated discovery platform. If you are an event producer, summit director, or workshop host, reach out through our contact form with details about your gathering.'
    },
    {
      q: 'Does Kanvas Events charge booking fees?',
      a: 'No. Free events are completely free of charge. Paid events listed on Kanvas Events reflect the direct face-value ticket pricing set by verified event organizers.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameErr = validateFullName(formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      addToast('Please correct the highlighted fields in the form.', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Message received! We will get back to you shortly.', 'success');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#8055FF] dark:text-purple-300 text-xs font-semibold">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Contact & Support
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Have inquiries regarding an event pass, partnership, or sponsorship? Our concierge support team is here to assist.
        </p>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Operating Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              Contact Channels
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Reach out directly or visit our headquarters during operational hours.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#8055FF]/10 text-[#8055FF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Email
                  </span>
                  <a href="mailto:support@kanvasevents.com" className="text-sm font-semibold text-slate-800 dark:text-white hover:text-[#8055FF]">
                    support@kanvasevents.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#8055FF]/10 text-[#8055FF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Phone Inquiries
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    +1 (800) 526-8273
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#8055FF]/10 text-[#8055FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Headquarters
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    548 Market Street, Suite 39000<br />San Francisco, CA 94104
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#8055FF]/10 text-[#8055FF] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Operating Hours
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Monday – Friday: 08:00 AM – 06:00 PM EST<br />Saturday: 10:00 AM – 03:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Note */}
          <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#8055FF] dark:text-purple-300">
              <Info className="w-4 h-4" />
              <span>Frontend Architecture Notice</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              This application operates entirely client-side without an external mail server or backend. Submitted inquiries demonstrate interactive form validation and visual feedback.
            </p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message Sent Successfully!</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-200">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <em>"{formData.subject}"</em> has been recorded. Our team will review your message promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-2 text-xs font-bold underline hover:text-white"
                >
                  Send another inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Lee"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-sm text-slate-900 dark:text-white border focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 font-semibold">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jordan@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-sm text-slate-900 dark:text-white border focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 font-semibold">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Partnership inquiry for Tech Summit 2026"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-sm text-slate-900 dark:text-white border focus:outline-none focus:ring-2 transition-all ${
                      errors.subject
                        ? 'border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-500 font-semibold">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we assist you today? Please share details..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#171822] text-sm text-slate-900 dark:text-white border focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? 'border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-white/10 focus:border-[#8055FF] focus:ring-[#8055FF]/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 font-semibold">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-[#8055FF] hover:bg-[#6c40f5] text-white shadow-xl shadow-[#8055FF]/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FAQ SECTION ACCORDION                                    */}
      {/* ======================================================== */}
      <section className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8055FF]">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Answers to our most common questions regarding ticket passes, QR codes, and local storage.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#8055FF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
