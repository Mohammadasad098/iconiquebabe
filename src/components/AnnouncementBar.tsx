import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';

const ANNOUNCEMENTS = [
  { text: 'ICONIQUE BABE IS HERE | SHOP THE PINK DROP 🎀', filter: 'LATEX' },
  { text: 'AISIRI NAVEA LINKTREE · ALL OFFICIAL LINKS 🔗', isLinktree: true },
  { text: 'FOLLOW @ICONIQUEBABE ON INSTAGRAM ✨', url: 'https://www.instagram.com/iconiquebabe' },
  { text: 'FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $150 🤍', filter: 'ALL' },
];

interface AnnouncementBarProps {
  onSelectCategory?: (category: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onSelectCategory }) => {
  const { setIsLinktreeOpen, storeSettings } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const announcements = [
    { text: storeSettings.announcementText || 'ICONIQUE BABE IS HERE | SHOP THE PINK DROP 🎀', filter: 'LATEX' },
    { text: 'AISIRI NAVEA LINKTREE · ALL OFFICIAL LINKS 🔗', isLinktree: true },
    { text: `FOLLOW ${storeSettings.instagramHandle || '@ICONIQUEBABE'} ON INSTAGRAM ✨`, url: 'https://www.instagram.com/iconiquebabe' },
    { text: `FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $${storeSettings.freeShippingThreshold || 150} 🤍`, filter: 'ALL' },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  const handleClick = () => {
    const item = announcements[currentIndex];
    if (item.isLinktree) {
      setIsLinktreeOpen(true);
    } else if (item.url) {
      window.open(item.url, '_blank');
    } else if (item.filter && onSelectCategory) {
      onSelectCategory(item.filter);
      const element = document.getElementById('featured-collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="w-full bg-[#fdf2f8] text-[#db2777] py-2.5 px-4 text-center border-b border-[#fbcfe8] text-[11px] sm:text-xs font-mono-typewriter uppercase tracking-wider select-none relative z-40 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        onClick={handleClick}
        className="inline-block transition-opacity duration-300 hover:opacity-75 focus:outline-none khy-link-hover cursor-pointer"
        aria-live="polite"
      >
        <span>{announcements[currentIndex].text}</span>
      </button>

      {/* Subtle indicator dots */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 opacity-60">
        {announcements.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 transition-all duration-300 rounded-full ${
              i === currentIndex ? 'bg-[#db2777] w-3' : 'bg-[#f472b6]/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
