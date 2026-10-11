import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onMoveToCart
}) {
  if (!isOpen) return null;

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
        <div className="p-4 sm:p-5 border-b border-terracotta-200 bg-white flex items-center justify-between shrink-0 w-full">
          <div className="flex items-center space-x-2 min-w-0">
            <Heart size={20} className="fill-terracotta-600 text-terracotta-600 shrink-0" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-terracotta-950 truncate">
              Saved Favourites ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1 rounded-full hover:bg-terracotta-100 text-terracotta-900 transition-colors shrink-0"
            aria-label="Close Wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 space-y-3 w-full overscroll-contain"
          data-lenis-prevent="true"
        >
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center mb-4">
                <Heart size={26} />
              </div>
              <h3 className="font-serif text-lg font-bold text-terracotta-950">No saved treasures</h3>
              <p className="text-xs text-terracotta-800/80 mt-1 max-w-xs">
                Tap the heart icon on any necklace, jhumka, or buttons to save your favorite terracotta pieces here.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-6 py-2.5 rounded-full bg-terracotta-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-terracotta-800 transition-colors"
              >
                Discover Collections
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded-2xl border border-terracotta-200/80 shadow-sm flex gap-3 items-center w-full max-w-full overflow-hidden"
              >
                {/* Fixed-Size Thumbnail Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-terracotta-50 border border-terracotta-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details Container */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold text-terracotta-600 uppercase block truncate">
                        {product.categoryLabel}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-terracotta-950 truncate leading-snug">
                        {product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-stone-400 hover:text-red-600 p-1 shrink-0 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <span className="font-serif text-xs sm:text-sm font-bold text-terracotta-950 shrink-0">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => {
                        onMoveToCart(product);
                      }}
                      className="px-3 py-1.5 rounded-full bg-terracotta-700 text-white text-xs font-semibold hover:bg-terracotta-800 transition-colors flex items-center space-x-1 shrink-0 shadow-sm"
                    >
                      <ShoppingBag size={12} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
