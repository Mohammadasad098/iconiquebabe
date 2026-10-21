import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Instagram,
  Youtube,
  Mail,
  ExternalLink,
  Copy,
  Check,
  ShoppingBag,
  Heart,
  Share2,
  Sparkles
} from 'lucide-react';

export const LinktreeModal: React.FC = () => {
  const { isLinktreeOpen, setIsLinktreeOpen, showToast, setIsWaitlistOpen } = useShop();
  const [copied, setCopied] = useState(false);

  if (!isLinktreeOpen) return null;

  const LINKTREE_URL = 'https://linktr.ee/aisirinavea';

  const LINKS = [
    {
      title: 'Shop Official Collection 🎀',
      subtitle: 'Liquid Pink Latex, Powder Furs & White Denim',
      url: '#featured-collections',
      internal: true,
      icon: ShoppingBag,
      featured: true
    },
    {
      title: 'Instagram: @iconiquebabe 📸',
      subtitle: 'Daily outfits, high-glam editorial looks & stories',
      url: 'https://www.instagram.com/iconiquebabe',
      icon: Instagram,
      badge: '2.4M FOLLOWERS'
    },
    {
      title: 'YouTube: @aisirinavea 🎬',
      subtitle: 'New fashion vlogs & behind-the-scenes drops every week',
      url: 'https://www.youtube.com/@aisirinavea',
      icon: Youtube,
      badge: 'NEW VIDEO'
    },
    {
      title: 'Join VIP Club for Secret Drops 💖',
      subtitle: 'Early access codes & restock notifications',
      action: () => {
        setIsLinktreeOpen(false);
        setIsWaitlistOpen(true);
      },
      icon: Heart,
      badge: 'PRIORITY'
    },
    {
      title: 'Florence Footwear Collaboration 👠',
      subtitle: 'Handcrafted Italian Rose Chrome Stilettos & Sandals',
      url: '#featured-collections',
      internal: true,
      icon: Sparkles
    },
    {
      title: 'Official Linktree Profile 🌐',
      subtitle: 'linktr.ee/aisirinavea',
      url: LINKTREE_URL,
      icon: ExternalLink
    },
    {
      title: 'Press, Collabs & Inquiries 💌',
      subtitle: 'babe@iconiquebabe.com · aisirinavea@gmail.com',
      url: 'mailto:babe@iconiquebabe.com',
      icon: Mail
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(LINKTREE_URL);
    setCopied(true);
    showToast('Linktree URL copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aisiri Navea (@iconiquebabe) Linktree',
          text: 'Official Linktree of Aisiri Navea (@iconiquebabe) - ICONIQUE BABE Fashion House',
          url: LINKTREE_URL
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleLinkClick = (link: typeof LINKS[0]) => {
    if (link.action) {
      link.action();
      return;
    }
    if (link.internal) {
      setIsLinktreeOpen(false);
      const element = document.getElementById('featured-collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.url) {
      window.open(link.url, '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Aisiri Navea Linktree Hub"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#241019]/65 backdrop-blur-sm transition-opacity"
        onClick={() => setIsLinktreeOpen(false)}
      />

      {/* Linktree Card in Pink & White */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#fff8fa] via-white to-[#fff0f5] border border-[#fbcfe8] rounded-3xl shadow-2xl p-6 sm:p-7 flex flex-col items-center max-h-[92vh] overflow-y-auto my-auto">
        {/* Top Actions: Share & Close */}
        <div className="w-full flex items-center justify-between mb-4">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fdf2f8] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title="Share Linktree"
            aria-label="Share Linktree"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-mono-typewriter uppercase tracking-widest text-[#db2777] font-bold">
            linktr.ee/aisirinavea
          </span>

          <button
            onClick={() => setIsLinktreeOpen(false)}
            className="w-9 h-9 rounded-full bg-white border border-[#fbcfe8] text-[#1f1217] hover:text-[#db2777] hover:bg-[#fdf2f8] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar with Pink Story Ring */}
        <div className="relative mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
              <img
                src="/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg"
                alt="Aisiri Navea"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
          </div>
          <span className="absolute bottom-1 right-1 w-6 h-6 bg-[#ec4899] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-xs">
            ✨
          </span>
        </div>

        {/* Profile Info */}
        <h3 className="font-mono-typewriter text-xl font-bold uppercase tracking-tight text-[#1f1217] flex items-center gap-1.5">
          <span>Aisiri Navea</span>
          <span className="inline-flex items-center justify-center w-4 h-4 bg-[#0284c7] text-white rounded-full text-[9px]" title="Verified">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>
        </h3>
        <p className="font-mono-typewriter text-xs font-semibold text-[#db2777] mt-0.5">
          @iconiquebabe · @aisirinavea
        </p>
        <p className="font-sans-editorial text-xs text-[#4a1829]/80 text-center max-w-xs mt-2 leading-relaxed">
          Creative Director · ICONIQUE BABE Fashion House 🎀<br />
          Sculpted liquid pink latex silhouettes &amp; Italian luxury footwear.
        </p>

        {/* Social Icons Strip */}
        <div className="flex items-center gap-3 my-4">
          <a
            href="https://www.instagram.com/iconiquebabe"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-105"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/@aisirinavea"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-105"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="mailto:babe@iconiquebabe.com"
            className="w-10 h-10 rounded-full bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-105"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#ec4899] hover:text-white flex items-center justify-center transition-all shadow-2xs hover:scale-105"
            aria-label="Linktree"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Links List */}
        <div className="w-full space-y-3 mt-1">
          {LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleLinkClick(link)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group shadow-2xs ${
                  link.featured
                    ? 'bg-[#ec4899] border-[#db2777] text-white hover:bg-[#db2777] hover:scale-[1.01]'
                    : 'bg-white border-[#fbcfe8] hover:border-[#db2777] hover:bg-[#fdf2f8] text-[#1f1217]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      link.featured ? 'bg-white/20 text-white' : 'bg-[#fdf2f8] text-[#db2777]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-mono-typewriter text-xs uppercase font-bold truncate ${
                          link.featured ? 'text-white' : 'text-[#1f1217]'
                        }`}
                      >
                        {link.title}
                      </p>
                      {link.badge && (
                        <span className="text-[9px] font-mono-typewriter uppercase px-1.5 py-0.2 bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8] rounded-full shrink-0 font-bold">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-sans-editorial text-[11px] truncate mt-0.5 ${
                        link.featured ? 'text-pink-100' : 'text-[#4a1829]/65'
                      }`}
                    >
                      {link.subtitle}
                    </p>
                  </div>
                </div>

                <ExternalLink
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    link.featured ? 'text-white/80' : 'text-[#db2777]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer: Copy Link Button */}
        <div className="w-full pt-5 mt-4 border-t border-[#fbcfe8] flex items-center justify-between text-xs font-mono-typewriter">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-[#db2777] hover:text-[#9d174d] font-bold cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link!' : 'Copy Linktree Link'}</span>
          </button>

          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[#4a1829]/65 hover:underline"
          >
            linktr.ee/aisirinavea
          </a>
        </div>
      </div>
    </div>
  );
};
