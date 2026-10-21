import React from 'react';

interface KhyLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'pink';
  size?: 'sm' | 'md' | 'lg' | 'giant';
}

export const KhyLogo: React.FC<KhyLogoProps> = ({
  className = '',
  variant = 'pink',
  size = 'md'
}) => {
  const textColor = {
    dark: 'text-[#1f1217]',
    light: 'text-white',
    pink: 'text-[#ec4899]',
  }[variant];

  const subColor = {
    dark: 'text-[#db2777]',
    light: 'text-[#fce7f3]',
    pink: 'text-[#1f1217]',
  }[variant];

  if (size === 'giant') {
    return (
      <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
        <span className={`font-mono-typewriter text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] ${textColor}`}>
          ICONIQUE
        </span>
        <span className={`font-mono-typewriter text-sm sm:text-base md:text-lg uppercase tracking-[0.45em] sm:tracking-[0.6em] ${subColor} mt-1 font-medium`}>
          B A B E
        </span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-center select-none text-center ${className}`}>
        <span className={`font-mono-typewriter text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] ${textColor}`}>
          ICONIQUE
        </span>
        <span className={`font-mono-typewriter text-[10px] sm:text-xs uppercase tracking-[0.4em] ${subColor}`}>
          B A B E
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-baseline gap-1.5 select-none ${className}`}>
      <span className={`font-mono-typewriter text-sm sm:text-base font-bold uppercase tracking-[0.16em] ${textColor}`}>
        ICONIQUE
      </span>
      <span className={`font-mono-typewriter text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium ${subColor}`}>
        BABE
      </span>
    </div>
  );
};
