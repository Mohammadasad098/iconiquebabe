import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Check } from 'lucide-react';

export const WaitlistModal: React.FC = () => {
  const { isWaitlistOpen, setIsWaitlistOpen, waitlistProduct, showToast, addSubscriber } = useShop();
  const [tab, setTab] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isWaitlistOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'email' && email) {
      addSubscriber(email, undefined, 'Waitlist');
    }
    setSubmitted(true);
    showToast('You are on the @iconiquebabe VIP waitlist! 💖');
    setTimeout(() => {
      setSubmitted(false);
      setIsWaitlistOpen(false);
      setEmail('');
      setPhone('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Join Waitlist">
      <div
        className="fixed inset-0 bg-[#241019]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWaitlistOpen(false)}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#fbcfe8] relative transform transition-all duration-300 rounded-xs">
          <button
            onClick={() => setIsWaitlistOpen(false)}
            className="absolute top-4 right-4 p-1 text-[#1f1217] hover:text-[#db2777] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] font-mono-typewriter uppercase tracking-widest text-[#db2777] font-bold">
            Priority Access
          </span>
          <h2 className="font-mono-typewriter text-lg sm:text-xl uppercase font-bold text-[#1f1217] tracking-tight mb-2">
            Join The Waitlist
          </h2>
          <p className="font-sans-editorial text-xs text-[#4a1829]/80 leading-relaxed mb-6">
            {waitlistProduct
              ? `Be first to know when ${waitlistProduct.title} is restocked by @iconiquebabe.`
              : 'Enter your email or phone number for first access to upcoming @iconiquebabe pink drops and limited restocks.'}
          </p>

          {submitted ? (
            <div className="p-4 bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] text-xs font-mono-typewriter uppercase flex items-center gap-2 rounded-xs font-semibold">
              <Check className="w-4 h-4 text-[#db2777]" />
              <span>You&apos;re on the priority waitlist! 🎀</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tab Selector */}
              <div className="flex border-b border-[#fbcfe8] text-xs font-mono-typewriter uppercase">
                <button
                  type="button"
                  onClick={() => setTab('email')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    tab === 'email' ? 'border-b-2 border-[#db2777] font-bold text-[#db2777]' : 'text-[#4a1829]/60'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setTab('phone')}
                  className={`pb-2 px-3 transition-colors cursor-pointer ${
                    tab === 'phone' ? 'border-b-2 border-[#db2777] font-bold text-[#db2777]' : 'text-[#4a1829]/60'
                  }`}
                >
                  Phone
                </button>
              </div>

              {tab === 'email' ? (
                <div>
                  <label htmlFor="waitlist-email" className="block text-[11px] font-mono-typewriter uppercase text-[#1f1217] mb-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 bg-[#fff8fa] border border-[#fbcfe8] text-xs font-sans-editorial text-[#1f1217] outline-none focus:border-[#db2777] rounded-xs"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="waitlist-phone" className="block text-[11px] font-mono-typewriter uppercase text-[#1f1217] mb-1 font-semibold">
                    Mobile Phone Number
                  </label>
                  <input
                    id="waitlist-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2.5 bg-[#fff8fa] border border-[#fbcfe8] text-xs font-sans-editorial text-[#1f1217] outline-none focus:border-[#db2777] rounded-xs"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#ec4899] text-white font-mono-typewriter text-xs uppercase tracking-wider hover:bg-[#db2777] transition-colors cursor-pointer font-bold rounded-xs shadow-md"
              >
                Get Notified First
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

