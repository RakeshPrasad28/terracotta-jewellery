import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Feather } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-terracotta-200/70 clay-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-terracotta-50 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-terracotta-900/90 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isFestiveSpecial && (
            <span className="bg-warmGold-500 text-terracotta-950 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm">
              🪔 Festive Edit
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-terracotta-800 hover:text-terracotta-600 hover:scale-110 transition-all"
          aria-label="Save to Wishlist"
        >
          <Heart
            size={16}
            className={`transition-colors ${isWishlisted ? 'fill-terracotta-600 text-terracotta-600' : ''}`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-sm text-terracotta-900 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-terracotta-700 hover:text-white transition-colors flex items-center justify-center space-x-1.5"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Weight Pill */}
          <div className="flex items-center justify-between text-[11px] text-terracotta-700/80 mb-1.5">
            <span className="uppercase tracking-wider font-semibold">{product.categoryLabel}</span>
            <span className="flex items-center gap-1 text-stone-500 font-medium">
              <Feather size={11} className="text-terracotta-500" />
              {product.weight.split(' ')[0]} {product.weight.split(' ')[1] || 'g'}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-bold text-terracotta-950 group-hover:text-terracotta-700 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mt-1 text-xs">
            <div className="flex text-warmGold-500">
              <Star size={12} className="fill-warmGold-500 text-warmGold-500" />
            </div>
            <span className="font-semibold text-terracotta-900 text-[11px]">{product.rating}</span>
            <span className="text-stone-400 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add to Bag */}
        <div className="mt-4 pt-3 border-t border-terracotta-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-lg sm:text-xl font-bold text-terracotta-950">
                ₹{product.price}
              </span>
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-green-700">
              {discountPercent}% OFF
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center space-x-1 shadow-sm ${
              isAdded
                ? 'bg-green-700 text-white'
                : 'bg-terracotta-700 text-white hover:bg-terracotta-800 hover:shadow-md'
            }`}
            aria-label="Add to Bag"
          >
            <ShoppingBag size={14} />
            <span className="hidden sm:inline">{isAdded ? 'Added' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
