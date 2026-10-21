import React, { useState } from 'react';
import { INSTAGRAM_POSTS, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Instagram, ShoppingBag, ExternalLink, Check, Heart, X } from 'lucide-react';
import instagramImage from '../assets/images/instagram.jpg';

export const ShopInstagram: React.FC = () => {
  const { setQuickShopProduct } = useShop();
  const [selectedPost, setSelectedPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  const handlePostClick = (post: typeof INSTAGRAM_POSTS[0]) => {
    setSelectedPost(post);
  };

  const handleShopOutfit = (productHandle: string) => {
    const prod = PRODUCTS.find(p => p.handle === productHandle);
    if (prod) {
      setSelectedPost(null);
      setQuickShopProduct(prod);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 border-t border-[#fbcfe8]">
      {/* Instagram Profile Header Card */}
      <div className="max-w-3xl mx-auto mb-10 sm:mb-14 p-6 sm:p-8 bg-white border border-[#fbcfe8] rounded-2xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          {/* Avatar with Gradient Story Ring */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 shadow-md">
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                <img
                  src={instagramImage}
                  alt="@iconiquebabe profile avatar"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#ec4899] text-white rounded-full flex items-center justify-center text-[10px] shadow-sm font-bold border-2 border-white">
              +
            </span>
          </div>

          {/* Profile Bio Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 justify-center sm:justify-start">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <h3 className="font-mono-typewriter text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1f1217]">
                  iconiquebabe
                </h3>
                <span className="inline-flex items-center justify-center w-4 h-4 bg-[#0284c7] text-white rounded-full text-[9px]" title="Verified Creator">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>

              <a
                href="https://www.instagram.com/iconiquebabe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[#ec4899] hover:bg-[#db2777] text-white text-xs font-mono-typewriter uppercase font-bold rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow</span>
              </a>
            </div>

            {/* Counts */}
            <div className="flex items-center justify-center sm:justify-start gap-6 my-3 text-xs font-mono-typewriter">
              <div>
                <span className="font-bold text-[#1f1217]">184</span>{' '}
                <span className="text-[#4a1829]/70">posts</span>
              </div>
              <div>
                <span className="font-bold text-[#1f1217]">2.4M</span>{' '}
                <span className="text-[#4a1829]/70">followers</span>
              </div>
              <div>
                <span className="font-bold text-[#1f1217]">312</span>{' '}
                <span className="text-[#4a1829]/70">following</span>
              </div>
            </div>

            <p className="font-sans-editorial text-xs sm:text-[13px] text-[#4a1829]/85 leading-relaxed">
              🎀 <strong>ICONIQUE BABE</strong> · Directed by @iconiquebabe<br />
              Sculpted pink liquid latex, cloud white tailoring &amp; handcrafted Italian footwear.<br />
              <a
                href="https://www.instagram.com/iconiquebabe"
                target="_blank"
                rel="noreferrer"
                className="text-[#db2777] font-semibold hover:underline inline-flex items-center gap-1 mt-1 font-mono-typewriter text-xs"
              >
                <span>instagram.com/iconiquebabe</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <span className="text-xs font-mono-typewriter uppercase tracking-widest text-[#db2777] mb-1 font-semibold">
          Tap Any Photo To Shop Outfit
        </span>
        <h2 className="font-mono-typewriter text-2xl sm:text-3xl uppercase font-bold text-[#1f1217] tracking-tight">
          LATEST FEED DROPS
        </h2>
      </div>

      {/* Grid of 6 Lookbook / IG items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INSTAGRAM_POSTS.map(post => {
          const taggedProduct = PRODUCTS.find(p => p.handle === post.productHandle);
          return (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="group relative aspect-[4/5] bg-white overflow-hidden cursor-pointer border border-[#fbcfe8] rounded-xs shadow-xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay with tagged product */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-typewriter uppercase tracking-wider text-pink-200 font-bold flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                    <span>{post.likes}</span>
                  </span>
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>

                <div>
                  {taggedProduct && (
                    <div className="bg-white/95 text-[#1f1217] p-2 rounded-xs shadow-xs border border-[#fbcfe8]">
                      <p className="font-mono-typewriter text-[11px] uppercase font-bold line-clamp-1 text-[#1f1217]">
                        {taggedProduct.title}
                      </p>
                      <p className="font-sans-editorial text-xs font-bold text-[#db2777]">
                        ${taggedProduct.price}
                      </p>
                    </div>
                  )}
                  <p className="font-mono-typewriter text-[10px] uppercase text-pink-200 text-center mt-2 font-bold underline">
                    View Outfit
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Post Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241019]/70 backdrop-blur-xs select-none"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white max-w-2xl w-full border border-[#fbcfe8] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1f1217] hover:text-[#db2777] flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Post Photo */}
            <div className="md:w-1/2 aspect-square md:aspect-auto bg-[#fff8fa]">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Meta & Shop Callout */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#fbcfe8]">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#fbcfe8]">
                    <img
                      src={instagramImage}
                      alt="@iconiquebabe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-mono-typewriter text-xs font-bold uppercase text-[#1f1217]">
                      @iconiquebabe
                    </h4>
                    <span className="text-[10px] font-sans-editorial text-[#4a1829]/60">Florence, Italy</span>
                  </div>
                </div>

                <p className="font-sans-editorial text-xs sm:text-sm text-[#241019] leading-relaxed mb-4">
                  {selectedPost.caption}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono-typewriter text-[#db2777] font-semibold mb-6">
                  <Heart className="w-4 h-4 fill-[#ec4899] text-[#ec4899]" />
                  <span>{selectedPost.likes} likes</span>
                </div>
              </div>

              {/* Tagged item action */}
              <div className="space-y-3 pt-3 border-t border-[#fbcfe8]">
                {(() => {
                  const prod = PRODUCTS.find(p => p.handle === selectedPost.productHandle);
                  if (!prod) return null;
                  return (
                    <button
                      onClick={() => handleShopOutfit(selectedPost.productHandle)}
                      className="w-full py-3 px-4 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase font-bold tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop Look · ${prod.price}</span>
                    </button>
                  );
                })()}

                <a
                  href="https://www.instagram.com/iconiquebabe"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] font-mono-typewriter text-xs uppercase font-semibold tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Open on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
