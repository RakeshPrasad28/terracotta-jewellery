import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Feather, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onExploreClick, onOpenCustomizer, onSelectCategory }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Robust staggered reveal animation using fromTo with clearProps
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1, clearProps: 'all' }
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, clearProps: 'all' },
          '-=0.4'
        );
      }

      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' },
          '-=0.5'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
          '-=0.4'
        );
      }

      if (cardsRef.current && cardsRef.current.children.length > 0) {
        tl.fromTo(
          Array.from(cardsRef.current.children),
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, clearProps: 'all' },
          '-=0.4'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12">
      {/* Background Decorative Terracotta Glow Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-terracotta-200/40 via-warmGold-200/20 to-terracotta-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-terracotta-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Heritage Badge */}
        <div ref={badgeRef} className="flex justify-center mb-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-terracotta-100 border border-terracotta-200/80 text-terracotta-900 text-xs sm:text-sm font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-terracotta-600"></span>
            <span>Artisan Born in Bengal • Handcrafted in Bishnupur Studios</span>
            <span className="text-terracotta-500 font-serif italic text-xs hidden sm:inline">— Now Online</span>
          </div>
        </div>

        {/* Hero Editorial Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-terracotta-950 leading-[1.12]"
          >
            Sacred River Clay.
            <br />
            <span className="italic font-normal font-display text-terracotta-600">
              Sculpted for Modern Royalty.
            </span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="mt-5 text-base sm:text-lg lg:text-xl text-terracotta-900/80 max-w-2xl mx-auto font-normal leading-relaxed text-balance"
          >
            From dramatic Hasli neckpieces and feather-light chiming jhumkas to bespoke hand-fired Sherwani buttons. 100% natural kiln-baked terracotta jewellery crafted for festive grace.
          </p>

          {/* Action Buttons */}
          <div
            ref={ctaRef}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta-700 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-terracotta-800 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenCustomizer}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-terracotta-900 font-semibold text-xs sm:text-sm tracking-wider uppercase border border-terracotta-300 hover:border-terracotta-500 hover:bg-terracotta-50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
            >
              <Sparkles size={16} className="text-warmGold-600" />
              <span>Design Bespoke Piece</span>
            </button>
          </div>

          {/* 4 Brand Pillars (Feather-light, Kiln Fired, Hypoallergenic, 100% Clay) */}
          <div className="mt-8 pt-6 border-t border-terracotta-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center space-x-2.5 justify-center sm:justify-start text-left">
              <div className="p-2 rounded-full bg-terracotta-100 text-terracotta-700">
                <Feather size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-terracotta-950">Feather-Light</p>
                <p className="text-[11px] text-terracotta-700">Zero neck or ear pull</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 justify-center sm:justify-start text-left">
              <div className="p-2 rounded-full bg-terracotta-100 text-terracotta-700">
                <Flame size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-terracotta-950">850°C Kiln Baked</p>
                <p className="text-[11px] text-terracotta-700">Sturdy & fracture safe</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 justify-center sm:justify-start text-left">
              <div className="p-2 rounded-full bg-terracotta-100 text-terracotta-700">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-terracotta-950">Water-Resistant</p>
                <p className="text-[11px] text-terracotta-700">Protected organic seal</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 justify-center sm:justify-start text-left">
              <div className="p-2 rounded-full bg-terracotta-100 text-terracotta-700">
                <HeartHandshake size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-terracotta-950">Direct from Artisans</p>
                <p className="text-[11px] text-terracotta-700">Fair-wage rural craft</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Featured Category Showcase Tiles */}
        <div ref={cardsRef} className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1: Necklaces */}
          <div
            onClick={() => onSelectCategory ? onSelectCategory('necklaces') : onExploreClick()}
            className="group relative h-80 sm:h-[380px] rounded-2xl overflow-hidden cursor-pointer clay-shadow transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl bg-terracotta-100"
          >
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
              alt="Terracotta Necklaces"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-terracotta-900 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              Signature Collection
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-medium tracking-widest text-warmGold-300 uppercase">Heirloom Haslis</span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-warmGold-200 transition-colors">
                Temple & Deity Necklaces
              </h3>
              <p className="text-xs text-stone-200 mt-1.5 opacity-90 line-clamp-2">
                Bold sculpted pendants finished with organic dyes and hand-braided silk cords.
              </p>
              <div className="mt-3.5 flex items-center text-xs font-semibold text-warmGold-300 group-hover:translate-x-1 transition-transform">
                <span>Explore Necklaces</span>
                <span className="ml-1.5">→</span>
              </div>
            </div>
          </div>

          {/* Card 2: Earrings */}
          <div
            onClick={() => onSelectCategory ? onSelectCategory('earrings') : onExploreClick()}
            className="group relative h-80 sm:h-[380px] rounded-2xl overflow-hidden cursor-pointer clay-shadow transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl bg-terracotta-100"
          >
            <img
              src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80"
              alt="Terracotta Earrings"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute top-4 left-4 bg-terracotta-600 text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              Navratri Favorite
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-medium tracking-widest text-warmGold-300 uppercase">Feather-light Adornments</span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-warmGold-200 transition-colors">
                Jhumkas & Chandbalis
              </h3>
              <p className="text-xs text-stone-200 mt-1.5 opacity-90 line-clamp-2">
                Hollow-core terracotta bells that swing gracefully with comfortable all-night ear wear.
              </p>
              <div className="mt-3.5 flex items-center text-xs font-semibold text-warmGold-300 group-hover:translate-x-1 transition-transform">
                <span>Explore Earrings</span>
                <span className="ml-1.5">→</span>
              </div>
            </div>
          </div>

          {/* Card 3: Artisan Buttons */}
          <div
            onClick={() => onSelectCategory ? onSelectCategory('buttons') : onExploreClick()}
            className="group relative h-80 sm:h-[380px] rounded-2xl overflow-hidden cursor-pointer clay-shadow transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl bg-terracotta-100"
          >
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80"
              alt="Artisan Terracotta Buttons"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute top-4 left-4 bg-warmGold-500 text-black text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              Exclusive Craft
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-medium tracking-widest text-warmGold-300 uppercase">Garment Accents</span>
              <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-warmGold-200 transition-colors">
                Sherwani & Kurta Buttons
              </h3>
              <p className="text-xs text-stone-200 mt-1.5 opacity-90 line-clamp-2">
                High-fired terracotta buttons crafted for royal sherwanis, kurtas, and designer saree blouses.
              </p>
              <div className="mt-3.5 flex items-center text-xs font-semibold text-warmGold-300 group-hover:translate-x-1 transition-transform">
                <span>Explore Buttons</span>
                <span className="ml-1.5">→</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
