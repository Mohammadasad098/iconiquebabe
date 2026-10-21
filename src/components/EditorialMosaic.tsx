import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface EditorialMosaicProps {
  onShopFootwear: () => void;
}

export const EditorialMosaic: React.FC<EditorialMosaicProps> = ({ onShopFootwear }) => {
  const { setQuickShopProduct } = useShop();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const sandalProduct = PRODUCTS.find(p => p.handle === 'iconique-sandal-rose-chrome');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Column 1: Editorial Pink Fur Image */}
        <div className="w-full aspect-[3/4] bg-white overflow-hidden relative group border border-[#fbcfe8] rounded-xs shadow-xs">
          <img
            src="/src/assets/images/editorial_pink_fur_1792018528759.jpg"
            alt="@iconiquebabe in signature powder pink fur"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2 text-[10px] font-mono-typewriter uppercase bg-white/90 text-[#db2777] px-2 py-0.5 font-bold">
            Editorial Lookbook
          </div>
        </div>

        {/* Column 2: Video Player with Pink Controls */}
        <div className="w-full aspect-[3/4] bg-[#1f1217] overflow-hidden relative group border border-[#fbcfe8] rounded-xs shadow-xs">
          <video
            ref={videoRef}
            src="https://www.khy.com/cdn/shop/videos/c/vp/66fb7d3455464b29b9f8ab49f1e64608/66fb7d3455464b29b9f8ab49f1e64608.HD-1080p-7.2Mbps-97218186.mp4"
            poster="https://www.khy.com/cdn/shop/files/preview_images/66fb7d3455464b29b9f8ab49f1e64608.thumbnail.0000000000_small.jpg?v=1791824209"
            playsInline
            muted={isMuted}
            autoPlay
            loop
            className="w-full h-full object-cover"
          />

          {/* Video Header Controls */}
          <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-3 bg-black/40 backdrop-blur-xs p-2 rounded-xs text-white">
            <div className="flex-1 bg-white/20 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#ec4899] h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-[#f472b6] transition-colors p-0.5 cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-[#f472b6] transition-colors p-0.5 cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 text-[10px] font-mono-typewriter uppercase text-white/90 bg-black/60 px-2 py-0.5 rounded-xs">
            Florence Atelier // @iconiquebabe
          </div>
        </div>

        {/* Column 3: Editorial Typography Story */}
        <div className="w-full flex flex-col justify-center h-full p-5 sm:p-6 bg-white border border-[#fbcfe8] text-[#241019] rounded-xs shadow-xs">
          <span className="text-[11px] font-mono-typewriter uppercase tracking-widest text-[#db2777] font-semibold mb-2">
            The Philosophy
          </span>
          <h3 className="font-mono-typewriter text-xl sm:text-2xl uppercase font-bold leading-tight tracking-tight text-[#1f1217]">
            GOOD SHOES<br />TAKE TIME
          </h3>
          <p className="font-sans-editorial text-xs sm:text-sm text-[#4a1829]/80 leading-relaxed mt-4">
            @iconiquebabe brings high-glamour femininity to life in Florence. Handcrafted in Italian ateliers with sculptural rose chrome heels and buttery blush nappa.
          </p>
          <p className="font-mono-typewriter text-xs uppercase text-[#db2777] font-bold mt-3">
            100% handcrafted in italy.
          </p>

          <div className="mt-6 pt-4 border-t border-[#fbcfe8]">
            <button
              onClick={onShopFootwear}
              className="font-mono-typewriter text-xs uppercase tracking-wider text-[#db2777] hover:text-[#9d174d] py-1 border-b-2 border-[#db2777] cursor-pointer text-left font-bold"
            >
              <span>SHOP ICONIQUE × GIA BORGHINI</span>
            </button>
          </div>
        </div>

        {/* Column 4: Rose Chrome Stiletto Product Card */}
        <div className="w-full aspect-[3/4] bg-white overflow-hidden relative group border border-[#fbcfe8] rounded-xs shadow-xs">
          <img
            src="/src/assets/images/campaign_pink_heels_1792018526786.jpg"
            alt="Iconique Sandal in Rose Chrome"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between text-white">
            <div>
              <p className="font-mono-typewriter text-xs uppercase font-bold">Rose Chrome Heel</p>
              <p className="font-sans-editorial text-xs text-[#fbcfe8] font-semibold">$395</p>
            </div>
            {sandalProduct && (
              <button
                onClick={() => setQuickShopProduct(sandalProduct)}
                className="bg-[#ec4899] text-white text-[11px] font-mono-typewriter uppercase px-3 py-1.5 hover:bg-[#db2777] transition-colors cursor-pointer font-bold shadow-xs"
              >
                View
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
