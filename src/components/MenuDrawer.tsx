import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { KhyLogo } from './KhyLogo';
import { X, ChevronRight, ArrowLeft, Instagram, Heart, Truck } from 'lucide-react';
import { CURRENCIES } from '../data/products';

interface MenuDrawerProps {
  onSelectCategory: (category: string) => void;
}

const SUBMENUS: Record<string, { label: string; filter?: string }[]> = {
  'shop-all': [
    { label: 'Pink Latex Drop', filter: 'LATEX' },
    { label: 'Powder Furs & Leather', filter: 'COATS + JACKETS' },
    { label: 'Cloud White Denim', filter: 'DENIM' },
    { label: 'Dresses & Halters', filter: 'DRESSES' },
    { label: 'Italian Footwear', filter: 'SHOES' },
    { label: 'Tops & Layered Tees', filter: 'ALL' },
    { label: 'Shop All Pieces', filter: 'ALL' },
  ],
  collections: [
    { label: 'The Pink Latex Edit', filter: 'LATEX' },
    { label: 'Rose Gold & Chrome Shoes', filter: 'SHOES' },
    { label: 'Florentine Atelier Edition', filter: 'SHOES' },
    { label: 'Pure White & Studs', filter: 'DENIM' },
  ],
  collaborations: [
    { label: 'ICONIQUE × GIA BORGHINI', filter: 'SHOES' },
    { label: 'ICONIQUE BABE VIP COUTURE', filter: 'LATEX' },
  ],
  signatures: [
    { label: 'Signature Powder Fur', filter: 'COATS + JACKETS' },
    { label: 'Liquid Pink Latex Bodysuit', filter: 'LATEX' },
    { label: 'Rose Chrome Stiletto', filter: 'SHOES' },
  ]
};

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ onSelectCategory }) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    setIsSearchOpen,
    setIsCartOpen,
    cartCount,
    wishlist,
    selectedCurrency,
    setSelectedCurrency,
    showToast,
    setIsLinktreeOpen,
    setIsAdminOpen,
    openTrackingModal
  } = useShop();

  const [activeSubmenuKey, setActiveSubmenuKey] = useState<string | null>(null);

  if (!isMenuOpen) return null;

  const handleCategoryClick = (categoryFilter?: string) => {
    if (categoryFilter) {
      onSelectCategory(categoryFilter);
      const element = document.getElementById('featured-collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#241019]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsMenuOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-xl bg-[#fff8fa] shadow-2xl flex flex-col h-full transform transition-transform duration-500 ease-out border-r border-[#fbcfe8]">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#fbcfe8] bg-[#fdf2f8]">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-1.5 font-mono-typewriter text-xs uppercase text-[#1f1217] hover:text-[#db2777] cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>

            <a href="/" onClick={() => setIsMenuOpen(false)}>
              <KhyLogo variant="pink" size="sm" />
            </a>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="font-mono-typewriter text-xs uppercase text-[#1f1217] hover:text-[#db2777] cursor-pointer"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="font-mono-typewriter text-xs uppercase text-[#db2777] font-bold hover:text-[#be185d] cursor-pointer"
              >
                Bag ({cartCount})
              </button>
            </div>
          </div>

          {/* Menu Main Content / Submenus */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
            {activeSubmenuKey ? (
              /* Submenu View */
              <div className="flex flex-col gap-6">
                <button
                  type="button"
                  onClick={() => setActiveSubmenuKey(null)}
                  className="flex items-center gap-2 font-mono-typewriter text-xs uppercase text-[#db2777] hover:text-[#9d174d] cursor-pointer mb-2 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Main Menu</span>
                </button>

                <h3 className="font-mono-typewriter text-lg uppercase font-bold text-[#1f1217] tracking-tight pb-3 border-b border-[#fbcfe8]">
                  {activeSubmenuKey.replace('-', ' ')}
                </h3>

                <ul className="flex flex-col gap-4">
                  {SUBMENUS[activeSubmenuKey]?.map(item => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleCategoryClick(item.filter)}
                        className="font-mono-typewriter text-sm sm:text-base uppercase text-[#241019] hover:text-[#db2777] khy-link-hover py-1 text-left cursor-pointer"
                      >
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              /* Main Menu Navigation */
              <div className="flex flex-col gap-6">
                {/* Official IG shoutout badge in Menu */}
                <a
                  href="https://www.instagram.com/iconiquebabe"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-white border border-[#fbcfe8] rounded-xs shadow-2xs hover:border-[#db2777] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 p-[1.5px] flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-[#db2777]" />
                      </div>
                    </div>
                    <div>
                      <p className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] group-hover:text-[#db2777]">
                        @iconiquebabe
                      </p>
                      <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                        Follow on Instagram for daily looks
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#db2777]" />
                </a>

                <ul className="flex flex-col gap-4 text-base sm:text-lg font-mono-typewriter uppercase">
                  <li>
                    <button
                      onClick={() => handleCategoryClick('ALL')}
                      className="text-left text-[#1f1217] hover:text-[#db2777] khy-link-hover py-1 cursor-pointer font-medium"
                    >
                      <span>New Arrivals</span>
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveSubmenuKey('shop-all')}
                      className="w-full flex items-center justify-between text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer py-1"
                    >
                      <span className="khy-link-hover">Shop All</span>
                      <ChevronRight className="w-4 h-4 text-[#db2777]/50" />
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveSubmenuKey('collections')}
                      className="w-full flex items-center justify-between text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer py-1"
                    >
                      <span className="khy-link-hover">Pink Collections</span>
                      <ChevronRight className="w-4 h-4 text-[#db2777]/50" />
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveSubmenuKey('collaborations')}
                      className="w-full flex items-center justify-between text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer py-1"
                    >
                      <span className="khy-link-hover">Collaborations</span>
                      <ChevronRight className="w-4 h-4 text-[#db2777]/50" />
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveSubmenuKey('signatures')}
                      className="w-full flex items-center justify-between text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer py-1"
                    >
                      <span className="khy-link-hover">Iconique Signatures</span>
                      <ChevronRight className="w-4 h-4 text-[#db2777]/50" />
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => handleCategoryClick('LATEX')}
                      className="text-left text-[#db2777] font-bold hover:text-[#9d174d] khy-link-hover py-1 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Pink Latex Drop 🎀</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        openTrackingModal();
                      }}
                      className="text-left text-[#db2777] font-bold hover:text-[#9d174d] khy-link-hover py-1 cursor-pointer flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4 text-[#ec4899]" />
                      <span>Track Your Order 🚚</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLinktreeOpen(true);
                      }}
                      className="text-left text-[#1f1217] hover:text-[#db2777] khy-link-hover py-1 cursor-pointer flex items-center gap-2"
                    >
                      <span>Aisiri Navea Linktree 🔗</span>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsAdminOpen(true);
                      }}
                      className="text-left text-[#db2777] font-bold hover:text-[#be185d] khy-link-hover py-1 cursor-pointer flex items-center gap-2"
                    >
                      <span>Admin Management Portal ⚙️</span>
                    </button>
                  </li>
                </ul>

                {/* Featured Campaign Banners in Menu */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#fbcfe8]">
                  <div
                    onClick={() => handleCategoryClick('COATS + JACKETS')}
                    className="group cursor-pointer flex flex-col gap-2"
                  >
                    <span className="text-[11px] font-mono-typewriter uppercase text-[#db2777] font-semibold">01 / Powder Fur</span>
                    <div className="aspect-[3/4] bg-white overflow-hidden relative border border-[#fbcfe8] rounded-xs shadow-2xs">
                      <img
                        src="/src/assets/images/editorial_pink_fur_1792018528759.jpg"
                        alt="Signature Powder Pink Faux Fur"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] group-hover:text-[#db2777]">
                      Powder Pink Fur
                    </span>
                  </div>

                  <div
                    onClick={() => handleCategoryClick('SHOES')}
                    className="group cursor-pointer flex flex-col gap-2"
                  >
                    <span className="text-[11px] font-mono-typewriter uppercase text-[#db2777] font-semibold">02 / Footwear</span>
                    <div className="aspect-[3/4] bg-white overflow-hidden relative border border-[#fbcfe8] rounded-xs shadow-2xs">
                      <img
                        src="/src/assets/images/campaign_pink_heels_1792018526786.jpg"
                        alt="Rose Chrome Sandals"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] group-hover:text-[#db2777]">
                      Rose Chrome Heels
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Footer: Account & Currency */}
            <div className="pt-6 border-t border-[#fbcfe8] mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => showToast('Customer VIP account active.')}
                  className="font-mono-typewriter text-xs uppercase text-[#db2777] underline cursor-pointer font-semibold"
                >
                  VIP Account
                </button>
                {wishlist.length > 0 && (
                  <span className="flex items-center gap-1 font-mono-typewriter text-xs uppercase text-[#db2777]">
                    <Heart className="w-3.5 h-3.5 fill-[#ec4899] text-[#ec4899]" />
                    <span>Wishlist ({wishlist.length})</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-typewriter uppercase text-[#1f1217]">
                <span className="text-[#4a1829]/70">Currency:</span>
                <select
                  value={selectedCurrency.code}
                  onChange={(e) => {
                    const found = CURRENCIES.find(c => c.code === e.target.value);
                    if (found) setSelectedCurrency(found);
                  }}
                  className="bg-white border border-[#fbcfe8] px-2 py-1 outline-none cursor-pointer rounded-xs text-[#db2777] font-semibold"
                >
                  {CURRENCIES.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

