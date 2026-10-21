import React, { useState } from 'react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    setQuickShopProduct,
    isWishlisted,
    toggleWishlist
  } = useShop();

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const activeVariant = product.variants[activeVariantIndex] || product.variants[0];
  const images = activeVariant?.images && activeVariant.images.length > 0
    ? activeVariant.images
    : [product.defaultImage, product.secondaryImage].filter(Boolean);

  const displayImage = isHovered && images[1] ? images[1] : images[imageIndex] || product.defaultImage;
  const wishlisted = isWishlisted(product.handle);

  return (
    <div
      className="group flex flex-col w-full relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Product Image Frame in White/Blush */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-white overflow-hidden mb-3 border border-[#fbcfe8] rounded-xs shadow-2xs">
        <img
          src={displayImage}
          alt={`${product.title} - ${activeVariant?.colorName || ''}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.handle);
          }}
          className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#db2777] hover:bg-[#fdf2f8] hover:scale-110 transition-all duration-200 cursor-pointer shadow-xs border border-[#fbcfe8]"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-[#ec4899] text-[#ec4899]' : 'text-[#db2777]'}`} />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-20 bg-[#db2777] text-white text-[10px] font-mono-typewriter uppercase px-2 py-0.5 tracking-wider shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Quick Shop Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20">
          <button
            type="button"
            onClick={() => setQuickShopProduct(product)}
            className="w-full bg-white text-[#db2777] hover:bg-[#ec4899] hover:text-white text-xs font-mono-typewriter uppercase py-2 px-3 tracking-wider font-semibold transition-colors duration-200 shadow-md cursor-pointer"
          >
            Quick Shop
          </button>
        </div>
      </div>

      {/* Product Meta Section */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono-typewriter text-xs sm:text-[13px] uppercase font-bold text-[#1f1217] tracking-normal line-clamp-1">
            <button
              onClick={() => setQuickShopProduct(product)}
              className="hover:text-[#db2777] transition-colors text-left cursor-pointer"
            >
              {product.title}
            </button>
          </h3>
          <span className="font-sans-editorial text-xs sm:text-[13px] font-bold text-[#db2777] shrink-0">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Color Swatches and Quick Add */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {product.variants.length > 0 ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.variants.map((v, idx) => {
                const isSelected = idx === activeVariantIndex;
                return (
                  <button
                    key={v.color}
                    type="button"
                    onClick={() => setActiveVariantIndex(idx)}
                    className={`w-4 h-4 rounded-full p-0.5 border transition-all cursor-pointer ${
                      isSelected ? 'border-[#db2777] scale-110 ring-1 ring-[#db2777]' : 'border-transparent hover:border-[#f472b6]'
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
          ) : (
            <div />
          )}

          <button
            onClick={() => addToCart(product, activeVariant?.color, product.availableSizes[0])}
            className="text-[11px] font-mono-typewriter uppercase text-[#db2777] hover:text-[#9d174d] hover:underline cursor-pointer ml-auto font-medium"
            title="Quick add default size"
          >
            + Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
