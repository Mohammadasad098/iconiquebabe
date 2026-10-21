import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

interface FeaturedCollectionsProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

const TABS = ['ALL', 'LATEX', 'COATS + JACKETS', 'DRESSES', 'DENIM', 'SHOES'] as const;

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { products } = useShop();

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="featured-collections" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#fbcfe8]">
        <div>
          <span className="text-xs font-mono-typewriter uppercase tracking-widest text-[#db2777]">
            Iconique Babe Drops
          </span>
          <h2 className="font-mono-typewriter text-2xl sm:text-3xl uppercase font-bold text-[#1f1217] tracking-tight mt-1">
            NEW ARRIVALS
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
          {TABS.map(tab => {
            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(tab)}
                className={`font-mono-typewriter text-xs sm:text-[13px] uppercase tracking-wider shrink-0 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ec4899] text-white font-bold shadow-xs'
                    : 'bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fdf2f8]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 pt-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 md:mt-16 text-center">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono-typewriter text-xs uppercase tracking-widest text-[#db2777] hover:text-[#9d174d] py-1 border-b-2 border-[#db2777] cursor-pointer font-bold"
        >
          <span>Shop all @iconiquebabe arrivals</span>
        </button>
      </div>
    </section>
  );
};
