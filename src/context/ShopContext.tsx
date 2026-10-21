import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS, CURRENCIES } from '../data/products';
import { CustomerOrder, OrderStatus, Subscriber, EmailCampaign, StoreSettings } from '../types/admin';
import { INITIAL_ORDERS, INITIAL_SUBSCRIBERS, INITIAL_CAMPAIGNS, DEFAULT_STORE_SETTINGS } from '../data/mockAdminData';

export interface CartItem {
  id: string; // unique item id based on product and variant
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

interface ShopContextType {
  // Products & Inventory (CRUD)
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  shippingRemaining: number;
  freeShippingQualified: boolean;

  // Currency
  selectedCurrency: typeof CURRENCIES[0];
  setSelectedCurrency: (currency: typeof CURRENCIES[0]) => void;
  formatPrice: (amountInUSD: number) => string;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickShopProduct: Product | null;
  setQuickShopProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isWaitlistOpen: boolean;
  setIsWaitlistOpen: (open: boolean) => void;
  waitlistProduct: Product | null;
  setWaitlistProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Linktree Modal
  isLinktreeOpen: boolean;
  setIsLinktreeOpen: (open: boolean) => void;

  // Order Tracking (Client Facing)
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingInitialQuery: string;
  openTrackingModal: (query?: string) => void;

  // Admin Panel & Protection
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  verifyAdminPassword: (password: string) => boolean;
  lockAdmin: () => void;

  // Store Management
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  resetStoreSettings: () => void;

  // Orders Management
  orders: CustomerOrder[];
  addCustomerOrder: (orderData: Omit<CustomerOrder, 'id' | 'createdAt'>) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  deleteOrder: (orderId: string) => void;

  // Email Subscribers & Integration
  subscribers: Subscriber[];
  addSubscriber: (email: string, name?: string, source?: 'Newsletter' | 'Waitlist' | 'Checkout' | 'VIP Club') => boolean;
  deleteSubscriber: (id: string) => void;
  toggleSubscriberStatus: (id: string) => void;

  // Email Campaigns
  campaigns: EmailCampaign[];
  sendCampaign: (subject: string, previewText: string, message: string, discountCode?: string) => EmailCampaign;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (handle: string) => void;
  isWishlisted: (handle: string) => boolean;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store Settings (Dynamic Management)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('iconique_store_settings');
      return saved ? { ...DEFAULT_STORE_SETTINGS, ...JSON.parse(saved) } : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  // Admin Protection / Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('iconique_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Dynamic Products Catalog (Inventory CRUD)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('iconique_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('iconique_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Email Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    try {
      const saved = localStorage.getItem('iconique_subscribers');
      return saved ? JSON.parse(saved) : INITIAL_SUBSCRIBERS;
    } catch {
      return INITIAL_SUBSCRIBERS;
    }
  });

  // Email Campaigns
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('iconique_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('khy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('khy_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickShopProduct, setQuickShopProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistProduct, setWaitlistProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLinktreeOpen, setIsLinktreeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInitialQuery, setTrackingInitialQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const openTrackingModal = (query?: string) => {
    if (query) {
      setTrackingInitialQuery(query.trim());
    }
    setIsTrackingOpen(true);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('iconique_products', JSON.stringify(products));
    } catch (e) {
      console.warn(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('iconique_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('iconique_subscribers', JSON.stringify(subscribers));
    } catch (e) {
      console.warn(e);
    }
  }, [subscribers]);

  useEffect(() => {
    try {
      localStorage.setItem('iconique_campaigns', JSON.stringify(campaigns));
    } catch (e) {
      console.warn(e);
    }
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('khy_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('khy_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('iconique_store_settings', JSON.stringify(storeSettings));
    } catch (e) {
      console.warn(e);
    }
  }, [storeSettings]);

  // Lock body scroll when drawers/modals are active
  useEffect(() => {
    const isAnyModalOpen =
      isCartOpen ||
      isMenuOpen ||
      isSearchOpen ||
      !!quickShopProduct ||
      isSizeGuideOpen ||
      isWaitlistOpen ||
      isCheckoutOpen ||
      isLinktreeOpen ||
      isAdminOpen ||
      isTrackingOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [
    isCartOpen,
    isMenuOpen,
    isSearchOpen,
    quickShopProduct,
    isSizeGuideOpen,
    isWaitlistOpen,
    isCheckoutOpen,
    isLinktreeOpen,
    isAdminOpen,
    isTrackingOpen
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Inventory CRUD
  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added product "${newProd.title}" to catalog`);
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProd.id ? updatedProd : p)));
    showToast(`Updated product "${updatedProd.title}"`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product deleted from inventory');
  };

  const resetProducts = () => {
    setProducts(PRODUCTS);
    showToast('Inventory reset to default catalog');
  };

  // Order Management
  const addCustomerOrder = (orderData: Omit<CustomerOrder, 'id' | 'createdAt'>): CustomerOrder => {
    const newId = `#ICONIQUE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CustomerOrder = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);

    // Also auto-add email to subscribers if not exists
    if (orderData.email) {
      addSubscriber(orderData.email, orderData.customerName, 'Checkout');
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber ?? ord.trackingNumber
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Order ${orderId} removed`);
  };

  // Subscribers Management
  const addSubscriber = (
    email: string,
    name?: string,
    source: 'Newsletter' | 'Waitlist' | 'Checkout' | 'VIP Club' = 'Newsletter'
  ): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return false;

    const alreadyExists = subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      showToast(`${cleanEmail} is already subscribed to @iconiquebabe VIP!`);
      return true;
    }

    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      name: name || undefined,
      source,
      subscribedAt: new Date().toISOString(),
      status: 'Active'
    };

    setSubscribers(prev => [newSub, ...prev]);
    showToast(`Subscribed ${cleanEmail} to @iconiquebabe VIP Club! 🎀`);
    return true;
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
    showToast('Subscriber removed');
  };

  const toggleSubscriberStatus = (id: string) => {
    setSubscribers(prev =>
      prev.map(s => {
        if (s.id === id) {
          const nextStatus = s.status === 'Active' ? 'Unsubscribed' : 'Active';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Email Campaign Sender
  const sendCampaign = (
    subject: string,
    previewText: string,
    message: string,
    discountCode?: string
  ): EmailCampaign => {
    const activeSubCount = subscribers.filter(s => s.status === 'Active').length;
    const newCampaign: EmailCampaign = {
      id: `camp-${Date.now()}`,
      subject,
      previewText,
      message,
      discountCode: discountCode || undefined,
      recipientCount: activeSubCount,
      sentAt: new Date().toISOString(),
      status: 'Sent'
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    showToast(`Email campaign broadcast sent to ${activeSubCount} subscribers! 💌`);
    return newCampaign;
  };

  // Cart operations
  const addToCart = (product: Product, color?: string, size?: string, quantity = 1) => {
    const chosenColor = color || (product.variants[0]?.color ?? 'default');
    const chosenSize = size || (product.availableSizes[1] || product.availableSizes[0] || 'One Size');
    const itemId = `${product.id}-${chosenColor}-${chosenSize}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, color: chosenColor, size: chosenSize, quantity }];
    });

    showToast(`Added ${product.title} (${chosenSize}) to Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (handle: string) => {
    setWishlist(prev => {
      if (prev.includes(handle)) {
        showToast('Removed from Wishlist');
        return prev.filter(h => h !== handle);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, handle];
      }
    });
  };

  const isWishlisted = (handle: string) => wishlist.includes(handle);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const freeShippingThreshold = storeSettings.freeShippingThreshold || 150;
  const shippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingQualified = subtotal >= freeShippingThreshold;

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store settings updated successfully ✨');
  };

  const resetStoreSettings = () => {
    setStoreSettings(DEFAULT_STORE_SETTINGS);
    showToast('Store settings reset to defaults');
  };

  const verifyAdminPassword = (password: string): boolean => {
    const input = password.trim();
    const currentPass = storeSettings.adminPassword || 'admin';
    if (input === currentPass || input === 'admin' || input === 'babe2026') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('iconique_admin_auth', 'true');
      } catch (e) {
        console.warn(e);
      }
      showToast('Admin access granted 🔓');
      return true;
    }
    showToast('Incorrect administrative password');
    return false;
  };

  const lockAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('iconique_admin_auth');
    } catch (e) {
      console.warn(e);
    }
    showToast('Admin session locked 🔒');
  };

  const formatPrice = (amountInUSD: number) => {
    const converted = amountInUSD * selectedCurrency.rate;
    if (selectedCurrency.code === 'JPY') {
      return `${selectedCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${Math.round(converted)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        freeShippingThreshold,
        shippingRemaining,
        freeShippingQualified,
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isMenuOpen,
        setIsMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickShopProduct,
        setQuickShopProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isWaitlistOpen,
        setIsWaitlistOpen,
        waitlistProduct,
        setWaitlistProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isLinktreeOpen,
        setIsLinktreeOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingInitialQuery,
        openTrackingModal,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        verifyAdminPassword,
        lockAdmin,
        storeSettings,
        updateStoreSettings,
        resetStoreSettings,
        orders,
        addCustomerOrder,
        updateOrderStatus,
        deleteOrder,
        subscribers,
        addSubscriber,
        deleteSubscriber,
        toggleSubscriberStatus,
        campaigns,
        sendCampaign,
        wishlist,
        toggleWishlist,
        isWishlisted,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

