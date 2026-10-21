import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle, Lock, Truck } from 'lucide-react';
import { KhyLogo } from './KhyLogo';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    freeShippingQualified,
    formatPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    showToast,
    addCustomerOrder,
    openTrackingModal
  } = useShop();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '•••'
  });

  if (!isCheckoutOpen) return null;

  const shippingCost = freeShippingQualified ? 0 : 15;
  const estimatedTax = Math.round(subtotal * 0.0825);
  const total = subtotal + shippingCost + estimatedTax;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const placedOrder = addCustomerOrder({
        customerName: `${formData.firstName} ${formData.lastName}`.trim() || 'Iconic Babe Customer',
        email: formData.email || 'customer@example.com',
        address: formData.address || '100 Sunset Blvd',
        city: formData.city || 'Los Angeles',
        state: formData.state || 'CA',
        zip: formData.zip || '90028',
        country: 'United States',
        items: cart.map(i => ({
          productId: i.product.id,
          productTitle: i.product.title,
          image: i.product.defaultImage,
          price: i.product.price,
          color: i.color,
          size: i.size,
          quantity: i.quantity
        })),
        subtotal,
        shipping: shippingCost,
        tax: estimatedTax,
        total,
        status: 'Pending',
        paymentMethod: 'Credit Card (•••• 4242)'
      });

      setOrderNumber(placedOrder.id);
      setIsProcessing(false);
      setOrderConfirmed(true);
      clearCart();
      showToast(`Order ${placedOrder.id} placed & recorded in Admin! 🎀`);
    }, 1100);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none" role="dialog" aria-modal="true" aria-label="Checkout">
      <div
        className="fixed inset-0 bg-[#241019]/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div className="inline-block w-full max-w-2xl bg-white text-left overflow-hidden shadow-2xl border border-[#fbcfe8] relative z-10 my-8 rounded-xs">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#fbcfe8] bg-[#fdf2f8]">
            <div className="flex items-center gap-3">
              <KhyLogo variant="pink" size="sm" />
              <span className="font-mono-typewriter text-xs uppercase text-[#db2777] font-semibold">
                // Secure Express Checkout
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-[#1f1217] hover:text-[#db2777] cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderConfirmed ? (
            /* Confirmation View */
            <div className="p-8 sm:p-12 text-center flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-[#ec4899] mb-4 stroke-[1.5]" />
              <span className="text-xs font-mono-typewriter uppercase tracking-widest text-[#db2777] font-bold">
                Order Confirmed
              </span>
              <h2 className="font-mono-typewriter text-2xl uppercase font-bold text-[#1f1217] mt-1 mb-2">
                Thank You For Your Order
              </h2>
              <p className="font-mono-typewriter text-sm font-bold text-[#db2777] bg-[#fdf2f8] px-4 py-1.5 border border-[#fbcfe8] inline-block mb-4 rounded-xs">
                {orderNumber}
              </p>
              <p className="font-sans-editorial text-xs sm:text-sm text-[#4a1829]/80 max-w-md leading-relaxed mb-6">
                A confirmation has been sent to your email. Your pieces are being hand-prepared with signature luxury pink packaging and will ship within 1-2 business days with express tracking.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-md justify-center">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    openTrackingModal(orderNumber);
                  }}
                  className="w-full sm:w-auto font-mono-typewriter text-xs uppercase px-6 py-3.5 bg-[#ec4899] text-white hover:bg-[#db2777] transition-all tracking-wider cursor-pointer shadow-md font-bold rounded-xs flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track This Order</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto font-mono-typewriter text-xs uppercase px-6 py-3.5 bg-[#fdf2f8] text-[#db2777] border border-[#fbcfe8] hover:bg-[#fbcfe8] transition-colors tracking-wider cursor-pointer font-bold rounded-xs text-center"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form & Order Summary */
            <div className="p-6 sm:p-8">
              <form onSubmit={handlePay} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left column: Contact & Shipping */}
                <div className="md:col-span-7 space-y-5">
                  <div>
                    <h3 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-2">
                      1. Contact Information
                    </h3>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                    />
                  </div>

                  <div>
                    <h3 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-2">
                      2. Shipping Address
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Street address"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full mt-2 px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                    />
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        className="px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                      />
                      <input
                        type="text"
                        required
                        placeholder="ZIP Code"
                        value={formData.zip}
                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                        className="px-3 py-2 text-xs font-sans-editorial border border-[#fbcfe8] bg-[#fff8fa] outline-none focus:border-[#db2777] rounded-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider mb-2 flex items-center justify-between">
                      <span>3. Payment</span>
                      <span className="text-[10px] text-pink-700 flex items-center gap-1 font-semibold">
                        <Lock className="w-3 h-3 text-[#db2777]" /> 256-Bit SSL Encrypted
                      </span>
                    </h3>
                    <div className="p-3 bg-[#fdf2f8] border border-[#fbcfe8] space-y-2 rounded-xs">
                      <input
                        type="text"
                        readOnly
                        value={formData.cardNumber}
                        className="w-full px-3 py-2 text-xs font-mono-typewriter bg-white border border-[#fbcfe8] rounded-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`Exp: ${formData.expDate}`}
                          className="px-3 py-1.5 text-xs font-mono-typewriter bg-white border border-[#fbcfe8] rounded-xs"
                        />
                        <input
                          type="text"
                          readOnly
                          value={`CVV: ${formData.cvv}`}
                          className="px-3 py-1.5 text-xs font-mono-typewriter bg-white border border-[#fbcfe8] rounded-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-[#ec4899] text-white font-mono-typewriter text-xs uppercase tracking-widest hover:bg-[#db2777] transition-colors cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 font-bold rounded-xs"
                  >
                    {isProcessing ? (
                      <span>Authorizing Payment...</span>
                    ) : (
                      <span>Complete Order – {formatPrice(total)}</span>
                    )}
                  </button>
                </div>

                {/* Right column: Order Summary */}
                <div className="md:col-span-5 bg-[#fdf2f8] p-4 sm:p-5 border border-[#fbcfe8] flex flex-col justify-between rounded-xs">
                  <div>
                    <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider pb-3 border-b border-[#fbcfe8] mb-3">
                      Order Summary ({cart.length})
                    </h4>
                    <div className="space-y-3 max-h-52 overflow-y-auto pr-1 divide-y divide-[#fbcfe8]">
                      {cart.map(item => (
                        <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                          <img
                            src={item.product.defaultImage}
                            alt={item.product.title}
                            className="w-10 h-12 object-cover border border-[#fbcfe8] rounded-2xs"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-mono-typewriter text-[11px] uppercase font-bold text-[#1f1217] truncate">
                              {item.product.title}
                            </p>
                            <p className="font-sans-editorial text-[10px] text-[#db2777] font-medium">
                              Qty: {item.quantity} · Size: {item.size}
                            </p>
                          </div>
                          <span className="font-sans-editorial text-xs font-bold text-[#1f1217]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#fbcfe8] space-y-1.5 text-xs font-sans-editorial">
                    <div className="flex justify-between text-[#4a1829]/80">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#4a1829]/80">
                      <span>Shipping</span>
                      <span className="font-semibold">{freeShippingQualified ? 'FREE' : formatPrice(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between text-[#4a1829]/80">
                      <span>Estimated Tax</span>
                      <span className="font-semibold">{formatPrice(estimatedTax)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#db2777] pt-2 border-t border-[#fbcfe8] font-mono-typewriter">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

