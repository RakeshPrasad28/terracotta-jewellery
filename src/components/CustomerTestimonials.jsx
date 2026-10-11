import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function CustomerTestimonials() {
  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-terracotta-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-terracotta-600 uppercase">
            Offline Patrons to Online Family
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-terracotta-950 mt-1">
            Loved at Craft Exhibitions Across India
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Real stories from customers who experienced our handcrafted terracotta pieces at handicraft melas, pop-up bazaars, and festive showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-terracotta-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-warmGold-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-warmGold-500" />
                    ))}
                  </div>
                  <Quote size={20} className="text-terracotta-300" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-terracotta-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-terracotta-950">{t.name}</h4>
                    <p className="text-[11px] text-stone-500">{t.location}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-terracotta-700 font-semibold bg-terracotta-50 px-2.5 py-1 rounded-full w-fit">
                  <CheckCircle size={11} className="text-terracotta-600" />
                  <span>{t.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
