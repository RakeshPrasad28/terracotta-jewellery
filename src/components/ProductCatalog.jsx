import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';

export default function ProductCatalog({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView
}) {
  const [onlyFestive, setOnlyFestive] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'low-high', 'high-low', 'rating'

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'buttons', label: 'Artisan Buttons' },
    { id: 'sets', label: 'Festive Sets' },
  ];

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by Festive toggle
    if (onlyFestive) {
      list = list.filter((p) => p.isFestiveSpecial);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, activeCategory, onlyFestive, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="pt-6 pb-14 sm:pt-8 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Catalog Title & Category Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-terracotta-200/70">
        <div>
          <span className="text-xs font-semibold tracking-widest text-terracotta-600 uppercase">
            Curated Artisan Catalogue
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-terracotta-950 mt-1">
            {activeCategory === 'all'
              ? 'Handcrafted Collections'
              : activeCategory === 'necklaces'
              ? 'Terracotta Necklaces & Haslis'
              : activeCategory === 'earrings'
              ? 'Terracotta Jhumkas & Studs'
              : activeCategory === 'buttons'
              ? 'Artisan Garment Clay Buttons'
              : 'Festive Royal Ensembles'}
          </h2>
          <p className="text-xs sm:text-sm text-terracotta-800/80 mt-1">
            Showing {filteredProducts.length} unique kiln-baked terracotta creations
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-terracotta-700 text-white shadow-md'
                  : 'bg-white text-terracotta-900 border border-terracotta-200 hover:border-terracotta-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar (Festive filter button, Search status, Sorting) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-terracotta-50/60 p-3 sm:p-4 rounded-2xl border border-terracotta-200/60">
        {/* Festive Edit Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setOnlyFestive(!onlyFestive)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition-all ${
              onlyFestive
                ? 'bg-warmGold-500 text-terracotta-950 shadow-sm'
                : 'bg-white text-terracotta-800 border border-terracotta-200 hover:border-terracotta-400'
            }`}
          >
            <span>🪔</span>
            <span>Navratri & Festive Only</span>
            {onlyFestive && <X size={12} className="ml-1" />}
          </button>

          {searchQuery && (
            <span className="text-xs text-terracotta-700 bg-white px-2.5 py-1 rounded-full border border-terracotta-200">
              Query: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2 ml-auto">
          <span className="text-xs text-terracotta-700 font-medium hidden sm:inline">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-white border border-terracotta-200 rounded-lg px-3 py-1.5 font-medium text-terracotta-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
          >
            <option value="featured">Featured / Artisan Best</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="py-16 text-center bg-white rounded-3xl border border-terracotta-200/70 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center mx-auto mb-4">
            <Filter size={24} />
          </div>
          <h3 className="font-serif text-xl font-bold text-terracotta-950">No artisan pieces found</h3>
          <p className="text-xs text-terracotta-800/80 mt-2">
            We couldn't find items matching your current filters. Try resetting the filters or check another category.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setOnlyFestive(false);
            }}
            className="mt-5 px-5 py-2.5 rounded-full bg-terracotta-700 text-white text-xs font-semibold tracking-wider uppercase hover:bg-terracotta-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
}
