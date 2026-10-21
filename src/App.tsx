import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedCollections } from './components/FeaturedCollections';
import { CampaignBanner } from './components/CampaignBanner';
import { EditorialMosaic } from './components/EditorialMosaic';
import { ShopInstagram } from './components/ShopInstagram';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { MenuDrawer } from './components/MenuDrawer';
import { SearchDrawer } from './components/SearchDrawer';
import { QuickShopModal } from './components/QuickShopModal';
import { SizeGuideDrawer } from './components/SizeGuideDrawer';
import { WaitlistModal } from './components/WaitlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { LinktreeModal } from './components/LinktreeModal';
import { AdminPanel } from './components/AdminPanel';
import { OrderTrackingModal } from './components/OrderTrackingModal';

const AppContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const { toast, setIsLinktreeOpen } = useShop();

  const handleScrollToCollections = (category = 'ALL') => {
    setSelectedCategory(category);
    const element = document.getElementById('featured-collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8fa] text-[#241019] font-sans-editorial">
      {/* Top Announcement Bar */}
      <AnnouncementBar onSelectCategory={handleScrollToCollections} />

      {/* Main Top Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* Campaign 1: Latex Hero Banner */}
        <HeroBanner onShopLatex={() => handleScrollToCollections('LATEX')} />

        {/* Featured Collections / Product Grid */}
        <FeaturedCollections
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Campaign 2: ICONIQUE x GIA BORGHINI Footwear */}
        <CampaignBanner
          variant="shoes"
          title="HAND-CRAFTED IN ITALY"
          subtitle="Sculpted footwear designed in collaboration with Gia Borghini, made by master artisans in Florence."
          ctaText="SHOP SHOES"
          desktopImage="https://www.khy.com/cdn/shop/files/gia_borghini_full_b1c711e6-1f1c-4442-82c9-1d7e5a4f693a.jpg?v=1791822830&width=1920"
          mobileImage="https://www.khy.com/cdn/shop/files/3715820d426f0d1be607b2740b40d8adb6a7f97b_1.jpg?v=1791822845&width=800"
          onCtaClick={() => handleScrollToCollections('ALL')}
        />

        {/* Editorial Mosaic Section (Video + Story + Lookbook) */}
        <EditorialMosaic onShopFootwear={() => handleScrollToCollections('ALL')} />

        {/* Campaign 3: ICONIQUE SIGNATURES */}
        <CampaignBanner
          variant="icons"
          title="ICONIQUE SIGNATURES"
          subtitle="Most loved signatures of the @iconiquebabe wardrobe. Sculpted pink bodysuits, tailored leather, and timeless outerwear."
          ctaText="SHOP SIGNATURES"
          desktopImage="https://www.khy.com/cdn/shop/files/83dfcbe7c33c417ea7217fbb864117781401b4f5.png?v=1791824454&width=1920"
          mobileImage="https://www.khy.com/cdn/shop/files/c780e3b476bc6ca67443a4010d4bd57196357294_2.jpg?v=1791824614&width=800"
          onCtaClick={() => handleScrollToCollections('ALL')}
        />

        {/* Community & Instagram Lookbook */}
        <ShopInstagram />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleScrollToCollections} />

      {/* Floating Linktree Pill */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          onClick={() => setIsLinktreeOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/95 backdrop-blur-md border border-[#fbcfe8] text-[#db2777] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-mono-typewriter text-xs uppercase font-bold cursor-pointer"
          title="Aisiri Navea Linktree Hub"
        >
          <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
          <span>Linktree: @aisirinavea</span>
        </button>
      </div>

      {/* Slide-out Drawers & Modals */}
      <CartDrawer />
      <MenuDrawer onSelectCategory={handleScrollToCollections} />
      <SearchDrawer />
      <QuickShopModal />
      <SizeGuideDrawer />
      <WaitlistModal />
      <CheckoutModal />
      <LinktreeModal />
      <AdminPanel />
      <OrderTrackingModal />

      {/* Global Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#db2777] text-white text-xs font-mono-typewriter uppercase px-5 py-3.5 shadow-2xl border border-pink-200/50 transition-all duration-300 animate-fade-in flex items-center gap-2 rounded-xs">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
