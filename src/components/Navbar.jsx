import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCustomizer
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = [
    { id: 'all', label: 'All Collections' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'buttons', label: 'Artisan Buttons' },
    { id: 'sets', label: 'Festive Sets 🪔' },
  ];

  const popularSearches = ['Hasli Choker', 'Bell Jhumkas', 'Sherwani Buttons', 'Navratri Special', 'Ear Studs'];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* 1. Top Announcement Ribbon */}
      <div className="bg-terracotta-950 text-[#FAF7F2] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center space-x-2 border-b border-terracotta-900">
        <span className="inline-block w-2 h-2 rounded-full bg-warmGold-400 animate-ping"></span>
        <span className="font-semibold text-warmGold-300 tracking-widest uppercase">🪔 Navratri Festive Edit:</span>
        <span className="hidden sm:inline">Handcrafted terracotta pieces & free shipping across India above ₹999</span>
        <span className="sm:hidden">Free shipping above ₹999</span>
        <span className="hidden md:inline text-terracotta-400">| 100% Eco-Friendly River Clay</span>
      </div>

      {/* 2. Main Luxury Header */}
      <nav
        className={`w-full bg-[#FAF7F2]/98 backdrop-blur-md transition-all duration-300 border-b border-terracotta-200/80 shadow-[0_4px_20px_-8px_rgba(100,40,20,0.06)] ${
          isScrolled ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Row 1: Brand & Core Utilities (Desktop & Mobile) */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Desktop Left: Spacious Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search jhumkas, hasli, buttons..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-white border border-terracotta-200/90 text-terracotta-950 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-600 transition-all shadow-sm"
                />
                <Search size={15} className="absolute left-3 top-2.5 text-terracotta-600" />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Left: Menu Toggle + Search Icon */}
            <div className="flex items-center space-x-1 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 rounded-xl text-terracotta-950 hover:bg-terracotta-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 rounded-xl text-terracotta-950 hover:bg-terracotta-100 transition-colors"
                aria-label="Toggle Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Center: Majestic Brand Mark */}
            <div
              className="flex flex-col items-center cursor-pointer select-none px-2"
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.28em] text-terracotta-950 uppercase hover:text-terracotta-700 transition-colors text-center">
                MRITTIKA
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.38em] text-terracotta-700 uppercase -mt-0.5 font-medium text-center">
                The Sacred Clay Atelier
              </span>
            </div>

            {/* Right: Actions (Customize Pill, Wishlist, Bag) */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-3.5 flex-1 max-w-xs">
              
              {/* Desktop Customize Button (Generously separated on the right) */}
              <button
                onClick={onOpenCustomizer}
                className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-terracotta-50 to-warmGold-100/80 text-terracotta-900 border border-terracotta-300 hover:border-terracotta-500 hover:shadow-md transition-all group"
              >
                <Sparkles size={13} className="text-warmGold-600 group-hover:rotate-12 transition-transform" />
                <span className="whitespace-nowrap">Customize Piece</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 rounded-full text-terracotta-950 hover:bg-terracotta-100 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={21} className={wishlistCount > 0 ? "fill-terracotta-600 text-terracotta-600" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-terracotta-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center space-x-1.5 bg-terracotta-700 hover:bg-terracotta-800 text-white px-3 sm:px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md group"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={17} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold hidden md:inline">Bag</span>
                <span className="bg-white text-terracotta-800 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>

          {/* Row 2: Desktop Collection Navigation Bar (Spacious, Single-Line, Never Wraps) */}
          <div className="hidden lg:flex items-center justify-center space-x-9 pt-3 mt-2.5 border-t border-terracotta-200/50">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-xs uppercase tracking-[0.16em] font-semibold transition-all relative py-1 whitespace-nowrap group ${
                  activeCategory === cat.id
                    ? 'text-terracotta-800'
                    : 'text-terracotta-950/75 hover:text-terracotta-600'
                }`}
              >
                <span>{cat.label}</span>
                {/* Active & Hover Underline Indicator */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-terracotta-600 rounded-full transition-all duration-300 ${
                    activeCategory === cat.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}

            {/* Quick link to craft story */}
            <button
              onClick={() => {
                const el = document.getElementById('customizer-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs uppercase tracking-[0.16em] font-semibold text-terracotta-700 hover:text-terracotta-900 transition-colors whitespace-nowrap flex items-center space-x-1"
            >
              <span>Design Studio</span>
              <span className="text-warmGold-600 font-bold">✨</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Expandable Overlay */}
        {isMobileSearchOpen && (
          <div className="lg:hidden px-4 pt-3 pb-4 border-t border-terracotta-200/70 bg-[#FAF7F2] shadow-md animate-fadeIn">
            <div className="relative mb-2">
              <input
                type="text"
                autoFocus
                placeholder="Search jhumkas, necklaces, buttons..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl bg-white border border-terracotta-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-terracotta-950 shadow-inner"
              />
              <Search size={17} className="absolute left-3 top-3 text-terracotta-600" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick search chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
              <span className="text-[10px] font-semibold text-stone-400 uppercase shrink-0">Popular:</span>
              {popularSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => onSearchChange(term)}
                  className="text-[11px] font-medium bg-terracotta-100/70 text-terracotta-900 px-2.5 py-1 rounded-full whitespace-nowrap border border-terracotta-200 hover:bg-terracotta-200 transition-colors shrink-0"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="w-4/5 max-w-sm h-full bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-terracotta-200">
                <div>
                  <h3 className="font-serif text-2xl tracking-[0.2em] font-bold text-terracotta-950">MRITTIKA</h3>
                  <p className="text-[10px] tracking-widest text-terracotta-700 uppercase font-medium">Sacred Clay Atelier</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-terracotta-100 text-terracotta-900 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Category Links */}
              <div className="py-6 space-y-2">
                <p className="text-[11px] font-bold text-terracotta-600 uppercase tracking-widest mb-3">
                  Collections & Edits
                </p>
                {navCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      activeCategory === cat.id
                        ? 'bg-terracotta-700 text-white shadow-sm'
                        : 'text-terracotta-950 hover:bg-terracotta-100/70'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <ArrowRight size={14} className={activeCategory === cat.id ? "text-white" : "text-terracotta-400"} />
                  </button>
                ))}

                {/* Mobile Customizer Spotlight Button */}
                <div className="pt-5 mt-4 border-t border-terracotta-200">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenCustomizer();
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-terracotta-700 to-terracotta-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <Sparkles size={16} className="text-warmGold-300" />
                    <span>Design Custom Piece (Navratri)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Offline-to-Online Trust Banner */}
            <div className="p-4 bg-terracotta-100/80 rounded-2xl border border-terracotta-200 text-xs text-terracotta-900">
              <p className="font-bold mb-1 flex items-center gap-1.5 text-terracotta-950">
                <span>🌿</span>
                <span>Artisan Direct Guarantee</span>
              </p>
              <p className="text-terracotta-800 text-[11px] leading-relaxed">
                Hand-baked in 850°C wood kilns. 60% lighter than metal jewellery and 100% skin friendly.
              </p>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
