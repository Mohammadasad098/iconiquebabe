import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ChevronDown, ChevronUp, Ruler, Heart } from 'lucide-react';

export const QuickShopModal: React.FC = () => {
  const {
    quickShopProduct,
    setQuickShopProduct,
    addToCart,
    formatPrice,
    setIsSizeGuideOpen,
    isWishlisted,
    toggleWishlist
  } = useShop();

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fit');

  useEffect(() => {
    if (quickShopProduct) {
      setActiveVariantIndex(0);
      setActiveImageIndex(0);
      setSelectedSize(quickShopProduct.availableSizes[0] || '');
    }
  }, [quickShopProduct]);

  if (!quickShopProduct) return null;

  const currentVariant = quickShopProduct.variants[activeVariantIndex] || quickShopProduct.variants[0];
  const galleryImages = currentVariant?.images && currentVariant.images.length > 0
    ? currentVariant.images
    : [quickShopProduct.defaultImage, quickShopProduct.secondaryImage].filter(Boolean);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(quickShopProduct, currentVariant?.color, selectedSize);
      setIsAdding(false);
      setQuickShopProduct(null);
    }, 400);
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(prev => (prev === name ? null : name));
  };

  const wishlisted = isWishlisted(quickShopProduct.handle);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Quick Shop Product">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#241019]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setQuickShopProduct(null)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-xl bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-500 ease-out border-l border-[#fbcfe8]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#fbcfe8] bg-[#fdf2f8]">
            <div className="flex items-center gap-2">
              <span className="font-mono-typewriter text-xs uppercase tracking-wider text-[#db2777] font-bold">
                Quick Shop
              </span>
              <span className="text-[11px] font-mono-typewriter uppercase text-[#4a1829]/60">
                // @iconiquebabe
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleWishlist(quickShopProduct.handle)}
                className="p-1 text-[#db2777] hover:text-[#ec4899] cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#ec4899] text-[#ec4899]' : ''}`} />
              </button>
              <button
                onClick={() => setQuickShopProduct(null)}
                className="p-1.5 text-[#1f1217] hover:text-[#db2777] transition-colors cursor-pointer"
                aria-label="Close product view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Gallery Section */}
            <div className="space-y-3">
              <div className="aspect-[3/4] bg-[#fdf2f8] overflow-hidden border border-[#fbcfe8] relative rounded-xs">
                <img
                  src={galleryImages[activeImageIndex] || quickShopProduct.defaultImage}
                  alt={quickShopProduct.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-16 shrink-0 bg-[#fdf2f8] border overflow-hidden cursor-pointer transition-all rounded-xs ${
                        idx === activeImageIndex ? 'border-[#db2777] ring-1 ring-[#db2777]' : 'border-[#fbcfe8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta: Title & Price */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono-typewriter text-base sm:text-lg uppercase font-bold text-[#1f1217] tracking-tight">
                  {quickShopProduct.title}
                </h3>
                <span className="font-sans-editorial text-base sm:text-lg font-bold text-[#db2777]">
                  {formatPrice(quickShopProduct.price)}
                </span>
              </div>
              <p className="font-sans-editorial text-xs text-[#4a1829]/80 leading-relaxed pt-1">
                {quickShopProduct.description}
              </p>
            </div>

            {/* Color Swatch Options */}
            {quickShopProduct.variants.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#fbcfe8]">
                <div className="flex items-center justify-between font-mono-typewriter text-xs uppercase">
                  <span className="text-[#4a1829]/70">Color:</span>
                  <span className="font-bold text-[#db2777]">
                    {currentVariant?.colorName || 'Standard'}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {quickShopProduct.variants.map((v, idx) => {
                    const isSelected = idx === activeVariantIndex;
                    return (
                      <button
                        key={v.color}
                        type="button"
                        onClick={() => {
                          setActiveVariantIndex(idx);
                          setActiveImageIndex(0);
                        }}
                        className={`w-7 h-7 rounded-full p-0.5 border transition-all cursor-pointer ${
                          isSelected ? 'border-[#db2777] scale-105 ring-2 ring-[#db2777]' : 'border-transparent hover:border-[#f472b6]'
                        }`}
                        title={v.colorName}
                        aria-label={`Select ${v.colorName}`}
                      >
                        {v.swatchUrl ? (
                          <img
                            src={v.swatchUrl}
                            alt={v.colorName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span
                            className="block w-full h-full rounded-full border border-black/10"
                            style={{ backgroundColor: v.colorHex || '#f472b6' }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Options & Size Guide trigger */}
            <div className="space-y-2 pt-2 border-t border-[#fbcfe8]">
              <div className="flex items-center justify-between font-mono-typewriter text-xs uppercase">
                <span className="text-[#4a1829]/70">Select Size:</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#db2777] hover:underline cursor-pointer lowercase font-medium"
                >
                  <Ruler className="w-3 h-3" />
                  <span>size guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {quickShopProduct.availableSizes.map(s => {
                  const isSelected = s === selectedSize;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`h-9 font-mono-typewriter text-xs uppercase border transition-all cursor-pointer rounded-xs ${
                        isSelected
                          ? 'border-[#db2777] bg-[#ec4899] text-white font-bold shadow-xs'
                          : 'border-[#fbcfe8] bg-white text-[#1f1217] hover:border-[#db2777]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#fbcfe8] divide-y divide-[#fbcfe8] text-xs">
              {/* Accordion 1: The Fit */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('fit')}
                  className="w-full py-3 flex items-center justify-between font-mono-typewriter uppercase text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer font-semibold"
                >
                  <span>The Fit</span>
                  {openAccordion === 'fit' ? <ChevronUp className="w-4 h-4 text-[#db2777]" /> : <ChevronDown className="w-4 h-4 text-[#db2777]" />}
                </button>
                {openAccordion === 'fit' && (
                  <div className="pb-3 text-[#4a1829]/80 font-sans-editorial leading-relaxed">
                    {quickShopProduct.fit}
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full py-3 flex items-center justify-between font-mono-typewriter uppercase text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer font-semibold"
                >
                  <span>Fabric</span>
                  {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4 text-[#db2777]" /> : <ChevronDown className="w-4 h-4 text-[#db2777]" />}
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pb-3 text-[#4a1829]/80 font-sans-editorial leading-relaxed">
                    {quickShopProduct.fabric}
                  </div>
                )}
              </div>

              {/* Accordion 3: Product Care */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3 flex items-center justify-between font-mono-typewriter uppercase text-left text-[#1f1217] hover:text-[#db2777] cursor-pointer font-semibold"
                >
                  <span>Product Care</span>
                  {openAccordion === 'care' ? <ChevronUp className="w-4 h-4 text-[#db2777]" /> : <ChevronDown className="w-4 h-4 text-[#db2777]" />}
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-3 text-[#4a1829]/80 font-sans-editorial leading-relaxed">
                    {quickShopProduct.care}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Add To Bag Button */}
          <div className="p-4 sm:p-6 bg-[#fdf2f8] border-t border-[#fbcfe8]">
            <button
              type="button"
              disabled={isAdding}
              onClick={handleAdd}
              className="w-full py-3.5 px-6 bg-[#ec4899] text-white font-mono-typewriter text-xs uppercase tracking-widest hover:bg-[#db2777] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 font-bold rounded-xs"
            >
              {isAdding ? (
                <span>Adding to Bag...</span>
              ) : (
                <span>Add to Bag – {formatPrice(quickShopProduct.price)}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

