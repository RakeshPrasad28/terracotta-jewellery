import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomizerStudio from './components/CustomizerStudio';
import ProductCatalog from './components/ProductCatalog';
import ArtisanStory from './components/ArtisanStory';
import CustomerTestimonials from './components/CustomerTestimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductQuickView from './components/ProductQuickView';
import CheckoutModal from './components/CheckoutModal';
import { Sparkles, Check, Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([
    // Start with 1 bestselling demo item to give immediate interactive feeling
    { ...PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['ear-01']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const lenisRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis scroll initialization note:', e);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const isAnyModalOpen = isCartOpen || isWishlistOpen || Boolean(quickViewProduct) || isCheckoutOpen;

  // Freeze background page & pause Lenis when Cart, Wishlist, or any modal is open
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    };
  }, [isAnyModalOpen]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      // If it's a custom bespoke item, treat as a separate line item
      if (product.isCustom) {
        return [...prevCart, { ...product, quantity: 1 }];
      }
      const existingIdx = prevCart.findIndex((item) => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your bag`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product) => {
    setWishlistIds((prevIds) => {
      if (prevIds.includes(product.id)) {
        showToast(`Removed from saved pieces`);
        return prevIds.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to favourites`);
        return [...prevIds, product.id];
      }
    });
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Checkout trigger
  const handleProceedToCheckout = (data) => {
    setCheckoutData(data);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCart([]);
    showToast('🎉 Your terracotta order was placed successfully!');
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241E1B] flex flex-col selection:bg-terracotta-600 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-terracotta-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-medium border border-terracotta-800 animate-bounce-subtle">
          <span className="w-2 h-2 rounded-full bg-warmGold-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCustomizer={scrollToCustomizer}
      />

      <main className="flex-1">
        {/* Editorial Fashion Hero */}
        <Hero
          onExploreClick={scrollToCatalog}
          onOpenCustomizer={scrollToCustomizer}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* Product Catalog Section with Filters */}
        <ProductCatalog
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Interactive Customizer Studio ("Design Your Bespoke Piece") */}
        <CustomizerStudio onAddToCart={handleAddToCart} />

        {/* Brand Roots & 850°C Kiln Baking Story */}
        <ArtisanStory />

        {/* Customer Testimonials from Offline Melas & Exhibitions */}
        <CustomerTestimonials />
      </main>

      {/* Brand Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenCustomizer={scrollToCustomizer}
      />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onMoveToCart={handleMoveToCart}
      />

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating Bespoke Customizer Sticky Pill for quick access */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={scrollToCustomizer}
          className="bg-white/95 backdrop-blur-md text-terracotta-900 border border-terracotta-300 hover:border-terracotta-600 px-4 py-2.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 text-xs font-bold tracking-wider uppercase group hover:-translate-y-0.5"
        >
          <span className="p-1 rounded-full bg-warmGold-400 text-terracotta-950 group-hover:rotate-12 transition-transform">
            <Sparkles size={13} />
          </span>
          <span className="hidden sm:inline">Design Bespoke Piece</span>
          <span className="sm:hidden">Customize</span>
        </button>
      </div>

    </div>
  );
}
