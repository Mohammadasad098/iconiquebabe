import React from 'react';

interface CampaignBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  desktopImage: string;
  mobileImage: string;
  onCtaClick: () => void;
  variant?: 'shoes' | 'icons';
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  title,
  subtitle,
  ctaText,
  desktopImage,
  mobileImage,
  onCtaClick,
  variant = 'shoes'
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fff0f5] min-h-[65vh] md:min-h-[80vh] flex items-center justify-center my-8 md:my-14 border-y border-[#fbcfe8]">
      {/* Background Photography */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(max-width: 767px)" srcSet={mobileImage} />
        <img
          src={desktopImage}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
          loading="lazy"
        />
      </picture>

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25 pointer-events-none" />

      {/* Typography Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24 flex flex-col justify-end min-h-[65vh] md:min-h-[80vh]">
        <div className="max-w-xl text-white pb-4">
          <p className="font-mono-typewriter text-xs uppercase tracking-widest text-[#fce7f3] mb-2 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f472b6] inline-block" />
            {variant === 'shoes' ? 'ICONIQUE × GIA BORGHINI · FLORENCE ATELIER' : 'ICONIQUE BABE · SIGNATURE WARDROBE'}
          </p>

          <h2 className="font-mono-typewriter text-3xl sm:text-5xl uppercase font-bold tracking-tight text-white leading-tight drop-shadow-md">
            {title}
          </h2>

          <p className="font-sans-editorial text-sm sm:text-base text-[#fdf2f8] mt-3 max-w-md font-normal leading-relaxed drop-shadow-xs">
            {subtitle}
          </p>

          <div className="mt-6">
            <button
              onClick={onCtaClick}
              className="font-mono-typewriter text-xs sm:text-sm uppercase tracking-wider text-[#1f1217] bg-white hover:bg-[#fbcfe8] px-6 py-3.5 shadow-lg transition-all duration-300 font-bold cursor-pointer"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
