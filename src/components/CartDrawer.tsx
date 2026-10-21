import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    cartCount,
    freeShippingThreshold,
    shippingRemaining,
    freeShippingQualified,
    formatPrice,
    addToCart,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const percentFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Upsell suggestions
  const cartProductIds = new Set(cart.map(i => i.product.id));
  const upsellProducts = PRODUCTS.filter(p => !cartProductIds.has(p.id)).slice(0, 3);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1f1217]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-500 ease-out border-l border-[#fbcfe8]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#fbcfe8] bg-[#fdf2f8]">
            <div className="flex items-center gap-2">
              <h2 className="font-mono-typewriter text-sm sm:text-base uppercase font-bold tracking-wide text-[#1f1217]">
                Your Bag
              </h2>
              <span className="font-mono-typewriter text-xs text-[#db2777] font-semibold">
                ({cartCount})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#1f1217] hover:text-[#db2777] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3.5 bg-[#fff8fa] border-b border-[#fbcfe8]">
            <div className="flex items-center justify-between text-xs font-mono-typewriter uppercase mb-1.5">
              <span className="text-[#1f1217] font-medium">
                {freeShippingQualified ? (
                  <span className="text-emerald-700 font-bold">Free Shipping Unlocked! 🎀</span>
                ) : (
                  <span>Spend {formatPrice(shippingRemaining)} for Free Shipping</span>
                )}
              </span>
              <span className="text-[#db2777] font-bold">{percentFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#fbcfe8] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  freeShippingQualified ? 'bg-emerald-500' : 'bg-[#ec4899]'
                }`}
                style={{ width: `${percentFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#fbcfe8]">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <ShoppingBag className="w-12 h-12 text-[#f472b6]/40 stroke-[1.2] mb-4" />
                <h3 className="font-mono-typewriter text-sm uppercase font-bold text-[#1f1217] mb-2">
                  Your Bag is Empty
                </h3>
                <p className="font-sans-editorial text-xs text-[#4a1829]/70 max-w-xs mb-6">
                  You haven&apos;t added any Iconique Babe items yet. Explore the new pink latex &amp; white denim drop.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="font-mono-typewriter text-xs uppercase px-6 py-3 bg-[#ec4899] text-white hover:bg-[#db2777] transition-colors tracking-wider font-bold cursor-pointer rounded-xs shadow-md"
                >
                  Shop The Pink Drop
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-20 aspect-[3/4] bg-[#fdf2f8] overflow-hidden shrink-0 border border-[#fbcfe8] rounded-xs">
                    <img
                      src={item.product.defaultImage}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-h-[5rem]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] line-clamp-1">
                          {item.product.title}
                        </h4>
                        <p className="font-mono-typewriter text-[11px] uppercase text-[#db2777] mt-0.5 font-medium">
                          {item.color} · Size {item.size}
                        </p>
                      </div>
                      <span className="font-sans-editorial text-xs font-bold text-[#1f1217]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex items-center border border-[#fbcfe8] bg-white rounded-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#fdf2f8] text-[#1f1217] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono-typewriter text-[#1f1217] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#fdf2f8] text-[#1f1217] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-mono-typewriter text-[11px] uppercase text-[#db2777] hover:text-[#9d174d] underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Upsell Carousel */}
            {cart.length > 0 && upsellProducts.length > 0 && (
              <div className="pt-6 pb-2">
                <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-3">
                  Pair With @iconiquebabe
                </h4>
                <div className="space-y-3">
                  {upsellProducts.map(up => (
                    <div key={up.id} className="flex items-center justify-between gap-3 p-2.5 border border-[#fbcfe8] bg-[#fdf2f8] rounded-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={up.defaultImage}
                          alt={up.title}
                          className="w-12 h-14 object-cover border border-[#fbcfe8] rounded-2xs"
                        />
                        <div>
                          <p className="font-mono-typewriter text-[11px] uppercase font-bold text-[#1f1217] line-clamp-1">
                            {up.title}
                          </p>
                          <p className="font-sans-editorial text-xs text-[#db2777] font-semibold">
                            {formatPrice(up.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(up, up.variants[0]?.color, up.availableSizes[0])}
                        className="font-mono-typewriter text-[11px] uppercase px-3 py-1.5 bg-[#ec4899] text-white hover:bg-[#db2777] transition-colors cursor-pointer shrink-0 font-bold rounded-xs shadow-2xs"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#fdf2f8] border-t border-[#fbcfe8]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono-typewriter text-xs uppercase tracking-wider text-[#1f1217] font-medium">
                  Estimated Total:
                </span>
                <span className="font-mono-typewriter text-base font-bold text-[#db2777]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="font-sans-editorial text-[11px] text-[#4a1829]/65 mb-4">
                Shipping and taxes calculated at checkout.
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 bg-[#ec4899] text-white font-mono-typewriter text-xs uppercase tracking-widest hover:bg-[#db2777] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md font-bold rounded-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
