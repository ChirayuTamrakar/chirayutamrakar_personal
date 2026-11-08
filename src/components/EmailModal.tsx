import React, { useState } from 'react';
import { BIO_DATA } from '../data/content';
import { submitContactMessage } from '../lib/firebase';
import { X, Mail, Copy, Check, Send } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(BIO_DATA.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Failed to send message. Please copy the email address directly.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in font-serif">
      <div className="bg-[#FAF9F6] border border-[#DDD7CD] rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#666] hover:text-black cursor-pointer p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2 text-sm text-[#777]">
          <Mail className="w-4 h-4 text-[#444]" />
          <span>Get in touch</span>
        </div>

        <h3 className="text-2xl font-normal text-[#1A1A1A] mb-3">
          Contact Chirayu
        </h3>

        <p className="text-[15px] leading-relaxed text-[#555] mb-6">
          Always excited to connect with fellow researchers, founders, rationalists, and curious builders in AI safety and governance.
        </p>

        {/* Quick Email Copy Box */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#DEDBD2] bg-[#FCFBF8] mb-6">
          <div>
            <span className="text-xs font-sans text-[#888] block">Direct Email</span>
            <span className="text-[16px] font-mono text-[#111]">{BIO_DATA.socials.email}</span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 text-xs font-sans px-3 py-1.5 rounded-lg border border-[#D5D0C5] bg-white hover:bg-[#F2EFE8] text-[#333] transition-colors cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#555]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center animate-fade-in">
            <Check className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
            <h4 className="font-medium text-[17px]">Message sent!</h4>
            <p className="text-xs text-emerald-700 mt-1">
              Thanks for reaching out. Chirayu will read and get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-sans underline cursor-pointer text-emerald-800"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-medium text-[#444] mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 rounded-lg border border-[#D8D4CA] bg-white text-[#111] text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444] mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 rounded-lg border border-[#D8D4CA] bg-white text-[#111] text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444] mb-1">
                Message / Ideas
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building or thinking about?"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[#D8D4CA] bg-white text-[#111] text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-[#1A1A1A] text-white hover:bg-black transition-colors text-sm font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
