import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Search } from 'lucide-react';
import { ProductCard } from './ProductCard';

const SUGGESTIONS = ['pink latex', 'powder fur', 'rose chrome', 'white denim', 'blush leather', 'silk dress', 'bomber'];

export const SearchDrawer: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useShop();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 4); // Trending products when empty
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.variants.some(v => v.colorName.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Search">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#241019]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="fixed inset-x-0 top-0 max-h-[88vh] bg-white shadow-2xl flex flex-col z-50 overflow-hidden transform transition-transform duration-500 ease-out border-b border-[#fbcfe8]">
        {/* Header with Search Form */}
        <div className="max-w-7xl mx-auto w-full px-6 py-6 sm:px-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-typewriter text-xs uppercase tracking-widest text-[#db2777] font-semibold">
              Live Search // @iconiquebabe
            </span>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setQuery('');
              }}
              className="p-1 text-[#1f1217] hover:text-[#db2777] transition-colors cursor-pointer flex items-center gap-1 font-mono-typewriter text-xs uppercase"
              aria-label="Close search"
            >
              <span>Close</span>
              <X className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full max-w-2xl mx-auto my-2">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#db2777]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search @iconiquebabe collection..."
              autoFocus
              className="w-full pl-11 pr-10 py-3 bg-[#fff8fa] border border-[#fbcfe8] text-sm font-sans-editorial text-[#1f1217] outline-none focus:border-[#db2777] transition-colors placeholder:text-[#4a1829]/40 rounded-xs"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#db2777] hover:text-[#9d174d] p-1"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Body: Suggestions + Results Grid */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pb-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Suggested Terms */}
            <div className="md:col-span-3 flex flex-col gap-3 pt-2">
              <span className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider">
                Trending Searches
              </span>
              <ul className="flex flex-wrap md:flex-col gap-2">
                {SUGGESTIONS.map(term => (
                  <li key={term}>
                    <button
                      onClick={() => setQuery(term)}
                      className={`text-left font-mono-typewriter text-xs uppercase py-1 px-2.5 rounded-full border cursor-pointer transition-all ${
                        query.toLowerCase() === term
                          ? 'border-[#db2777] bg-[#ec4899] text-white font-bold'
                          : 'border-[#fbcfe8] bg-white text-[#db2777] hover:bg-[#fdf2f8]'
                      }`}
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Result Grid */}
            <div className="md:col-span-9 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider">
                  {query ? `Results for "${query}" (${searchResults.length})` : 'Top Trending Pieces'}
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-mono-typewriter text-sm uppercase text-[#1f1217] font-bold">No products matched your search</p>
                  <p className="font-sans-editorial text-xs text-[#4a1829]/70 mt-1">Try a different keyword or explore our pink arrivals.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {searchResults.map(p => (
                    <div key={p.id} onClick={() => setIsSearchOpen(false)}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

