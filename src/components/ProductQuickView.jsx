import React, { useState } from 'react';
import { X, Star, ShoppingBag, Feather, ShieldCheck, Flame, Heart, Check, Info } from 'lucide-react';

export default function ProductQuickView({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overscroll-contain"
      data-lenis-prevent="true"
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-terracotta-200 my-8 overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-terracotta-100 text-terracotta-900 transition-colors shadow-sm"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Showcase */}
          <div className="bg-terracotta-50 p-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-terracotta-200/60">
              <img
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.isFestiveSpecial && (
                <span className="absolute top-3 left-3 bg-warmGold-500 text-terracotta-950 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                  🪔 Festive Edition
                </span>
              )}
            </div>

            {/* Thumbnail navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImgIdx === idx ? 'border-terracotta-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specs & Purchasing */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-terracotta-700">
                <span className="uppercase font-semibold tracking-wider">{product.categoryLabel}</span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="fill-warmGold-500 text-warmGold-500" />
                  <span className="font-bold text-terracotta-950">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-terracotta-950 mt-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="font-serif text-2xl font-bold text-terracotta-950">₹{product.price}</span>
                <span className="text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-terracotta-900/80 leading-relaxed">
                {product.description}
              </p>

              {/* Artisan Specifications */}
              <div className="mt-6 p-4 rounded-2xl bg-terracotta-50/70 border border-terracotta-200/60 space-y-2 text-xs">
                <p className="font-semibold text-terracotta-950 flex items-center gap-1.5 pb-1 border-b border-terracotta-200/50">
                  <ShieldCheck size={14} className="text-terracotta-600" />
                  <span>Artisan Guarantee & Specifications</span>
                </p>
                <div className="flex justify-between text-stone-600">
                  <span>Weight:</span>
                  <span className="font-medium text-terracotta-900">{product.weight}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Clay Material:</span>
                  <span className="font-medium text-terracotta-900">{product.clayType || 'Pure Terracotta Clay'}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Firing:</span>
                  <span className="font-medium text-terracotta-900">{product.firingTemp || '850°C Slow Baked'}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Finish:</span>
                  <span className="font-medium text-terracotta-900">{product.finish || 'Water-shield sealed'}</span>
                </div>
              </div>

              {/* Clay Care Note */}
              <div className="mt-4 flex items-start space-x-2 text-[11px] text-terracotta-800 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                <Info size={14} className="text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Artisan Care:</strong> 100% water-resistant sealed. Simply wipe with a dry cloth after use and store in the complimentary cotton bag.
                </span>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="mt-6 pt-5 border-t border-terracotta-100 flex items-center gap-3">
              <div className="flex items-center border border-terracotta-200 rounded-full px-2 py-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-terracotta-800 hover:text-terracotta-950 font-bold text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-terracotta-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-terracotta-800 hover:text-terracotta-950 font-bold text-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 shadow-md ${
                  added
                    ? 'bg-green-700 text-white'
                    : 'bg-terracotta-700 text-white hover:bg-terracotta-800 hover:shadow-lg'
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Bag • ₹{product.price * quantity}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className="p-3 rounded-full border border-terracotta-200 hover:bg-terracotta-50 text-terracotta-800 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} className={isWishlisted ? 'fill-terracotta-600 text-terracotta-600' : ''} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
