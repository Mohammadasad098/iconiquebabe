import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CustomerOrder, OrderStatus } from '../types/admin';
import {
  X,
  Search,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { KhyLogo } from './KhyLogo';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    trackingInitialQuery,
    orders,
    formatPrice,
    showToast
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<CustomerOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // When opened with an initial query (e.g., from checkout completion or order detail click)
  useEffect(() => {
    if (isTrackingOpen) {
      if (trackingInitialQuery) {
        setSearchQuery(trackingInitialQuery);
        findAndSetOrder(trackingInitialQuery);
      } else if (!activeOrder && orders.length > 0) {
        // Pre-fill with the first/most recent order as a helpful starter
        setSearchQuery(orders[0].id);
        setActiveOrder(orders[0]);
        setHasSearched(true);
      }
    }
  }, [isTrackingOpen, trackingInitialQuery, orders]);

  if (!isTrackingOpen) return null;

  const findAndSetOrder = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setActiveOrder(null);
      setHasSearched(false);
      return;
    }

    const matched = orders.find(ord => {
      const idMatch = ord.id.toLowerCase().includes(q) || ord.id.replace('#', '').toLowerCase().includes(q);
      const trackingMatch = ord.trackingNumber && ord.trackingNumber.toLowerCase().includes(q);
      const emailMatch = ord.email.toLowerCase() === q;
      const nameMatch = ord.customerName.toLowerCase().includes(q);
      return idMatch || trackingMatch || emailMatch || nameMatch;
    });

    setActiveOrder(matched || null);
    setHasSearched(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findAndSetOrder(searchQuery);
  };

  const handleCopyTracking = (trackingNum: string) => {
    navigator.clipboard.writeText(trackingNum);
    setCopiedTracking(true);
    showToast(`Copied tracking number: ${trackingNum} 📋`);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleSelectDemo = (ord: CustomerOrder) => {
    setSearchQuery(ord.id);
    setActiveOrder(ord);
    setHasSearched(true);
  };

  // Determine stage progress (1 to 5)
  const getStepStatus = (orderStatus: OrderStatus) => {
    switch (orderStatus) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 5;
      case 'Cancelled':
        return 0;
      default:
        return 2;
    }
  };

  const currentStep = activeOrder ? getStepStatus(activeOrder.status) : 0;

  // Carrier determination from tracking number prefix or fallback
  const getCarrierInfo = (trackingNum?: string) => {
    if (!trackingNum) return { name: 'ICONIQUE Express White-Glove', service: 'Air Freight Priority' };
    if (trackingNum.startsWith('FDX')) return { name: 'FedEx Express Worldwide', service: 'Priority Overnight / Int.' };
    if (trackingNum.startsWith('DHL')) return { name: 'DHL Express Luxury Network', service: 'Express Worldwide Air' };
    if (trackingNum.startsWith('UPS')) return { name: 'UPS Worldwide Saver', service: 'Express Carbon Neutral' };
    return { name: 'Global Luxury Courier', service: 'Direct Signature Required' };
  };

  const carrier = getCarrierInfo(activeOrder?.trackingNumber);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto select-none bg-[#241019]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-7"
      role="dialog"
      aria-modal="true"
      aria-label="Order Tracking & Logistics Portal"
    >
      <div className="w-full max-w-3xl bg-[#fff8fa] border border-[#fbcfe8] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[#1f1217] max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-[#fbcfe8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <KhyLogo variant="pink" size="sm" />
            <div className="h-4 w-px bg-[#fbcfe8]" />
            <div>
              <h2 className="font-mono-typewriter text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1f1217] flex items-center gap-2">
                <span>Client Order &amp; Delivery Tracking</span>
                <span className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
              </h2>
              <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                Live worldwide concierge logistics by @iconiquebabe
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#fdf2f8] text-[#1f1217] hover:text-[#db2777] transition-colors cursor-pointer"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Demo Pills */}
        <div className="bg-[#fdf2f8] p-4 sm:p-6 border-b border-[#fbcfe8] shrink-0">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#db2777]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. #ICONIQUE-892104) or Tracking Number..."
                className="w-full pl-10 pr-4 py-2.5 text-xs font-mono-typewriter uppercase border border-[#fbcfe8] bg-white rounded-xs outline-none focus:border-[#db2777] shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#ec4899] hover:bg-[#db2777] text-white text-xs font-mono-typewriter uppercase font-bold rounded-xs cursor-pointer shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </form>

          {/* Quick Demo Pickers */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-[11px] font-mono-typewriter">
            <span className="text-[#4a1829]/65 uppercase font-medium">Quick Demo:</span>
            {orders.slice(0, 3).map(ord => (
              <button
                key={ord.id}
                type="button"
                onClick={() => handleSelectDemo(ord)}
                className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer font-semibold ${
                  activeOrder?.id === ord.id
                    ? 'bg-[#ec4899] text-white border-[#db2777]'
                    : 'bg-white text-[#db2777] border-[#fbcfe8] hover:bg-white/80'
                }`}
              >
                {ord.id} ({ord.status})
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeOrder ? (
            <div className="space-y-6">
              {/* Top Order Hero Card */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-mono-typewriter text-lg font-bold text-[#db2777]">
                      {activeOrder.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono-typewriter uppercase px-2.5 py-0.5 rounded-full border font-bold ${
                        activeOrder.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : activeOrder.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : activeOrder.status === 'Processing'
                          ? 'bg-pink-100 text-[#db2777] border-pink-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {activeOrder.status}
                    </span>
                  </div>
                  <p className="font-sans-editorial text-xs text-[#4a1829]/75">
                    Ordered by <strong>{activeOrder.customerName}</strong> on {new Date(activeOrder.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </p>
                  <p className="font-sans-editorial text-xs text-[#4a1829]/60 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ec4899]" />
                    <span>Delivering to: {activeOrder.city}, {activeOrder.state} {activeOrder.zip}, {activeOrder.country}</span>
                  </p>
                </div>

                {/* Carrier & Tracking badge */}
                <div className="p-3.5 bg-[#fdf2f8] border border-[#fbcfe8] rounded-lg sm:text-right shrink-0">
                  <span className="text-[10px] font-mono-typewriter uppercase text-[#4a1829]/70 font-semibold block">
                    {carrier.name}
                  </span>
                  {activeOrder.trackingNumber ? (
                    <div className="flex items-center sm:justify-end gap-2 mt-1">
                      <span className="font-mono-typewriter text-xs font-bold text-[#1f1217]">
                        {activeOrder.trackingNumber}
                      </span>
                      <button
                        onClick={() => handleCopyTracking(activeOrder.trackingNumber!)}
                        className="p-1 hover:bg-white rounded-xs text-[#db2777] cursor-pointer transition-colors"
                        title="Copy tracking number"
                      >
                        {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono-typewriter text-xs text-[#db2777] italic mt-1 block">
                      Carrier label generating
                    </span>
                  )}
                  <span className="text-[10px] text-[#db2777] font-mono-typewriter block mt-1">
                    {activeOrder.status === 'Delivered'
                      ? 'Package Signed & Delivered'
                      : 'Estimated: 2–3 Business Days'}
                  </span>
                </div>
              </div>

              {/* Visual Delivery Stepper Timeline */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 sm:p-7 shadow-xs">
                <h3 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ec4899]" />
                  <span>Shipment Milestone Timeline</span>
                </h3>

                <div className="relative">
                  {/* Connecting Line */}
                  <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-[#fce7f3] -translate-y-1/2 z-0" />
                  <div
                    className="hidden md:block absolute top-1/2 left-8 h-1 bg-[#ec4899] -translate-y-1/2 z-0 transition-all duration-700"
                    style={{
                      width:
                        currentStep === 1
                          ? '12%'
                          : currentStep === 2
                          ? '38%'
                          : currentStep === 3
                          ? '65%'
                          : currentStep >= 4
                          ? '90%'
                          : '0%'
                    }}
                  />

                  {/* 4 Key Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                    {/* Step 1 */}
                    <div className="flex md:flex-col items-center gap-3 md:text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-mono-typewriter text-xs font-bold ${
                          currentStep >= 1
                            ? 'bg-[#ec4899] text-white border-[#db2777] shadow-md'
                            : 'bg-white text-gray-400 border-gray-200'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217]">
                          Order Placed
                        </p>
                        <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                          Payment Verified &amp; Received
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex md:flex-col items-center gap-3 md:text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-mono-typewriter text-xs font-bold ${
                          currentStep >= 2
                            ? 'bg-[#ec4899] text-white border-[#db2777] shadow-md'
                            : 'bg-white text-gray-400 border-gray-200'
                        }`}
                      >
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217]">
                          Hand-Tailored
                        </p>
                        <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                          Packed in Luxury Silk Box
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex md:flex-col items-center gap-3 md:text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-mono-typewriter text-xs font-bold ${
                          currentStep >= 3
                            ? 'bg-[#ec4899] text-white border-[#db2777] shadow-md'
                            : 'bg-white text-gray-400 border-gray-200'
                        }`}
                      >
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217]">
                          In Transit
                        </p>
                        <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                          With {carrier.name.split(' ')[0]} Air
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex md:flex-col items-center gap-3 md:text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 font-mono-typewriter text-xs font-bold ${
                          currentStep >= 5
                            ? 'bg-[#ec4899] text-white border-[#db2777] shadow-md'
                            : 'bg-white text-gray-400 border-gray-200'
                        }`}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217]">
                          Delivered
                        </p>
                        <p className="font-sans-editorial text-[11px] text-[#4a1829]/65">
                          Signed &amp; At Doorstep
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="bg-white border border-[#fbcfe8] rounded-xl p-5 sm:p-6 shadow-xs">
                <h3 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-4 pb-2 border-b border-[#fbcfe8] flex items-center justify-between">
                  <span>Purchased Pieces ({activeOrder.items.length})</span>
                  <span className="text-[11px] text-[#db2777] font-semibold font-mono-typewriter">
                    Paid via {activeOrder.paymentMethod}
                  </span>
                </h3>

                <div className="space-y-3 divide-y divide-[#fbcfe8]">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.image}
                          alt={item.productTitle}
                          className="w-12 h-14 object-cover border border-[#fbcfe8] rounded-xs shrink-0"
                        />
                        <div>
                          <p className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217]">
                            {item.productTitle}
                          </p>
                          <p className="font-sans-editorial text-[11px] text-[#db2777] mt-0.5">
                            Color: {item.color} · Size: {item.size} · Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono-typewriter text-xs font-bold text-[#1f1217] shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Totals */}
                <div className="mt-5 pt-4 border-t border-[#fbcfe8] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#fdf2f8] rounded-xs border border-[#fbcfe8] text-xs font-sans-editorial text-[#4a1829]/75 space-y-1">
                    <p className="font-mono-typewriter uppercase text-[10px] text-[#db2777] font-bold">
                      Luxury Packaging Note
                    </p>
                    <p className="text-[11px]">
                      Complimentary scented Italian dust bag and embossed gift keepsake box included with every shipment.
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono-typewriter text-right">
                    <div className="flex justify-between text-[#4a1829]/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(activeOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#4a1829]/70">
                      <span>Express Shipping</span>
                      <span className="text-emerald-600 font-bold">
                        {activeOrder.shipping === 0 ? 'FREE' : formatPrice(activeOrder.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#4a1829]/70">
                      <span>Sales Tax</span>
                      <span>{formatPrice(activeOrder.tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#db2777] pt-2 border-t border-[#fbcfe8]">
                      <span>Total Paid</span>
                      <span>{formatPrice(activeOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Concierge Support Footer Bar */}
              <div className="p-4 bg-gradient-to-r from-[#fdf2f8] to-white border border-[#fbcfe8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans-editorial text-[#4a1829]/80">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#ec4899] shrink-0" />
                  <span>Have questions about your delivery or want to reschedule?</span>
                </div>
                <a
                  href="mailto:babe@iconiquebabe.com"
                  className="font-mono-typewriter text-xs uppercase font-bold text-[#db2777] hover:underline shrink-0"
                >
                  Contact VIP Concierge &rarr;
                </a>
              </div>
            </div>
          ) : hasSearched ? (
            /* Not Found State */
            <div className="py-12 px-6 text-center bg-white border border-[#fbcfe8] rounded-xl">
              <AlertCircle className="w-12 h-12 text-[#db2777] mx-auto mb-3" />
              <h3 className="font-mono-typewriter text-base uppercase font-bold text-[#1f1217]">
                Order Not Found
              </h3>
              <p className="font-sans-editorial text-xs text-[#4a1829]/70 max-w-md mx-auto mt-1 mb-6">
                We couldn't locate an order matching <strong>"{searchQuery}"</strong>. Please verify the order number in your confirmation email or click one of the demo orders above.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (orders.length > 0) handleSelectDemo(orders[0]);
                }}
                className="px-5 py-2.5 bg-[#ec4899] hover:bg-[#db2777] text-white text-xs font-mono-typewriter uppercase font-bold rounded-xs cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <span>View Demo Order #{orders[0]?.id || '892104'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Initial Empty State */
            <div className="py-12 px-6 text-center bg-white border border-[#fbcfe8] rounded-xl">
              <Truck className="w-12 h-12 text-[#ec4899] mx-auto mb-3" />
              <h3 className="font-mono-typewriter text-base uppercase font-bold text-[#1f1217]">
                Track Your Luxury Delivery
              </h3>
              <p className="font-sans-editorial text-xs text-[#4a1829]/70 max-w-md mx-auto mt-1">
                Enter your order number or tracking code in the search bar above to see live updates, estimated delivery dates, and package status.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-white border-t border-[#fbcfe8] flex items-center justify-between text-xs font-mono-typewriter shrink-0">
          <span className="text-[#4a1829]/60 text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Express Tracking Guard</span>
          </span>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="px-4 py-1.5 bg-[#fdf2f8] hover:bg-[#ec4899] hover:text-white border border-[#fbcfe8] text-[#db2777] rounded-xs uppercase font-bold transition-all cursor-pointer text-xs"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
