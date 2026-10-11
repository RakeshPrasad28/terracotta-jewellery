import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 99;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingCost);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'EARTH10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setDiscountMsg('✨ Coupon "EARTH10" applied (10% Earth discount)!');
    } else if (code === 'NAVRATRI') {
      const disc = Math.min(subtotal, 200);
      setAppliedDiscount(disc);
      setDiscountMsg('🪔 Coupon "NAVRATRI" applied (₹200 festive treat)!');
    } else {
      setDiscountMsg('❌ Invalid code. Try "EARTH10" or "NAVRATRI"');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end overscroll-contain"
      onClick={onClose}
      data-lenis-prevent="true"
    >
      <div
        className="w-full sm:w-[440px] max-w-full h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-hidden relative overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-terracotta-200 bg-white shrink-0 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <ShoppingBag size={20} className="text-terracotta-700 shrink-0" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-terracotta-950 truncate">
                Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1 rounded-full hover:bg-terracotta-100 text-terracotta-900 transition-colors shrink-0"
              aria-label="Close Cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="mt-3 pt-2.5 border-t border-terracotta-100 text-xs w-full">
            <div className="flex justify-between items-center mb-1 text-terracotta-900 font-medium gap-2">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs min-w-0 truncate">
                <Truck size={14} className="text-terracotta-600 shrink-0" />
                {isFreeShipping ? (
                  <span className="text-green-700 font-semibold truncate">🎉 FREE Shipping unlocked!</span>
                ) : (
                  <span className="truncate">Add ₹{remainingForFreeShipping} for <strong>FREE Shipping</strong></span>
                )}
              </span>
              <span className="text-[10px] text-stone-500 font-bold shrink-0">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full bg-terracotta-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-terracotta-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 space-y-3 w-full overscroll-contain"
          data-lenis-prevent="true"
        >
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center mb-4">
                <ShoppingBag size={26} />
              </div>
              <h3 className="font-serif text-lg font-bold text-terracotta-950">Your bag is empty</h3>
              <p className="text-xs text-terracotta-800/80 mt-1 max-w-xs">
                Discover our terracotta necklaces, lightweight earrings, and artisan buttons.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-6 py-2.5 rounded-full bg-terracotta-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-terracotta-800 transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl border border-terracotta-200/80 shadow-sm flex gap-3 items-center w-full max-w-full overflow-hidden"
              >
                {/* Fixed-Size Thumbnail Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-terracotta-50 border border-terracotta-100">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details Container */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-terracotta-950 truncate leading-snug">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-600 p-1 shrink-0 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Custom specifications badge if bespoke piece */}
                  {item.isCustom && item.customDetails && (
                    <div className="mt-1 p-1.5 bg-terracotta-50 rounded-lg text-[10px] text-terracotta-900 border border-terracotta-200/60 leading-tight space-y-0.5">
                      <p className="truncate"><strong>Theme:</strong> {item.customDetails.theme}</p>
                      <p className="truncate"><strong>Palette:</strong> {item.customDetails.palette}</p>
                      <p className="truncate"><strong>Finish:</strong> {item.customDetails.finish}</p>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between gap-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-terracotta-200 rounded-full px-2 py-0.5 bg-stone-50 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-terracotta-800 hover:text-terracotta-950 text-xs font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-terracotta-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-terracotta-800 hover:text-terracotta-950 text-xs font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Item Total */}
                    <span className="font-serif text-xs sm:text-sm font-bold text-terracotta-950 shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-terracotta-200 space-y-3 shrink-0 w-full">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Coupon (e.g. NAVRATRI)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500 uppercase placeholder:normal-case"
                />
                <Tag size={13} className="absolute right-3 top-2.5 text-stone-400" />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-900 text-xs font-semibold rounded-xl transition-colors shrink-0"
              >
                Apply
              </button>
            </form>

            {discountMsg && (
              <p className={`text-[11px] ${discountMsg.startsWith('❌') ? 'text-red-600' : 'text-green-700 font-medium'} truncate`}>
                {discountMsg}
              </p>
            )}

            {/* Subtotal, Discount & Total Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1.5 border-t border-terracotta-100 w-full">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-terracotta-950">₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Festive Discount</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>India-wide Shipping</span>
                <span className={shippingCost === 0 ? "text-green-700 font-semibold" : "text-terracotta-950"}>
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-terracotta-950 pt-1.5 border-t border-terracotta-200">
                <span className="font-serif">Grand Total</span>
                <span className="font-serif">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onCheckout({ subtotal, discount: appliedDiscount, shipping: shippingCost, total: finalTotal, items });
              }}
              className="w-full py-3 sm:py-3.5 px-6 rounded-full bg-terracotta-700 hover:bg-terracotta-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[10px] text-center text-stone-500">
              🔒 Safe & Secure Checkout • UPI, Cards & COD
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
