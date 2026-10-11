import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, Sparkles, CreditCard, Banknote } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = `MRT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C1623C', '#E0B74C', '#3D5A40']
      });
    } catch (err) {}

    onOrderSuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4 overscroll-contain"
      data-lenis-prevent="true"
    >
      <div
        className="relative bg-white rounded-none sm:rounded-3xl max-w-xl w-full h-full sm:h-auto p-5 sm:p-8 shadow-2xl border border-terracotta-200 my-0 sm:my-8 overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-terracotta-100 text-terracotta-900 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-widest">
                Express Checkout
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-terracotta-950 mt-1">
                Artisan Order Dispatch
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Total to pay: <strong className="text-terracotta-950 font-serif text-base">₹{checkoutData?.total || 0}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-terracotta-900 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-terracotta-900 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-terracotta-900 mb-1">Delivery Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat No., Apartment, Street name"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-terracotta-900 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Ahmedabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-terracotta-900 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 400001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-terracotta-900 mb-2">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <label
                    className={`border-2 p-2.5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi' ? 'border-terracotta-600 bg-terracotta-50' : 'border-terracotta-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="sr-only"
                    />
                    <Sparkles size={16} className="text-terracotta-600 mb-1" />
                    <span className="text-[11px] font-bold text-terracotta-950">UPI / QR</span>
                  </label>

                  <label
                    className={`border-2 p-2.5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'card' ? 'border-terracotta-600 bg-terracotta-50' : 'border-terracotta-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <CreditCard size={16} className="text-terracotta-600 mb-1" />
                    <span className="text-[11px] font-bold text-terracotta-950">Card / NetBanking</span>
                  </label>

                  <label
                    className={`border-2 p-2.5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod' ? 'border-terracotta-600 bg-terracotta-50' : 'border-terracotta-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Banknote size={16} className="text-terracotta-600 mb-1" />
                    <span className="text-[11px] font-bold text-terracotta-950">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-xl"
              >
                Confirm & Place Order (₹{checkoutData?.total || 0})
              </button>
            </form>
          </div>
        ) : (
          /* Order Placed Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} />
            </div>

            <span className="text-xs font-bold text-warmGold-600 uppercase tracking-widest">
              🪔 Order Confirmed
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-terracotta-950 mt-1">
              Thank You, {formData.fullName.split(' ')[0] || 'Patron'}!
            </h2>
            <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto">
              Your order has been assigned to our artisan studio. We will kiln-cure and pack your pieces with eco-friendly bamboo and cotton wraps.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#FAF7F2] border border-terracotta-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-bold text-terracotta-950 font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Dispatch Status:</span>
                <span className="font-semibold text-terracotta-700">Artisan Studio Packing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-medium text-terracotta-950 truncate max-w-[200px]">
                  {formData.address}, {formData.city}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
            >
              Back to Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
