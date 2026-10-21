import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../data/products';
import { CustomerOrder, OrderStatus, Subscriber, StoreSettings } from '../types/admin';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Search,
  Mail,
  Send,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Tag,
  Eye,
  EyeOff,
  AlertCircle,
  Lock,
  Unlock,
  ShieldCheck,
  Settings,
  Sliders,
  Save,
  Key,
  Globe,
  Bell,
  RefreshCw
} from 'lucide-react';
import { KhyLogo } from './KhyLogo';

type AdminTab = 'overview' | 'store' | 'orders' | 'subscribers' | 'inventory';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    verifyAdminPassword,
    lockAdmin,
    storeSettings,
    updateStoreSettings,
    resetStoreSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    orders,
    updateOrderStatus,
    deleteOrder,
    subscribers,
    addSubscriber,
    deleteSubscriber,
    toggleSubscriberStatus,
    campaigns,
    sendCampaign,
    formatPrice,
    showToast,
    openTrackingModal
  } = useShop();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Admin Protection Gate State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Store Settings Form State
  const [storeForm, setStoreForm] = useState({
    storeName: storeSettings.storeName,
    tagline: storeSettings.tagline,
    heroHeadline: storeSettings.heroHeadline,
    heroSubtitle: storeSettings.heroSubtitle,
    announcementText: storeSettings.announcementText,
    freeShippingThreshold: storeSettings.freeShippingThreshold,
    vipDiscountPercent: storeSettings.vipDiscountPercent,
    contactEmail: storeSettings.contactEmail,
    contactPhone: storeSettings.contactPhone,
    instagramHandle: storeSettings.instagramHandle,
    youtubeHandle: storeSettings.youtubeHandle,
    linktreeUrl: storeSettings.linktreeUrl,
    storeMode: storeSettings.storeMode,
    newAdminPassword: '',
    confirmAdminPassword: ''
  });

  // Sync storeForm when storeSettings changes
  useEffect(() => {
    setStoreForm(prev => ({
      ...prev,
      storeName: storeSettings.storeName,
      tagline: storeSettings.tagline,
      heroHeadline: storeSettings.heroHeadline,
      heroSubtitle: storeSettings.heroSubtitle,
      announcementText: storeSettings.announcementText,
      freeShippingThreshold: storeSettings.freeShippingThreshold,
      vipDiscountPercent: storeSettings.vipDiscountPercent,
      contactEmail: storeSettings.contactEmail,
      contactPhone: storeSettings.contactPhone,
      instagramHandle: storeSettings.instagramHandle,
      youtubeHandle: storeSettings.youtubeHandle,
      linktreeUrl: storeSettings.linktreeUrl,
      storeMode: storeSettings.storeMode
    }));
  }, [storeSettings]);

  // Search & Filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Email Composer Form
  const [emailSubject, setEmailSubject] = useState('');
  const [emailPreview, setEmailPreview] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailPromoCode, setEmailPromoCode] = useState('ICONIQUE15');

  // Product CRUD Modals
  const [inventorySearch, setInventorySearch] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productForm, setProductForm] = useState({
    title: '',
    price: 150,
    category: 'LATEX' as Product['category'],
    badge: 'NEW DROP',
    description: '',
    fit: 'True to size sculpted silhouette.',
    fabric: 'Luxury Italian stretch composite.',
    care: 'Specialist care recommended.',
    defaultImage: '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg',
    secondaryImage: '',
    availableSizes: 'XS, S, M, L',
    colorName: 'Baby Pink',
    colorHex: '#f472b6'
  });

  if (!isAdminOpen) return null;

  // Handle Unlock Session
  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyAdminPassword(passwordInput);
    if (success) {
      setPasswordInput('');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // ADMIN PROTECTION GATE: If not authenticated, render the lock screen
  if (!isAdminAuthenticated) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-hidden select-none bg-[#241019]/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-label="Protected Admin Security Gate"
      >
        <div className="w-full max-w-md bg-white border border-[#fbcfe8] rounded-2xl shadow-2xl overflow-hidden text-[#1f1217]">
          {/* Lock Screen Header */}
          <div className="p-6 bg-gradient-to-b from-[#fff8fa] to-white border-b border-[#fbcfe8] text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center text-[#ec4899] shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] rounded-full text-[10px] font-mono-typewriter uppercase font-bold mb-2">
              <Lock className="w-3 h-3" />
              <span>Admin Authentication Required</span>
            </div>
            <h2 className="font-mono-typewriter text-sm font-bold uppercase tracking-wider text-[#1f1217]">
              ICONIQUE BABE Management Portal
            </h2>
            <p className="font-sans-editorial text-xs text-[#4a1829]/70 mt-1">
              Enter your administrative passkey to securely access store settings, orders, email marketing, and inventory management.
            </p>
          </div>

          {/* Lock Screen Form */}
          <form onSubmit={handleUnlockSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1.5 flex items-center justify-between">
                <span>Admin Passkey</span>
                <span className="text-[10px] text-[#db2777] font-mono-typewriter font-semibold lowercase">
                  default: admin
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter administrator password..."
                  value={passwordInput}
                  onChange={e => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  className={`w-full px-3.5 py-2.5 pr-10 text-xs font-mono-typewriter border rounded-xs bg-[#fff8fa] outline-none transition-colors ${
                    authError ? 'border-rose-500 ring-1 ring-rose-400' : 'border-[#fbcfe8] focus:border-[#db2777]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a1829]/60 hover:text-[#db2777] cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans-editorial rounded-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Incorrect passkey. Please verify and try again. (Hint: default passkey is <strong>admin</strong>)</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="flex-1 py-2.5 border border-[#fbcfe8] hover:bg-[#fdf2f8] text-[#1f1217] text-xs font-mono-typewriter uppercase rounded-xs cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#ec4899] hover:bg-[#db2777] text-white text-xs font-mono-typewriter uppercase font-bold rounded-xs cursor-pointer shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Portal</span>
              </button>
            </div>
          </form>

          {/* Footer Security Badge */}
          <div className="px-6 py-3 bg-[#fdf2f8] border-t border-[#fbcfe8] flex items-center justify-between text-[11px] font-mono-typewriter text-[#4a1829]/65">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>SSL / Session-Guarded</span>
            </span>
            <span className="text-[#db2777] font-bold">@iconiquebabe</span>
          </div>
        </div>
      </div>
    );
  }

  // Overview Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const activeSubscribersCount = subscribers.filter(s => s.status === 'Active').length;

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.email.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Subscribers
  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
    (s.name && s.name.toLowerCase().includes(subscriberSearch.toLowerCase()))
  );

  // Filtered Inventory
  const filteredInventory = products.filter(p =>
    p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  // Handle New Subscriber
  const handleAddSubscriberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubEmail && newSubEmail.includes('@')) {
      addSubscriber(newSubEmail, newSubName, 'VIP Club');
      setNewSubEmail('');
      setNewSubName('');
    }
  };

  // Handle Send Campaign
  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject || !emailMessage) {
      showToast('Please provide an email subject and message.');
      return;
    }
    sendCampaign(emailSubject, emailPreview, emailMessage, emailPromoCode);
    setIsComposerOpen(false);
    setEmailSubject('');
    setEmailPreview('');
    setEmailMessage('');
  };

  // Export Subscribers to CSV
  const handleExportSubscribersCSV = () => {
    const headers = ['Email', 'Name', 'Source', 'Subscribed At', 'Status'];
    const rows = subscribers.map(s => [
      s.email,
      s.name || '',
      s.source,
      new Date(s.subscribedAt).toLocaleDateString(),
      s.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `iconiquebabe_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Subscribers CSV exported successfully!');
  };

  // Open Product Modal (Create or Edit)
  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        title: product.title,
        price: product.price,
        category: product.category,
        badge: product.badge || '',
        description: product.description,
        fit: product.fit,
        fabric: product.fabric,
        care: product.care,
        defaultImage: product.defaultImage,
        secondaryImage: product.secondaryImage || '',
        availableSizes: product.availableSizes.join(', '),
        colorName: product.variants[0]?.colorName || 'Baby Pink',
        colorHex: product.variants[0]?.colorHex || '#f472b6'
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        title: '',
        price: 180,
        category: 'LATEX',
        badge: 'NEW DROP',
        description: 'New signature creation designed for the ICONIQUE BABE pink wardrobe.',
        fit: 'True to size sculpted silhouette.',
        fabric: 'Luxury Italian stretch composite with high-gloss liquid finish.',
        care: 'Hand wash cold or specialist dry clean.',
        defaultImage: '/src/assets/images/hero_pink_latex_fashion_1792018525190.jpg',
        secondaryImage: '/src/assets/images/editorial_pink_fur_1792018528759.jpg',
        availableSizes: 'XS, S, M, L, XL',
        colorName: 'Baby Pink',
        colorHex: '#f472b6'
      });
    }
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title) return;

    const sizes = productForm.availableSizes
      .split(',')
      .map(s => s.trim().toUpperCase())
      .filter(Boolean);

    const generatedHandle = productForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      handle: editingProduct ? editingProduct.handle : generatedHandle,
      title: productForm.title,
      price: Number(productForm.price),
      category: productForm.category,
      badge: productForm.badge.trim() || undefined,
      description: productForm.description,
      fit: productForm.fit,
      fabric: productForm.fabric,
      care: productForm.care,
      availableSizes: sizes.length > 0 ? sizes : ['One Size'],
      defaultImage: productForm.defaultImage,
      secondaryImage: productForm.secondaryImage || productForm.defaultImage,
      variants: [
        {
          color: productForm.colorName.toLowerCase().replace(/\s+/g, '-'),
          colorName: productForm.colorName,
          colorHex: productForm.colorHex,
          images: [productForm.defaultImage, productForm.secondaryImage].filter(Boolean),
          inStock: true
        }
      ]
    };

    if (editingProduct) {
      updateProduct(productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Processing':
        return 'bg-pink-100 text-[#db2777] border-pink-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden select-none bg-[#241019]/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="ICONIQUE BABE Admin Panel"
    >
      <div className="w-full max-w-7xl h-[94vh] bg-[#fff8fa] border border-[#fbcfe8] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#1f1217]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#fbcfe8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <KhyLogo variant="pink" size="sm" />
            <div className="h-4 w-px bg-[#fbcfe8]" />
            <div>
              <h2 className="font-mono-typewriter text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1f1217] flex items-center gap-2">
                <span>Management Hub</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" title="Store Live" />
              </h2>
              <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                Orders, Email Marketing &amp; Inventory CRUD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={lockAdmin}
              className="px-2.5 sm:px-3 py-1.5 bg-[#fdf2f8] hover:bg-rose-100 border border-[#fbcfe8] text-rose-700 rounded-xs font-mono-typewriter text-[11px] sm:text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 font-bold"
              title="Lock Admin Session and require passkey to enter"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Session</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-2.5 sm:px-3 py-1.5 bg-[#fdf2f8] hover:bg-[#ec4899] hover:text-white border border-[#fbcfe8] rounded-xs font-mono-typewriter text-[11px] sm:text-xs uppercase text-[#db2777] transition-all cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#fdf2f8] px-4 sm:px-6 py-2.5 border-b border-[#fbcfe8] flex items-center gap-2 sm:gap-3 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 font-mono-typewriter text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 font-bold shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#ec4899] text-white shadow-xs'
                : 'bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fff8fa]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`px-3.5 py-1.5 font-mono-typewriter text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 font-bold shrink-0 ${
              activeTab === 'store'
                ? 'bg-[#ec4899] text-white shadow-xs'
                : 'bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fff8fa]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Store Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 font-mono-typewriter text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 font-bold shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#ec4899] text-white shadow-xs'
                : 'bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fff8fa]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 font-mono-typewriter text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 font-bold ${
              activeTab === 'subscribers'
                ? 'bg-[#ec4899] text-white shadow-xs'
                : 'bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fff8fa]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Emails &amp; VIP ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 font-mono-typewriter text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 font-bold ${
              activeTab === 'inventory'
                ? 'bg-[#ec4899] text-white shadow-xs'
                : 'bg-white border border-[#fbcfe8] text-[#db2777] hover:bg-[#fff8fa]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Inventory CRUD ({products.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 bg-white border border-[#fbcfe8] rounded-xl shadow-xs">
                  <span className="text-[11px] font-mono-typewriter uppercase text-[#4a1829]/70 font-semibold">Total Revenue</span>
                  <p className="font-mono-typewriter text-2xl sm:text-3xl font-bold text-[#db2777] mt-1">
                    {formatPrice(totalRevenue)}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-mono-typewriter mt-1 inline-block">
                    +18.4% from last drop
                  </span>
                </div>

                <div className="p-5 bg-white border border-[#fbcfe8] rounded-xl shadow-xs">
                  <span className="text-[11px] font-mono-typewriter uppercase text-[#4a1829]/70 font-semibold">Total Orders</span>
                  <p className="font-mono-typewriter text-2xl sm:text-3xl font-bold text-[#1f1217] mt-1">
                    {orders.length}
                  </p>
                  <span className="text-[10px] text-[#db2777] font-mono-typewriter mt-1 inline-block">
                    Avg Order: {formatPrice(averageOrderValue)}
                  </span>
                </div>

                <div className="p-5 bg-white border border-[#fbcfe8] rounded-xl shadow-xs">
                  <span className="text-[11px] font-mono-typewriter uppercase text-[#4a1829]/70 font-semibold">VIP Email List</span>
                  <p className="font-mono-typewriter text-2xl sm:text-3xl font-bold text-[#db2777] mt-1">
                    {activeSubscribersCount}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-mono-typewriter mt-1 inline-block">
                    100% deliverability
                  </span>
                </div>

                <div className="p-5 bg-white border border-[#fbcfe8] rounded-xl shadow-xs">
                  <span className="text-[11px] font-mono-typewriter uppercase text-[#4a1829]/70 font-semibold">Inventory Products</span>
                  <p className="font-mono-typewriter text-2xl sm:text-3xl font-bold text-[#1f1217] mt-1">
                    {products.length}
                  </p>
                  <span className="text-[10px] text-[#db2777] font-mono-typewriter mt-1 inline-block">
                    Active Catalog
                  </span>
                </div>
              </div>

              {/* Quick Actions & Recent Orders preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-8 bg-white border border-[#fbcfe8] rounded-xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#fbcfe8]">
                    <h3 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-mono-typewriter uppercase text-[#db2777] hover:underline font-bold"
                    >
                      View All Orders &rarr;
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 4).map(ord => (
                      <div
                        key={ord.id}
                        className="p-3.5 border border-[#fbcfe8] rounded-xs bg-[#fff8fa] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-typewriter text-xs font-bold text-[#db2777]">{ord.id}</span>
                            <span className={`text-[10px] font-mono-typewriter uppercase px-2 py-0.5 rounded-full border ${getStatusColor(ord.status)}`}>
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs font-sans-editorial text-[#1f1217] mt-1 font-semibold">
                            {ord.customerName} · <span className="text-[#4a1829]/65">{ord.email}</span>
                          </p>
                          <p className="text-[11px] font-mono-typewriter text-[#4a1829]/60">
                            {ord.items.length} item{ord.items.length > 1 ? 's' : ''} · {new Date(ord.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="font-mono-typewriter text-sm font-bold text-[#1f1217]">
                            {formatPrice(ord.total)}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setActiveTab('orders');
                            }}
                            className="px-2.5 py-1 bg-white border border-[#fbcfe8] hover:bg-[#fdf2f8] text-[#db2777] text-xs font-mono-typewriter uppercase rounded-xs cursor-pointer font-bold"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Broadcast Fast Action */}
                <div className="lg:col-span-4 bg-gradient-to-b from-[#fdf2f8] to-white border border-[#fbcfe8] rounded-xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#db2777] mb-2">
                      <Mail className="w-5 h-5" />
                      <span className="font-mono-typewriter text-xs uppercase font-bold tracking-wider">
                        VIP Broadcast
                      </span>
                    </div>
                    <h4 className="font-mono-typewriter text-base uppercase font-bold text-[#1f1217] mb-2">
                      Reach Your VIP List
                    </h4>
                    <p className="font-sans-editorial text-xs text-[#4a1829]/75 leading-relaxed mb-4">
                      Directly broadcast private pink drops, restock alerts, or promo codes to all {activeSubscribersCount} active subscribers.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setActiveTab('subscribers');
                        setIsComposerOpen(true);
                      }}
                      className="w-full py-3 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase tracking-wider rounded-xs font-bold transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Compose Campaign</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('inventory');
                        handleOpenProductModal();
                      }}
                      className="w-full py-2.5 bg-white hover:bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] font-mono-typewriter text-xs uppercase tracking-wider rounded-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Product</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORE MANAGEMENT & SETTINGS */}
          {activeTab === 'store' && (
            <div className="space-y-6 max-w-5xl mx-auto pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#fbcfe8]">
                <div>
                  <h3 className="font-mono-typewriter text-sm sm:text-base uppercase font-bold text-[#1f1217] flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#ec4899]" />
                    <span>Store Configuration &amp; Branding</span>
                  </h3>
                  <p className="font-sans-editorial text-xs text-[#4a1829]/70 mt-0.5">
                    Live controls for store status, top banner announcement, shipping thresholds, and admin security.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={resetStoreSettings}
                    className="px-3 py-2 bg-white hover:bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (storeForm.newAdminPassword) {
                    if (storeForm.newAdminPassword !== storeForm.confirmAdminPassword) {
                      showToast('New passwords do not match!');
                      return;
                    }
                    updateStoreSettings({
                      storeName: storeForm.storeName,
                      tagline: storeForm.tagline,
                      heroHeadline: storeForm.heroHeadline,
                      heroSubtitle: storeForm.heroSubtitle,
                      announcementText: storeForm.announcementText,
                      freeShippingThreshold: Number(storeForm.freeShippingThreshold),
                      vipDiscountPercent: Number(storeForm.vipDiscountPercent),
                      contactEmail: storeForm.contactEmail,
                      contactPhone: storeForm.contactPhone,
                      instagramHandle: storeForm.instagramHandle,
                      youtubeHandle: storeForm.youtubeHandle,
                      linktreeUrl: storeForm.linktreeUrl,
                      storeMode: storeForm.storeMode as StoreSettings['storeMode'],
                      adminPassword: storeForm.newAdminPassword
                    });
                    setStoreForm(prev => ({ ...prev, newAdminPassword: '', confirmAdminPassword: '' }));
                    showToast('Store settings & admin passkey updated! 🔒');
                    return;
                  }

                  updateStoreSettings({
                    storeName: storeForm.storeName,
                    tagline: storeForm.tagline,
                    heroHeadline: storeForm.heroHeadline,
                    heroSubtitle: storeForm.heroSubtitle,
                    announcementText: storeForm.announcementText,
                    freeShippingThreshold: Number(storeForm.freeShippingThreshold),
                    vipDiscountPercent: Number(storeForm.vipDiscountPercent),
                    contactEmail: storeForm.contactEmail,
                    contactPhone: storeForm.contactPhone,
                    instagramHandle: storeForm.instagramHandle,
                    youtubeHandle: storeForm.youtubeHandle,
                    linktreeUrl: storeForm.linktreeUrl,
                    storeMode: storeForm.storeMode as StoreSettings['storeMode']
                  });
                }}
                className="space-y-6"
              >
                {/* 1. Store Operational Mode */}
                <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 shadow-xs space-y-4">
                  <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#db2777] flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Store Status &amp; Operation Mode</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'live', label: 'Live Store', desc: 'Full shopping bag, checkout & inventory open' },
                      { id: 'vip_exclusive', label: 'VIP Exclusive Drop', desc: 'Priority access for newsletter & waitlist' },
                      { id: 'maintenance', label: 'Maintenance Drop', desc: 'Temporary hold for next drop launch' }
                    ].map(mode => (
                      <label
                        key={mode.id}
                        className={`p-3.5 border rounded-lg cursor-pointer transition-all flex flex-col justify-between ${
                          storeForm.storeMode === mode.id
                            ? 'bg-[#fdf2f8] border-[#ec4899] ring-1 ring-[#ec4899]'
                            : 'bg-[#fff8fa] border-[#fbcfe8] hover:border-[#db2777]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217]">
                            {mode.label}
                          </span>
                          <input
                            type="radio"
                            name="storeMode"
                            value={mode.id}
                            checked={storeForm.storeMode === mode.id}
                            onChange={() => setStoreForm({ ...storeForm, storeMode: mode.id as StoreSettings['storeMode'] })}
                            className="accent-[#ec4899]"
                          />
                        </div>
                        <span className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                          {mode.desc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Announcements & Shipping */}
                <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 shadow-xs space-y-4">
                  <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#db2777] flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span>Announcement Bar &amp; Free Shipping Threshold</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Top Announcement Bar Message
                      </label>
                      <input
                        type="text"
                        value={storeForm.announcementText}
                        onChange={e => setStoreForm({ ...storeForm, announcementText: e.target.value })}
                        placeholder="e.g. ICONIQUE BABE IS HERE | SHOP THE PINK DROP 🎀"
                        className="w-full px-3 py-2.5 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Free Shipping Threshold ($ USD)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={storeForm.freeShippingThreshold}
                        onChange={e => setStoreForm({ ...storeForm, freeShippingThreshold: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Hero Campaign Copy */}
                <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 shadow-xs space-y-4">
                  <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#db2777] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Hero Campaign &amp; Slogan</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Hero Main Headline
                      </label>
                      <input
                        type="text"
                        value={storeForm.heroHeadline}
                        onChange={e => setStoreForm({ ...storeForm, heroHeadline: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Brand Tagline
                      </label>
                      <input
                        type="text"
                        value={storeForm.tagline}
                        onChange={e => setStoreForm({ ...storeForm, tagline: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                      Hero Subtitle Description
                    </label>
                    <textarea
                      rows={2}
                      value={storeForm.heroSubtitle}
                      onChange={e => setStoreForm({ ...storeForm, heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                    />
                  </div>
                </div>

                {/* 4. Social Links & Contact Information */}
                <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 shadow-xs space-y-4">
                  <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#db2777] flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Social Channels &amp; Customer Support</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={storeForm.instagramHandle}
                        onChange={e => setStoreForm({ ...storeForm, instagramHandle: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        YouTube Channel
                      </label>
                      <input
                        type="text"
                        value={storeForm.youtubeHandle}
                        onChange={e => setStoreForm({ ...storeForm, youtubeHandle: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Linktree Profile URL
                      </label>
                      <input
                        type="text"
                        value={storeForm.linktreeUrl}
                        onChange={e => setStoreForm({ ...storeForm, linktreeUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Customer Inquiries Email
                      </label>
                      <input
                        type="email"
                        value={storeForm.contactEmail}
                        onChange={e => setStoreForm({ ...storeForm, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        VIP Concierge Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={storeForm.contactPhone}
                        onChange={e => setStoreForm({ ...storeForm, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Admin Passkey Security */}
                <div className="bg-gradient-to-b from-white to-[#fff8fa] border border-[#fbcfe8] rounded-xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#db2777] flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Administrative Security &amp; Passkey Protection</span>
                    </h4>
                    <span className="text-[10px] font-mono-typewriter uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                      Protected
                    </span>
                  </div>
                  <p className="font-sans-editorial text-xs text-[#4a1829]/70">
                    To change the administrative master passkey, enter the new password below. Leave blank to keep current passkey.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        New Admin Password
                      </label>
                      <input
                        type="password"
                        value={storeForm.newAdminPassword}
                        onChange={e => setStoreForm({ ...storeForm, newAdminPassword: e.target.value })}
                        placeholder="Leave blank to keep unchanged"
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-white rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                        Confirm New Admin Password
                      </label>
                      <input
                        type="password"
                        value={storeForm.confirmAdminPassword}
                        onChange={e => setStoreForm({ ...storeForm, confirmAdminPassword: e.target.value })}
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-white rounded-xs outline-none focus:border-[#db2777]"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer shadow-lg flex items-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Store Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Header with Search and Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#fbcfe8]">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#db2777]" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    placeholder="Search by order ID, customer name, email..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] rounded-xs bg-[#fff8fa] outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1 text-xs font-mono-typewriter uppercase rounded-full border transition-all cursor-pointer ${
                        orderStatusFilter === st
                          ? 'bg-[#ec4899] text-white border-[#db2777] font-bold'
                          : 'bg-white border-[#fbcfe8] text-[#4a1829]/70 hover:text-[#db2777]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fdf2f8] text-[#db2777] font-mono-typewriter uppercase border-b border-[#fbcfe8]">
                        <th className="p-3.5 font-bold">Order ID</th>
                        <th className="p-3.5 font-bold">Customer</th>
                        <th className="p-3.5 font-bold">Items</th>
                        <th className="p-3.5 font-bold">Total</th>
                        <th className="p-3.5 font-bold">Status</th>
                        <th className="p-3.5 font-bold">Tracking</th>
                        <th className="p-3.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#fbcfe8]">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-xs font-mono-typewriter text-[#4a1829]/60">
                            No orders found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(ord => (
                          <tr key={ord.id} className="hover:bg-[#fff8fa] transition-colors">
                            <td className="p-3.5 font-mono-typewriter font-bold text-[#db2777]">
                              {ord.id}
                              <div className="text-[10px] text-[#4a1829]/50 font-normal">
                                {new Date(ord.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="p-3.5 font-sans-editorial">
                              <p className="font-semibold text-[#1f1217]">{ord.customerName}</p>
                              <p className="text-[11px] text-[#4a1829]/60">{ord.email}</p>
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              {ord.items.length} item{ord.items.length > 1 ? 's' : ''}
                            </td>
                            <td className="p-3.5 font-mono-typewriter font-bold text-[#1f1217]">
                              {formatPrice(ord.total)}
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              <select
                                value={ord.status}
                                onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                className={`text-[11px] font-mono-typewriter uppercase px-2 py-1 rounded-xs border outline-none cursor-pointer font-bold ${getStatusColor(
                                  ord.status
                                )}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-3.5 font-mono-typewriter text-xs text-[#4a1829]/75">
                              {ord.trackingNumber ? (
                                <span className="text-[#0284c7] font-semibold">{ord.trackingNumber}</span>
                              ) : (
                                <button
                                  onClick={() => {
                                    const trk = prompt('Enter tracking number (e.g. FDX-882910US):');
                                    if (trk) updateOrderStatus(ord.id, 'Shipped', trk);
                                  }}
                                  className="text-[11px] text-[#db2777] underline cursor-pointer"
                                >
                                  + Add Tracking
                                </button>
                              )}
                            </td>
                            <td className="p-3.5 text-right font-mono-typewriter space-x-2">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="px-2.5 py-1 bg-white border border-[#fbcfe8] hover:bg-[#fdf2f8] text-[#db2777] text-xs uppercase rounded-xs cursor-pointer font-bold"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete order ${ord.id}?`)) {
                                    deleteOrder(ord.id);
                                  }
                                }}
                                className="p-1 text-[#db2777] hover:text-rose-700 cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Detail Modal */}
              {selectedOrder && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241019]/60 backdrop-blur-xs select-none"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="bg-white max-w-xl w-full border border-[#fbcfe8] rounded-xl p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#fbcfe8]">
                      <div>
                        <span className="font-mono-typewriter text-xs font-bold text-[#db2777]">
                          Order Details // {selectedOrder.id}
                        </span>
                        <p className="text-xs text-[#4a1829]/60 font-sans-editorial">
                          Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="p-1 text-[#1f1217] hover:text-[#db2777] cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Customer & Shipping */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-sans-editorial bg-[#fff8fa] p-3.5 border border-[#fbcfe8] rounded-xs">
                      <div>
                        <p className="font-mono-typewriter text-[11px] uppercase font-bold text-[#db2777]">Customer</p>
                        <p className="font-bold text-[#1f1217] mt-1">{selectedOrder.customerName}</p>
                        <p className="text-[#4a1829]/75">{selectedOrder.email}</p>
                        <p className="text-[#4a1829]/75">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="font-mono-typewriter text-[11px] uppercase font-bold text-[#db2777]">Ship To</p>
                        <p className="text-[#1f1217] mt-1">{selectedOrder.address}</p>
                        <p className="text-[#1f1217]">
                          {selectedOrder.city}, {selectedOrder.state} {selectedOrder.zip}
                        </p>
                        <p className="text-[#1f1217]">{selectedOrder.country}</p>
                      </div>
                    </div>

                    {/* Items List */}
                    <div>
                      <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] mb-2">
                        Ordered Items ({selectedOrder.items.length})
                      </h4>
                      <div className="divide-y divide-[#fbcfe8] max-h-48 overflow-y-auto">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.image}
                                alt={item.productTitle}
                                className="w-10 h-12 object-cover border border-[#fbcfe8] rounded-2xs"
                              />
                              <div>
                                <p className="font-mono-typewriter text-xs font-bold text-[#1f1217]">
                                  {item.productTitle}
                                </p>
                                <p className="text-[11px] text-[#db2777] font-mono-typewriter">
                                  {item.color} · Size: {item.size} · Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono-typewriter text-xs font-bold text-[#1f1217]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="pt-3 border-t border-[#fbcfe8] flex justify-between items-center font-mono-typewriter text-xs">
                      <span className="font-bold text-[#1f1217]">Total Paid:</span>
                      <span className="text-base font-bold text-[#db2777]">
                        {formatPrice(selectedOrder.total)}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const orderId = selectedOrder.id;
                          setSelectedOrder(null);
                          setIsAdminOpen(false);
                          openTrackingModal(orderId);
                        }}
                        className="px-3.5 py-2 bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] hover:bg-[#fbcfe8] font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Client Tracker View</span>
                      </button>

                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="px-4 py-2 bg-[#ec4899] text-white font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer hover:bg-[#db2777] shadow-xs"
                      >
                        Close View
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EMAIL SUBSCRIBERS & MARKETING INTEGRATION */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#fbcfe8]">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#db2777]" />
                  <input
                    type="text"
                    value={subscriberSearch}
                    onChange={e => setSubscriberSearch(e.target.value)}
                    placeholder="Search subscribers by email or name..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] rounded-xs bg-[#fff8fa] outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportSubscribersCSV}
                    className="px-3.5 py-2 bg-white border border-[#fbcfe8] hover:bg-[#fdf2f8] text-[#db2777] font-mono-typewriter text-xs uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setIsComposerOpen(true)}
                    className="px-4 py-2 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 font-bold shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Compose Broadcast</span>
                  </button>
                </div>
              </div>

              {/* Manual Add Subscriber Form */}
              <form
                onSubmit={handleAddSubscriberSubmit}
                className="bg-white p-4 rounded-xl border border-[#fbcfe8] flex flex-col sm:flex-row items-center gap-3"
              >
                <span className="font-mono-typewriter text-xs uppercase text-[#db2777] font-bold shrink-0">
                  + Add Subscriber:
                </span>
                <input
                  type="email"
                  required
                  placeholder="subscriber@example.com"
                  value={newSubEmail}
                  onChange={e => setNewSubEmail(e.target.value)}
                  className="flex-1 w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                />
                <input
                  type="text"
                  placeholder="Customer Name (optional)"
                  value={newSubName}
                  onChange={e => setNewSubName(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-[#db2777] text-white hover:bg-[#be185d] font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>

              {/* Subscribers Table */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fdf2f8] text-[#db2777] font-mono-typewriter uppercase border-b border-[#fbcfe8]">
                        <th className="p-3.5 font-bold">Email</th>
                        <th className="p-3.5 font-bold">Name</th>
                        <th className="p-3.5 font-bold">Acquisition Source</th>
                        <th className="p-3.5 font-bold">Date Joined</th>
                        <th className="p-3.5 font-bold">Status</th>
                        <th className="p-3.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#fbcfe8]">
                      {filteredSubscribers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-xs font-mono-typewriter text-[#4a1829]/60">
                            No subscribers found.
                          </td>
                        </tr>
                      ) : (
                        filteredSubscribers.map(sub => (
                          <tr key={sub.id} className="hover:bg-[#fff8fa] transition-colors">
                            <td className="p-3.5 font-mono-typewriter font-bold text-[#1f1217]">
                              {sub.email}
                            </td>
                            <td className="p-3.5 font-sans-editorial text-[#4a1829]/80">
                              {sub.name || '—'}
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8]">
                                {sub.source}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono-typewriter text-[#4a1829]/60">
                              {new Date(sub.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  sub.status === 'Active'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-zinc-100 text-zinc-600'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right font-mono-typewriter space-x-2">
                              <button
                                onClick={() => toggleSubscriberStatus(sub.id)}
                                className="text-[11px] text-[#db2777] hover:underline cursor-pointer font-bold"
                              >
                                {sub.status === 'Active' ? 'Unsubscribe' : 'Reactivate'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove ${sub.email} from subscribers?`)) {
                                    deleteSubscriber(sub.id);
                                  }
                                }}
                                className="p-1 text-[#db2777] hover:text-rose-700 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Past Campaigns History */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl p-6 shadow-xs">
                <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-3">
                  Campaign Broadcast History ({campaigns.length})
                </h4>
                <div className="space-y-3">
                  {campaigns.map(camp => (
                    <div
                      key={camp.id}
                      className="p-4 border border-[#fbcfe8] rounded-xs bg-[#fff8fa] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-typewriter text-xs font-bold text-[#1f1217]">
                            {camp.subject}
                          </span>
                          <span className="text-[9px] font-mono-typewriter uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                            Sent to {camp.recipientCount} VIPs
                          </span>
                        </div>
                        <p className="font-sans-editorial text-xs text-[#4a1829]/75 mt-1 line-clamp-1">
                          {camp.message}
                        </p>
                        {camp.discountCode && (
                          <span className="inline-block mt-1 font-mono-typewriter text-[10px] text-[#db2777] font-bold">
                            Promo Attached: {camp.discountCode}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono-typewriter text-[#4a1829]/50 shrink-0">
                        {new Date(camp.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Composer Modal */}
              {isComposerOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241019]/65 backdrop-blur-xs select-none"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="bg-white max-w-2xl w-full border border-[#fbcfe8] rounded-xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#fbcfe8]">
                      <div>
                        <span className="font-mono-typewriter text-xs font-bold text-[#db2777] uppercase">
                          Email Marketing Studio // @iconiquebabe
                        </span>
                        <h3 className="font-mono-typewriter text-lg uppercase font-bold text-[#1f1217]">
                          Broadcast VIP Campaign
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsComposerOpen(false)}
                        className="p-1 text-[#1f1217] hover:text-[#db2777] cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSendCampaign} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                          Email Subject Line *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 🎀 SECRET DROP: Liquid Pink Latex Bodysuit Restocked"
                          value={emailSubject}
                          onChange={e => setEmailSubject(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                          Preview Header Snippet
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Exclusive 24-hour private window for @iconiquebabe VIPs."
                          value={emailPreview}
                          onChange={e => setEmailPreview(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                          Message Body *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Write your luxury announcement, lookbook release details, or styling tips..."
                          value={emailMessage}
                          onChange={e => setEmailMessage(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                          Exclusive Discount Code (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ICONIQUE15"
                          value={emailPromoCode}
                          onChange={e => setEmailPromoCode(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                        />
                      </div>

                      {/* Live Email Preview Box */}
                      <div className="p-4 bg-[#fdf2f8] border border-[#fbcfe8] rounded-xs space-y-2">
                        <span className="text-[10px] font-mono-typewriter uppercase text-[#db2777] font-bold">
                          Live Email Client Preview
                        </span>
                        <div className="bg-white p-4 border border-[#fbcfe8] rounded-xs space-y-2">
                          <p className="font-mono-typewriter text-xs font-bold text-[#1f1217]">
                            {emailSubject || 'Subject line preview will appear here'}
                          </p>
                          <p className="font-sans-editorial text-xs text-[#4a1829]/80 leading-relaxed">
                            {emailMessage || 'Your luxury email campaign message preview will show up here.'}
                          </p>
                          {emailPromoCode && (
                            <div className="p-2 bg-[#fdf2f8] text-[#db2777] font-mono-typewriter text-xs font-bold text-center border border-[#fbcfe8] rounded-xs">
                              PROMO CODE: {emailPromoCode} (15% OFF)
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-mono-typewriter text-xs text-[#4a1829]/70">
                          Recipients: <strong>{activeSubscribersCount} Active VIPs</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsComposerOpen(false)}
                            className="px-4 py-2 border border-[#fbcfe8] text-[#1f1217] hover:bg-[#fdf2f8] font-mono-typewriter text-xs uppercase rounded-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer shadow-md flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Broadcast Now</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INVENTORY CRUD OPERATIONS */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#fbcfe8]">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#db2777]" />
                  <input
                    type="text"
                    value={inventorySearch}
                    onChange={e => setInventorySearch(e.target.value)}
                    placeholder="Search inventory by title or category..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] rounded-xs bg-[#fff8fa] outline-none focus:border-[#db2777]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (confirm('Reset catalog back to default Iconique Babe products?')) {
                        resetProducts();
                      }
                    }}
                    className="px-3.5 py-2 bg-white border border-[#fbcfe8] hover:bg-[#fdf2f8] text-[#4a1829]/80 font-mono-typewriter text-xs uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Reset to default initial products"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Catalog</span>
                  </button>

                  <button
                    onClick={() => handleOpenProductModal()}
                    className="px-4 py-2 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 font-bold shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Product</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#fdf2f8] text-[#db2777] font-mono-typewriter uppercase border-b border-[#fbcfe8]">
                        <th className="p-3.5 font-bold">Image</th>
                        <th className="p-3.5 font-bold">Title</th>
                        <th className="p-3.5 font-bold">Category</th>
                        <th className="p-3.5 font-bold">Price</th>
                        <th className="p-3.5 font-bold">Badge</th>
                        <th className="p-3.5 font-bold">Sizes</th>
                        <th className="p-3.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#fbcfe8]">
                      {filteredInventory.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-xs font-mono-typewriter text-[#4a1829]/60">
                            No products found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredInventory.map(prod => (
                          <tr key={prod.id} className="hover:bg-[#fff8fa] transition-colors">
                            <td className="p-3.5">
                              <img
                                src={prod.defaultImage}
                                alt={prod.title}
                                className="w-12 h-16 object-cover border border-[#fbcfe8] rounded-2xs"
                              />
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              <p className="font-bold text-[#1f1217]">{prod.title}</p>
                              <p className="text-[10px] text-[#4a1829]/50">{prod.handle}</p>
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8]">
                                {prod.category}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono-typewriter font-bold text-[#1f1217]">
                              {formatPrice(prod.price)}
                            </td>
                            <td className="p-3.5 font-mono-typewriter">
                              {prod.badge ? (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#ec4899] text-white">
                                  {prod.badge}
                                </span>
                              ) : (
                                <span className="text-[#4a1829]/40">—</span>
                              )}
                            </td>
                            <td className="p-3.5 font-mono-typewriter text-[11px] text-[#4a1829]/75">
                              {prod.availableSizes.join(', ')}
                            </td>
                            <td className="p-3.5 text-right font-mono-typewriter space-x-2">
                              <button
                                onClick={() => handleOpenProductModal(prod)}
                                className="px-2.5 py-1 bg-white border border-[#fbcfe8] hover:bg-[#fdf2f8] text-[#db2777] text-xs uppercase rounded-xs cursor-pointer font-bold inline-flex items-center gap-1"
                                title="Edit Product"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${prod.title}" from catalog?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1 text-[#db2777] hover:text-rose-700 cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Create / Edit Modal */}
              {isProductModalOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241019]/65 backdrop-blur-xs select-none"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="bg-white max-w-2xl w-full border border-[#fbcfe8] rounded-xl p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#fbcfe8]">
                      <div>
                        <span className="font-mono-typewriter text-xs font-bold text-[#db2777] uppercase">
                          Inventory CRUD Studio
                        </span>
                        <h3 className="font-mono-typewriter text-lg uppercase font-bold text-[#1f1217]">
                          {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsProductModalOpen(false)}
                        className="p-1 text-[#1f1217] hover:text-[#db2777] cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProduct} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Product Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sculpted Liquid Pink Corset"
                            value={productForm.title}
                            onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Price (USD) *
                          </label>
                          <input
                            type="number"
                            required
                            min={1}
                            placeholder="195"
                            value={productForm.price}
                            onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-xs font-mono-typewriter border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Category *
                          </label>
                          <select
                            value={productForm.category}
                            onChange={e =>
                              setProductForm({ ...productForm, category: e.target.value as Product['category'] })
                            }
                            className="w-full px-3 py-2 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          >
                            <option value="LATEX">LATEX</option>
                            <option value="COATS + JACKETS">COATS + JACKETS</option>
                            <option value="DRESSES">DRESSES</option>
                            <option value="DENIM">DENIM</option>
                            <option value="SHOES">SHOES</option>
                            <option value="ACCESSORIES">ACCESSORIES</option>
                            <option value="ALL">ALL</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Badge (e.g. SIGNATURE DROP, BESTSELLER)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. VIP EXCLUSIVE"
                            value={productForm.badge}
                            onChange={e => setProductForm({ ...productForm, badge: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Primary Image URL *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="https://... or /src/assets/..."
                            value={productForm.defaultImage}
                            onChange={e => setProductForm({ ...productForm, defaultImage: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Available Sizes (comma-separated)
                          </label>
                          <input
                            type="text"
                            placeholder="XXS, XS, S, M, L, XL"
                            value={productForm.availableSizes}
                            onChange={e => setProductForm({ ...productForm, availableSizes: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Colorway Name
                          </label>
                          <input
                            type="text"
                            placeholder="Baby Pink, Pure White..."
                            value={productForm.colorName}
                            onChange={e => setProductForm({ ...productForm, colorName: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                            Color Swatch Hex
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={productForm.colorHex}
                              onChange={e => setProductForm({ ...productForm, colorHex: e.target.value })}
                              className="w-9 h-9 p-0 border border-[#fbcfe8] rounded-xs cursor-pointer"
                            />
                            <input
                              type="text"
                              value={productForm.colorHex}
                              onChange={e => setProductForm({ ...productForm, colorHex: e.target.value })}
                              className="flex-1 px-3 py-2 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-typewriter uppercase font-bold text-[#1f1217] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={productForm.description}
                          onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                          className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] rounded-xs outline-none focus:border-[#db2777]"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#fbcfe8]">
                        <button
                          type="button"
                          onClick={() => setIsProductModalOpen(false)}
                          className="px-4 py-2 border border-[#fbcfe8] text-[#1f1217] hover:bg-[#fdf2f8] font-mono-typewriter text-xs uppercase rounded-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#ec4899] hover:bg-[#db2777] text-white font-mono-typewriter text-xs uppercase font-bold rounded-xs cursor-pointer shadow-md"
                        >
                          {editingProduct ? 'Save Changes' : 'Create Product'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
