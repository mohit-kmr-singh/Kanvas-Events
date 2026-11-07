import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';

export default function Contact() {
  const [copiedType, setCopiedType] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2B006]/15 border border-[#F2B006]/30 text-[#D79005] dark:text-[#F8D237] text-xs font-semibold backdrop-blur-md">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
          Contact & Support
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Have inquiries regarding an event pass, registrations, or event coordination? Reach out to our team directly.
        </p>
      </div>

      {/* Contact Channels Card */}
      <div className="max-w-xl mx-auto w-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#2C3C55] border border-slate-200 dark:border-[#455A76] shadow-2xl space-y-8">
        <div className="text-center sm:text-left border-b border-slate-100 dark:border-[#455A76]/50 pb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
            Direct Contact Information
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect via email or direct phone line for immediate event assistance.
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#1E2B3E] border border-slate-200/80 dark:border-[#455A76]/60 hover:border-[#F2B006]/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Email
                </span>
                <a
                  href="mailto:mohitkumar784870@gmail.com"
                  className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white hover:text-[#D79005] dark:hover:text-[#F8D237] transition-colors break-all"
                >
                  mohitkumar784870@gmail.com
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard('mohitkumar784870@gmail.com', 'email')}
              className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-white dark:bg-[#2C3C55] text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006] flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="Copy email address"
            >
              {copiedType === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Phone Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#1E2B3E] border border-slate-200/80 dark:border-[#455A76]/60 hover:border-[#F2B006]/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2B006]/15 text-[#D79005] dark:text-[#F8D237] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Phone Enquiries
                </span>
                <a
                  href="tel:7903176833"
                  className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white hover:text-[#D79005] dark:hover:text-[#F8D237] transition-colors"
                >
                  7903176833
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard('7903176833', 'phone')}
              className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-white dark:bg-[#2C3C55] text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#455A76] hover:border-[#F2B006] flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="Copy phone number"
            >
              {copiedType === 'phone' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
