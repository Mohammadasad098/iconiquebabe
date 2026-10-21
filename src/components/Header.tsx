import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { KhyLogo } from './KhyLogo';
import { Heart, Instagram, Truck } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsMenuOpen,
    setIsSearchOpen,
    setIsLinktreeOpen,
    setIsAdminOpen,
    openTrackingModal,
    wishlist,
    showToast
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#fbcfe8] text-[#1f1217] shadow-xs'
          : 'bg-[#fff8fa] text-[#1f1217] border-b border-[#fce7f3]'
      }`}
      role="banner"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        {/* Left Section: Menu, Instagram & Linktree */}
        <div className="w-1/3 flex items-center justify-start gap-3 sm:gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="font-mono-typewriter uppercase text-xs sm:text-sm tracking-wider khy-link-hover py-1 cursor-pointer hover:text-[#db2777]"
            aria-label="Open navigation menu"
          >
            <span>Menu</span>
          </button>

          <a
            href="https://www.instagram.com/iconiquebabe"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono-typewriter uppercase text-[#db2777] hover:text-[#be185d] transition-colors"
            title="Follow @iconiquebabe"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="hidden md:inline">@iconiquebabe</span>
          </a>

          {/* Linktree Button */}
          <button
            type="button"
            onClick={() => setIsLinktreeOpen(true)}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 bg-[#fdf2f8] hover:bg-[#fbcfe8] text-[#db2777] border border-[#fbcfe8] rounded-full text-[10px] sm:text-xs font-mono-typewriter uppercase font-bold transition-all cursor-pointer shadow-2xs"
            title="Aisiri Navea Official Linktree"
          >
            <span>Linktree</span>
          </button>
        </div>

        {/* Middle Section: Centered ICONIQUE BABE Logo */}
        <div className="w-1/3 flex items-center justify-center">
          <a
            href="/"
            className="flex items-center justify-center focus:outline-none transition-opacity hover:opacity-85"
            aria-label="ICONIQUE BABE Home"
          >
            <KhyLogo variant="pink" size="md" />
          </a>
        </div>

        {/* Right Section: Admin, Search, Wishlist, Bag */}
        <div className="w-1/3 flex items-center justify-end gap-2 sm:gap-4 lg:gap-6">
          {/* Track Order Button */}
          <button
            type="button"
            onClick={() => openTrackingModal()}
            className="inline-flex items-center gap-1.5 font-mono-typewriter uppercase text-[10px] sm:text-xs tracking-wider py-1 px-2 bg-[#fdf2f8] hover:bg-[#ec4899] hover:text-white border border-[#fbcfe8] text-[#db2777] rounded-xs cursor-pointer font-bold shadow-2xs transition-all"
            title="Track Your Order & Shipment Status"
          >
            <Truck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Track</span>
          </button>

          {/* Admin Panel Button */}
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="inline-flex items-center gap-1 font-mono-typewriter uppercase text-[10px] sm:text-xs tracking-wider py-1 px-2 bg-white hover:bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] rounded-xs cursor-pointer font-bold shadow-2xs"
            title="Store Admin Panel (Orders, Subscribers, Inventory CRUD)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:inline-block font-mono-typewriter uppercase text-xs sm:text-sm tracking-wider khy-link-hover py-1 cursor-pointer hover:text-[#db2777]"
            aria-label="Open search drawer"
          >
            <span>Search</span>
          </button>

          {/* Wishlist Link */}
          <button
            type="button"
            onClick={() => {
              if (wishlist.length === 0) {
                showToast('Your wishlist is empty. Tap ♡ on any item to save it.');
              } else {
                showToast(`Wishlist contains ${wishlist.length} saved item${wishlist.length > 1 ? 's' : ''}`);
              }
            }}
            className="hidden md:inline-flex items-center gap-1 font-mono-typewriter uppercase text-xs tracking-wider khy-link-hover py-1 cursor-pointer hover:text-[#db2777]"
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlist.length > 0 ? 'fill-[#ec4899] text-[#ec4899]' : 'text-[#1f1217]'}`} />
            {wishlist.length > 0 && <span className="text-[10px] text-[#db2777]">({wishlist.length})</span>}
          </button>

          {/* Bag with counter */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="font-mono-typewriter uppercase text-xs sm:text-sm tracking-wider flex items-center gap-1.5 py-1 px-2.5 sm:px-3 bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white transition-all duration-200 cursor-pointer rounded-xs"
            aria-label={`Shopping Bag with ${cartCount} items`}
          >
            <span>Bag</span>
            <span className="font-mono-typewriter text-xs font-bold">
              ({cartCount})
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
