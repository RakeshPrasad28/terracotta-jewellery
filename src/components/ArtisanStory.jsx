import React from 'react';
import { ARTISAN_PILLARS } from '../data/products';
import { Mountain, Hand, Flame, ShieldCheck, Heart, Sparkles, Feather } from 'lucide-react';

export default function ArtisanStory() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'mountain':
        return <Mountain size={20} className="text-terracotta-600" />;
      case 'hand':
        return <Hand size={20} className="text-terracotta-600" />;
      case 'flame':
        return <Flame size={20} className="text-terracotta-600" />;
      case 'shield-check':
        return <ShieldCheck size={20} className="text-terracotta-600" />;
      default:
        return <Sparkles size={20} className="text-terracotta-600" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-terracotta-600 uppercase">
            The Terracotta Alchemy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-terracotta-950 mt-2">
            From Sacred Earth to Heirloom Grace
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            Unlike mass-produced metallic jewellery, our creations are born from sacred alluvial silt, shaped by freehand artisanal intuition, and permanently bonded in wood-fired earthen kilns.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISAN_PILLARS.map((pillar) => (
            <div
              key={pillar.step}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-terracotta-200/60 relative group hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-terracotta-300 group-hover:text-terracotta-600 transition-colors">
                  {pillar.step}
                </span>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-terracotta-100">
                  {getIcon(pillar.icon)}
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-terracotta-950 mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Banner: Terracotta vs Metal Jewellery */}
        <div className="mt-16 bg-gradient-to-br from-terracotta-950 to-stone-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-terracotta-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-warmGold-400 uppercase tracking-widest">
                Why Discerning Connoisseurs Choose Terracotta
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold mt-2">
                Earthy Luxury Meets Weightless Comfort
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-warmGold-500/20 text-warmGold-300 flex items-center justify-center mx-auto mb-3">
                  <Feather size={22} />
                </div>
                <h4 className="font-bold text-sm sm:text-base mb-1">60% Lighter than Brass & Silver</h4>
                <p className="text-xs text-stone-300">
                  Dance all 9 nights of Navratri or attend day-long weddings without sore ear lobes or neck ache.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-warmGold-500/20 text-warmGold-300 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={22} />
                </div>
                <h4 className="font-bold text-sm sm:text-base mb-1">100% Skin Safe & Nickel-Free</h4>
                <p className="text-xs text-stone-300">
                  Natural baked earth and herbal pigments cause zero rashes, green discoloration, or allergies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-warmGold-500/20 text-warmGold-300 flex items-center justify-center mx-auto mb-3">
                  <Heart size={22} />
                </div>
                <h4 className="font-bold text-sm sm:text-base mb-1">Eco-Conscious & Sustainable</h4>
                <p className="text-xs text-stone-300">
                  Sourced ethically from mother earth, kiln-fired with organic husks, returning to earth without pollution.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
