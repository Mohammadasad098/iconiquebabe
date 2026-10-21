import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface HeroBannerProps {
  onShopLatex: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopLatex }) => {
  const { setQuickShopProduct, setIsLinktreeOpen } = useShop();
  const heroProduct = PRODUCTS[0]; // Iconique Pink Latex Bodysuit

  return (
    <section className="relative w-full overflow-hidden bg-[#fff0f5] min-h-[72vh] md:min-h-[88vh] flex items-center justify-center">
      {/* Background Image: High-Fashion Pink Latex Campaign */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg"
          alt="ICONIQUE BABE Pink Latex Collection"
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
          loading="eager"
        />
      </div>

      {/* Atmospheric Soft Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24 flex flex-col justify-between min-h-[72vh] md:min-h-[88vh]">
        <div className="hidden md:block" />

        <div className="max-w-2xl text-white mt-auto md:my-auto">
          <p className="font-mono-typewriter text-xs uppercase tracking-widest text-[#fce7f3] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f472b6] inline-block" />
            <span>@iconiquebabe Collection · Aisiri Navea</span>
          </p>

          <h1 className="font-mono-typewriter text-4xl sm:text-6xl md:text-7xl uppercase font-bold leading-[1.02] tracking-tight text-white drop-shadow-md">
            PINK IS THE<br />NEW ICONIC
          </h1>

          <p className="font-sans-editorial text-sm sm:text-base text-[#fdf2f8] max-w-md mt-4 font-normal leading-relaxed drop-shadow-xs">
            sculpted silhouettes returned in ultra-high-gloss baby pink liquid latex. curated &amp; directed by @iconiquebabe.
          </p>

          <div className="mt-8 flex items-center flex-wrap gap-4 sm:gap-6">
            <button
              onClick={onShopLatex}
              className="font-mono-typewriter text-xs sm:text-sm uppercase tracking-wider text-[#1f1217] bg-[#ffffff] hover:bg-[#fbcfe8] px-6 py-3.5 shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              SHOP THE PINK DROP
            </button>
            <button
              onClick={() => setIsLinktreeOpen(true)}
              className="font-mono-typewriter text-xs uppercase tracking-wider px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white border border-white/40 rounded-xs cursor-pointer transition-all"
            >
              Linktree Hub 🔗
            </button>
            <a
              href="https://www.instagram.com/iconiquebabe"
              target="_blank"
              rel="noreferrer"
              className="font-mono-typewriter text-xs uppercase tracking-wider text-white hover:text-[#fbcfe8] underline underline-offset-4"
            >
              @iconiquebabe IG
            </a>
          </div>
        </div>

        {/* Bottom Bar / Floating Preview Card */}
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mt-8 pt-4 border-t border-white/20">
          <div className="text-[11px] font-mono-typewriter uppercase text-white/80">
            ICONIQUE BABE // 2026 EDITION
          </div>

          {/* Interactive Floating Product Tag */}
          {heroProduct && (
            <button
              onClick={() => setQuickShopProduct(heroProduct)}
              className="bg-white/95 backdrop-blur-md border border-[#fbcfe8] text-[#1f1217] p-2.5 pr-4 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white hover:shadow-xl cursor-pointer max-w-xs group rounded-xs"
              aria-label={`Quick view ${heroProduct.title}`}
            >
              <div className="w-12 h-16 bg-[#fdf2f8] overflow-hidden shrink-0 border border-[#fbcfe8]">
                <img
                  src={heroProduct.defaultImage}
                  alt={heroProduct.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <p className="text-[10px] font-mono-typewriter uppercase text-[#db2777]">Signature Piece</p>
                <h4 className="font-mono-typewriter text-xs uppercase font-bold line-clamp-1 text-[#1f1217]">{heroProduct.title}</h4>
                <p className="font-sans-editorial text-xs font-semibold text-[#db2777] mt-0.5">${heroProduct.price}</p>
                <span className="text-[10px] font-mono-typewriter uppercase underline text-[#db2777] mt-1 inline-block">Quick Shop</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
