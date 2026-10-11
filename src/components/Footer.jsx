import React, { useState } from 'react';
import { Sparkles, Send, Heart, ShieldCheck, Truck, RefreshCw, Phone } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenCustomizer }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-terracotta-950 text-[#FAF7F2] pt-16 pb-12 border-t border-terracotta-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-12 border-b border-terracotta-900 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="p-2.5 rounded-full bg-terracotta-900 text-warmGold-400">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">All-India Safe Transit</h4>
              <p className="text-[11px] text-terracotta-300">Reinforced shock-proof packaging</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="p-2.5 rounded-full bg-terracotta-900 text-warmGold-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kiln Strength Tested</h4>
              <p className="text-[11px] text-terracotta-300">Baked at 850°C for durability</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="p-2.5 rounded-full bg-terracotta-900 text-warmGold-400">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Transit Damage Guarantee</h4>
              <p className="text-[11px] text-terracotta-300">Instant free replacement guarantee</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="p-2.5 rounded-full bg-terracotta-900 text-warmGold-400">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Artisan Direct Helpline</h4>
              <p className="text-[11px] text-terracotta-300">+91 98300 24119 (WhatsApp)</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex flex-col items-start mb-4">
              <span className="font-serif text-2xl font-bold tracking-[0.25em] text-white uppercase">
                MRITTIKA
              </span>
              <span className="text-[10px] tracking-[0.35em] text-warmGold-400 uppercase font-medium">
                The Sacred Terracotta Atelier
              </span>
            </div>
            <p className="text-xs text-terracotta-200/80 leading-relaxed max-w-sm">
              Born in Bishnupur’s historic clay-sculpting lanes, MRITTIKA transforms riverbed alluvial mud into lightweight, modern heirloom jewellery. We honor rural artisan families with dignity and sustainable fair wages.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-warmGold-400 uppercase tracking-widest mb-4">
              Artisan Collections
            </h4>
            <ul className="space-y-2 text-xs text-terracotta-200/80">
              <li>
                <button
                  onClick={() => onSelectCategory('necklaces')}
                  className="hover:text-white transition-colors"
                >
                  Haslis & Temple Chokers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('earrings')}
                  className="hover:text-white transition-colors"
                >
                  Bell Jhumkas & Chandbalis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('buttons')}
                  className="hover:text-white transition-colors"
                >
                  Artisan Sherwani & Kurta Buttons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sets')}
                  className="hover:text-white transition-colors"
                >
                  Grand Festive & Navratri Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomizer}
                  className="text-warmGold-300 font-semibold hover:text-white transition-colors flex items-center gap-1"
                >
                  <Sparkles size={12} />
                  <span>Customizer Studio (Bespoke)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Custom Order Club */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-warmGold-400 uppercase tracking-widest mb-4">
              Artisan Club & Festive Drops
            </h4>
            <p className="text-xs text-terracotta-200/80 mb-3">
              Subscribe to get secret previews of limited festival kiln batches (Durga Puja, Diwali & Navratri).
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-full bg-terracotta-900 border border-terracotta-800 text-white placeholder:text-terracotta-400 focus:outline-none focus:ring-1 focus:ring-warmGold-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-warmGold-500 hover:bg-warmGold-400 text-terracotta-950 text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1"
              >
                <span>Join</span>
                <Send size={12} />
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-green-400 mt-2 font-medium">
                ✨ Welcome to the Mrittika family! Check your inbox soon.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-terracotta-900 flex flex-col sm:flex-row items-center justify-between text-xs text-terracotta-400">
          <p>© 2026 MRITTIKA Jewellery Atelier. Handcrafted with reverence in India.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            <span>Crafted from Riverbed Silt & Sacred Fire</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
