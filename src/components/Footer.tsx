import React, { useState } from 'react';
import { KhyLogo } from './KhyLogo';
import { CURRENCIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Instagram, ChevronDown, Check, Heart, Youtube, ExternalLink, ShieldCheck, Truck } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const {
    selectedCurrency,
    setSelectedCurrency,
    showToast,
    addSubscriber,
    setIsLinktreeOpen,
    setIsAdminOpen,
    openTrackingModal
  } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    addSubscriber(email, undefined, 'VIP Club');
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#fdf2f8] border-t border-[#fbcfe8] text-[#241019] pt-16 pb-12 px-6 sm:px-10 lg:px-12 select-none" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top: Large Centered Brand Mark */}
        <div className="w-full flex items-center justify-center py-6 border-b border-[#fbcfe8]">
          <a href="/" className="hover:opacity-90 transition-opacity" aria-label="ICONIQUE BABE Home">
            <KhyLogo variant="pink" size="giant" />
          </a>
        </div>

        {/* Newsletter & Social Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-between pb-8 border-b border-[#fbcfe8]">
          {/* Newsletter subscription */}
          <div className="max-w-md">
            <span className="text-[10px] font-mono-typewriter uppercase tracking-widest text-[#db2777] font-bold">
              VIP Club
            </span>
            <h3 className="font-mono-typewriter text-sm sm:text-base uppercase font-bold tracking-wider text-[#1f1217] mt-1 mb-2">
              Be An Iconique Babe
            </h3>
            <p className="font-sans-editorial text-xs text-[#4a1829]/75 mb-4 leading-relaxed">
              Sign up for private releases, early restock alerts, and VIP pink drops direct from @iconiquebabe.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#db2777] text-white text-xs font-mono-typewriter uppercase flex items-center gap-2 rounded-xs">
                <Check className="w-4 h-4 text-white" />
                <span>You&apos;re on the Iconique Babe VIP list! 🎀</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center border border-[#fbcfe8] bg-white rounded-xs focus-within:border-[#db2777] transition-colors shadow-2xs">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 text-xs font-sans-editorial text-[#1f1217] bg-transparent outline-none placeholder:text-[#4a1829]/40"
                />
                <button
                  type="submit"
                  className="font-mono-typewriter text-xs uppercase px-5 py-2.5 bg-[#ec4899] text-white hover:bg-[#db2777] transition-colors tracking-wider cursor-pointer shrink-0 font-bold"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          {/* Social Links & Official Handle */}
          <div className="flex flex-col md:items-end gap-3">
            <span className="font-mono-typewriter text-xs uppercase tracking-wider text-[#1f1217] font-bold">
              Follow @iconiquebabe
            </span>
            <div className="flex items-center flex-wrap gap-2.5">
              <a
                href="https://www.instagram.com/iconiquebabe"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white transition-all rounded-full shadow-2xs font-mono-typewriter text-xs font-bold"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@iconiquebabe</span>
              </a>

              <a
                href="https://www.youtube.com/@aisirinavea"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white transition-all rounded-full shadow-2xs font-mono-typewriter text-xs font-bold"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>

              <button
                type="button"
                onClick={() => setIsLinktreeOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white transition-all rounded-full shadow-2xs font-mono-typewriter text-xs font-bold cursor-pointer"
                title="Aisiri Navea Linktree Hub"
              >
                <span>Linktree</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
              Aisiri Navea · linktr.ee/aisirinavea · #IconicBabe
            </p>
          </div>
        </div>

        {/* Navigation Menus Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono-typewriter uppercase">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-[#db2777] font-bold">Collections</span>
            <button
              onClick={() => onSelectCategory && onSelectCategory('ALL')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>New Arrivals</span>
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('LATEX')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Pink Latex Drop</span>
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('COATS + JACKETS')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Powder Furs &amp; Jackets</span>
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('DENIM')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>White &amp; Studded Denim</span>
            </button>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-[#db2777] font-bold">Shop by Category</span>
            <button
              onClick={() => onSelectCategory && onSelectCategory('DRESSES')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Dresses &amp; Gowns</span>
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('SHOES')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Italian Footwear</span>
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory('ALL')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Shop All Items</span>
            </button>
            <button
              onClick={() => showToast('Digital gift cards redeemable on all drops.')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Gift Cards</span>
            </button>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-[#db2777] font-bold">Customer Care</span>
            <button
              onClick={() => openTrackingModal()}
              className="text-left text-[#db2777] font-bold hover:text-[#9d174d] khy-link-hover w-fit cursor-pointer flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Your Order 🚚</span>
            </button>
            <button
              onClick={() => showToast('ICONIQUE BABE is curated by @iconiquebabe.')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>About @iconiquebabe</span>
            </button>
            <button
              onClick={() => openTrackingModal()}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Shipping &amp; Delivery</span>
            </button>
            <button
              onClick={() => showToast('Hassle-free 14 day returns on unworn items.')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Returns Policy</span>
            </button>
            <button
              onClick={() => showToast('Concierge contact: babe@iconiquebabe.com · aisirinavea@gmail.com')}
              className="text-left text-[#241019] hover:text-[#db2777] khy-link-hover w-fit cursor-pointer"
            >
              <span>Contact Team</span>
            </button>
            <button
              onClick={() => setIsLinktreeOpen(true)}
              className="text-left text-[#db2777] font-bold hover:text-[#9d174d] khy-link-hover w-fit cursor-pointer flex items-center gap-1"
            >
              <span>Linktree Bio 🔗</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-left text-[#db2777] font-bold hover:text-[#9d174d] khy-link-hover w-fit cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal (Orders &amp; Stock)</span>
            </button>
          </div>

          {/* Column 4: Country / Currency selector */}
          <div className="flex flex-col gap-3 relative">
            <span className="text-[11px] text-[#db2777] font-bold">Currency</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 border border-[#fbcfe8] bg-white text-xs font-mono-typewriter uppercase text-[#1f1217] cursor-pointer hover:border-[#db2777] rounded-xs shadow-2xs"
                aria-expanded={isCurrencyDropdownOpen}
              >
                <span>{selectedCurrency.flag} {selectedCurrency.country} ({selectedCurrency.code} {selectedCurrency.symbol})</span>
                <ChevronDown className="w-3.5 h-3.5 ml-2 text-[#db2777]" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-[#fbcfe8] shadow-lg max-h-56 overflow-y-auto z-50 rounded-xs">
                  {CURRENCIES.map(curr => (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                        showToast(`Currency updated to ${curr.code} (${curr.symbol})`);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-mono-typewriter uppercase flex items-center justify-between hover:bg-[#fdf2f8] cursor-pointer ${
                        selectedCurrency.code === curr.code ? 'font-bold bg-[#fdf2f8] text-[#db2777]' : ''
                      }`}
                    >
                      <span>{curr.flag} {curr.country}</span>
                      <span className="text-[#db2777]">{curr.code} {curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[10px] text-[#4a1829]/60 font-sans-editorial lowercase">
              prices display in your selected currency with real-time conversion.
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#fbcfe8] text-[11px] font-mono-typewriter uppercase text-[#4a1829]/70">
          <div className="flex items-center gap-6">
            <button onClick={() => showToast('Accessibility statement: WCAG AA compliant.')} className="hover:underline hover:text-[#db2777]">
              Accessibility
            </button>
            <button onClick={() => showToast('Privacy Policy: Customer data is confidential.')} className="hover:underline hover:text-[#db2777]">
              Privacy Policy
            </button>
            <button onClick={() => showToast('Terms of Service.')} className="hover:underline hover:text-[#db2777]">
              Terms &amp; Conditions
            </button>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-[#1f1217]">
            <span>&copy; 2026 ICONIQUE BABE, Inc. All rights reserved.</span>
            <Heart className="w-3.5 h-3.5 text-[#ec4899] fill-[#ec4899]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
