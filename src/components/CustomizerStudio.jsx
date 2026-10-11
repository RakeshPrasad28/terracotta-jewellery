import React, { useEffect, useRef, useState } from 'react';
import { CUSTOMIZER_DATA } from '../data/products';
import { Sparkles, Check, Clock, ShoppingBag, RotateCcw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import blueFloralEarrings from '../assets/earrings/Gemini_Generated_Image_50mhto50mhto50mh.png';

export default function CustomizerStudio({ onAddToCart }) {
  const [selectedBase, setSelectedBase] = useState(CUSTOMIZER_DATA.itemBases[0]); // default to Earrings
  const [selectedDesign, setSelectedDesign] = useState(CUSTOMIZER_DATA.itemBases[0].designs[0]); // default to Tops
  const [selectedTheme, setSelectedTheme] = useState(CUSTOMIZER_DATA.themes[0]); // default to Navratri
  const [selectedPalette, setSelectedPalette] = useState(CUSTOMIZER_DATA.palettes[0]); // default to Raw Terracotta
  const [selectedFinish, setSelectedFinish] = useState(CUSTOMIZER_DATA.finishes[1]); // default to 24k Gold strokes
  const [customNote, setCustomNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setIsSectionVisible(entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Switch Base Item & auto-select its first design
  const handleSelectBase = (base) => {
    setSelectedBase(base);
    if (base.designs && base.designs.length > 0) {
      setSelectedDesign(base.designs[0]);
    }
  };

  // Dynamic Price calculation
  const currentBasePrice = selectedDesign ? selectedDesign.price : selectedBase.basePrice;
  const totalPrice = currentBasePrice + selectedTheme.priceModifier + selectedFinish.cost;

  const handleAddCustomToCart = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C1623C', '#E0B74C', '#FAF7F2', '#3D5A40']
      });
    } catch (e) {}

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${selectedDesign ? selectedDesign.name : selectedBase.name}`,
      category: selectedBase.id === 'necklace' ? 'necklaces' : selectedBase.id === 'earrings' ? 'earrings' : 'buttons',
      categoryLabel: 'Bespoke Artisan',
      price: totalPrice,
      originalPrice: totalPrice + 500,
      badge: 'Bespoke Order',
      isCustom: true,
      customDetails: {
        baseCategory: selectedBase.name,
        designSilhouette: selectedDesign ? selectedDesign.name : 'Standard Silhouette',
        theme: selectedTheme.name,
        motif: selectedTheme.motif,
        palette: selectedPalette.name,
        finish: selectedFinish.name,
        note: customNote || 'Standard artisan styling'
      },
      images: [
        selectedBase.id === 'necklace'
          ? 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
          : selectedBase.id === 'earrings'
          ? blueFloralEarrings
          : 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80'
      ],
      description: `Bespoke handcrafted ${selectedDesign ? selectedDesign.name : selectedBase.name} designed in ${selectedTheme.name} theme, finished in ${selectedPalette.name} with ${selectedFinish.name}.`,
      weight: 'Custom artisan weight (~45g)'
    };

    onAddToCart(customProduct);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const resetCustomizer = () => {
    const defaultBase = CUSTOMIZER_DATA.itemBases[0];
    setSelectedBase(defaultBase);
    setSelectedDesign(defaultBase.designs[0]);
    setSelectedTheme(CUSTOMIZER_DATA.themes[0]);
    setSelectedPalette(CUSTOMIZER_DATA.palettes[0]);
    setSelectedFinish(CUSTOMIZER_DATA.finishes[1]);
    setCustomNote('');
  };

  // Helper to render the Theme Motif on any shape/coordinate
  const renderThemeMotif = (cx, cy, scale = 1, accentColor = '#E0B74C') => {
    const isGold = selectedFinish.id === 'gold-leaf';
    const motifColor = isGold ? accentColor : '#FAF7F2';
    const innerStroke = isGold ? '#FAF7F2' : selectedPalette.hex;

    if (selectedTheme.id === 'navratri') {
      // Navratri: Festive Dandiya Swirls + Central Mirror
      return (
        <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
          {/* Outer festive ray petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle
              key={i}
              cx={18 * Math.cos((angle * Math.PI) / 180)}
              cy={18 * Math.sin((angle * Math.PI) / 180)}
              r="2.5"
              fill={motifColor}
            />
          ))}
          {/* Swirl lines */}
          <path
            d="M -10,-10 C -4,0 4,0 10,10 M -10,10 C -4,0 4,0 10,-10"
            stroke={motifColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Central Mirror disc */}
          <circle cx="0" cy="0" r="7" fill={motifColor} stroke={innerStroke} strokeWidth="1.5" />
          <circle cx="-2" cy="-2" r="2" fill="#FFFFFF" opacity="0.8" />
        </g>
      );
    }

    if (selectedTheme.id === 'divine') {
      // Sacred Temple: Trishul & Sacred Lotus
      return (
        <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
          {/* Sacred Trishul Arch */}
          <path
            d="M 0,-18 L 0,14 M -13,-7 C -8,5 0,9 0,9 C 0,9 8,5 13,-7"
            stroke={motifColor}
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Top trident tips */}
          <circle cx="-13" cy="-7" r="2.5" fill={motifColor} />
          <circle cx="13" cy="-7" r="2.5" fill={motifColor} />
          <circle cx="0" cy="-18" r="3" fill="#FAF7F2" stroke={motifColor} strokeWidth="1.5" />
          {/* Lotus Pedestal Base */}
          <path
            d="M -10,14 Q 0,8 10,14 Q 0,18 -10,14 Z"
            fill={motifColor}
          />
        </g>
      );
    }

    if (selectedTheme.id === 'nature') {
      // Flora & Peacock: Sculpted Lotus Petals & Peacock plume
      return (
        <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
          {/* Center Lotus Petal */}
          <path
            d="M 0,-17 C 8,-6 10,8 0,14 C -10,8 -8,-6 0,-17 Z"
            fill={motifColor}
            stroke={innerStroke}
            strokeWidth="1"
          />
          {/* Flanking Side Petals */}
          <path
            d="M -14,-4 C -6,2 0,10 0,14 C -8,11 -16,4 -14,-4 Z"
            fill={motifColor}
            opacity="0.85"
          />
          <path
            d="M 14,-4 C 6,2 0,10 0,14 C 8,11 16,4 14,-4 Z"
            fill={motifColor}
            opacity="0.85"
          />
          {/* Peacock Eye */}
          <circle cx="0" cy="-3" r="3.5" fill="#3D5A40" stroke="#FAF7F2" strokeWidth="1" />
        </g>
      );
    }

    // Tribal / Dokra Fusion
    return (
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
        {/* Geometric Sunburst Rhombus */}
        <polygon points="0,-16 16,0 0,16 -16,0" fill="none" stroke={motifColor} strokeWidth="2.5" />
        <polygon points="0,-9 9,0 0,9 -9,0" fill={motifColor} />
        {/* Dokra Dots */}
        <circle cx="0" cy="-21" r="2" fill={motifColor} />
        <circle cx="21" cy="0" r="2" fill={motifColor} />
        <circle cx="0" cy="21" r="2" fill={motifColor} />
        <circle cx="-21" cy="0" r="2" fill={motifColor} />
      </g>
    );
  };

  const currentDesignId = selectedDesign ? selectedDesign.id : 'tops';

  return (
    <section ref={sectionRef} id="customizer-section" className="py-10 lg:py-24 bg-[#F5EFE6]/60 border-y border-terracotta-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-warmGold-100 border border-warmGold-300 text-terracotta-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-warmGold-600" />
            <span>Interactive Bespoke Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-terracotta-950 tracking-tight">
            Design Your Custom Festive Piece
          </h2>
          <p className="mt-3 text-sm sm:text-base text-terracotta-800/80 leading-relaxed">
            Planning your look for Navratri Garba, temple rituals, or weddings? Pick your piece, specific silhouette design, theme, and glaze palette. Our Bishnupur master clay artisans will kiln-bake it just for you.
          </p>
        </div>

        {/* 2-Column Layout: Visual Interactive Preview (Left) + Selection Controls (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Dynamic Live Mockup & Preview Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-xl border border-terracotta-200/70 overflow-hidden relative">
              
              {/* Top Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-terracotta-100">
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-terracotta-600 uppercase block">
                    Live Atelier Preview
                  </span>
                  <h4 className="font-serif text-base font-bold text-terracotta-950">
                    {selectedDesign ? selectedDesign.name : selectedBase.name}
                  </h4>
                </div>
                <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                  <Clock size={12} className="text-terracotta-600" />
                  {selectedBase.timeDays}
                </span>
              </div>

              {/* Dynamic Interactive SVG Canvas */}
              <div className="my-4 sm:my-5 relative h-52 sm:h-80 w-full rounded-2xl bg-[#FAF7F2] border border-terracotta-100 flex items-center justify-center p-4 overflow-hidden shadow-inner">
                {/* Clay texture background effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none clay-grain" />

                {/* Festive Ambient Background Glow depending on active theme */}
                {selectedTheme.id === 'navratri' && (
                  <div className="absolute inset-0 bg-radial from-amber-400/15 via-terracotta-400/10 to-transparent pointer-events-none animate-pulse-subtle" />
                )}
                {selectedTheme.id === 'divine' && (
                  <div className="absolute inset-0 bg-radial from-yellow-300/20 via-warmGold-300/10 to-transparent pointer-events-none" />
                )}
                {selectedTheme.id === 'nature' && (
                  <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Interactive Dynamic SVG Mockup */}
                <svg viewBox="0 0 320 280" className="w-full h-full max-h-72 filter drop-shadow-md transition-all duration-500">
                  <defs>
                    <radialGradient id="customClayGrad" cx="45%" cy="45%" r="55%">
                      <stop offset="0%" stopColor={selectedPalette.hex} stopOpacity="0.88" />
                      <stop offset="100%" stopColor={selectedPalette.hex} stopOpacity="1" />
                    </radialGradient>
                    <filter id="previewShadow" x="-15%" y="-15%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#3D1D13" floodOpacity="0.28" />
                    </filter>
                  </defs>

                  {/* =========================================
                      1. EARRINGS SUB-DESIGNS
                     ========================================= */}
                  {selectedBase.id === 'earrings' && (
                    <g className="transition-all duration-500">
                      
                      {/* --- A: TOPS / STUDS --- */}
                      {currentDesignId === 'tops' && (
                        <g>
                          {/* Left Stud */}
                          <g transform="translate(100, 135)">
                            <circle cx="0" cy="0" r="38" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="2.5" />
                            <circle cx="0" cy="0" r="30" fill="none" stroke={selectedPalette.accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
                            {/* Theme Motif */}
                            {renderThemeMotif(0, 0, 1.15)}
                            {/* Stud ear post accent */}
                            <circle cx="0" cy="0" r="4" fill="#FAF7F2" opacity="0.6" />
                          </g>

                          {/* Right Stud */}
                          <g transform="translate(220, 135)">
                            <circle cx="0" cy="0" r="38" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="2.5" />
                            <circle cx="0" cy="0" r="30" fill="none" stroke={selectedPalette.accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
                            {/* Theme Motif */}
                            {renderThemeMotif(0, 0, 1.15)}
                            <circle cx="0" cy="0" r="4" fill="#FAF7F2" opacity="0.6" />
                          </g>
                        </g>
                      )}

                      {/* --- B: BELL JHUMKA --- */}
                      {currentDesignId === 'jhumka' && (
                        <g>
                          {/* Left Jhumka */}
                          <g transform="translate(100, 65)">
                            {/* Top Ear Stud */}
                            <circle cx="0" cy="0" r="14" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                            {renderThemeMotif(0, 0, 0.45)}
                            {/* Connecting Hook Ring */}
                            <line x1="0" y1="14" x2="0" y2="34" stroke="#B08022" strokeWidth="3" />
                            {/* Bell Dome */}
                            <path
                              d="M -34,80 C -34,38 34,38 34,80 Z"
                              fill="url(#customClayGrad)"
                              filter="url(#previewShadow)"
                              stroke="#FAF7F2"
                              strokeWidth="2"
                            />
                            {/* Engraved Bell Arch */}
                            <path d="M -26,68 Q 0,55 26,68" stroke={selectedPalette.accentColor} strokeWidth="2" fill="none" />
                            {/* Theme Motif on Bell Dome */}
                            {renderThemeMotif(0, 58, 0.7)}
                            {/* Hanging Ghungroos */}
                            {[-24, -14, -4, 6, 16, 26].map((x, i) => (
                              <g key={i}>
                                <line x1={x} y1="80" x2={x} y2="88" stroke="#B08022" strokeWidth="1.5" />
                                <circle cx={x} cy="92" r="4" fill={selectedFinish.id === 'gold-leaf' ? '#E0B74C' : '#FAF7F2'} />
                              </g>
                            ))}
                          </g>

                          {/* Right Jhumka */}
                          <g transform="translate(220, 65)">
                            <circle cx="0" cy="0" r="14" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                            {renderThemeMotif(0, 0, 0.45)}
                            <line x1="0" y1="14" x2="0" y2="34" stroke="#B08022" strokeWidth="3" />
                            <path
                              d="M -34,80 C -34,38 34,38 34,80 Z"
                              fill="url(#customClayGrad)"
                              filter="url(#previewShadow)"
                              stroke="#FAF7F2"
                              strokeWidth="2"
                            />
                            <path d="M -26,68 Q 0,55 26,68" stroke={selectedPalette.accentColor} strokeWidth="2" fill="none" />
                            {renderThemeMotif(0, 58, 0.7)}
                            {[-24, -14, -4, 6, 16, 26].map((x, i) => (
                              <g key={i}>
                                <line x1={x} y1="80" x2={x} y2="88" stroke="#B08022" strokeWidth="1.5" />
                                <circle cx={x} cy="92" r="4" fill={selectedFinish.id === 'gold-leaf' ? '#E0B74C' : '#FAF7F2'} />
                              </g>
                            ))}
                          </g>
                        </g>
                      )}

                      {/* --- C: CRESCENT CHANDBALI --- */}
                      {currentDesignId === 'chandbali' && (
                        <g>
                          {/* Left Chandbali */}
                          <g transform="translate(100, 75)">
                            <circle cx="0" cy="0" r="12" fill="url(#customClayGrad)" stroke="#FAF7F2" strokeWidth="1.5" />
                            <line x1="0" y1="12" x2="0" y2="28" stroke="#B08022" strokeWidth="2.5" />
                            {/* Crescent Moon Arc */}
                            <path
                              d="M -35,50 C -40,105 40,105 35,50 C 22,82 -22,82 -35,50 Z"
                              fill="url(#customClayGrad)"
                              filter="url(#previewShadow)"
                              stroke="#FAF7F2"
                              strokeWidth="2"
                            />
                            {/* Inner Moon Theme Motif */}
                            {renderThemeMotif(0, 70, 0.75)}
                            {/* Hanging Chandbali Droplets */}
                            {[-22, 0, 22].map((x, i) => (
                              <g key={i}>
                                <circle cx={x} cy="100" r="5" fill="#E0B74C" />
                              </g>
                            ))}
                          </g>

                          {/* Right Chandbali */}
                          <g transform="translate(220, 75)">
                            <circle cx="0" cy="0" r="12" fill="url(#customClayGrad)" stroke="#FAF7F2" strokeWidth="1.5" />
                            <line x1="0" y1="12" x2="0" y2="28" stroke="#B08022" strokeWidth="2.5" />
                            <path
                              d="M -35,50 C -40,105 40,105 35,50 C 22,82 -22,82 -35,50 Z"
                              fill="url(#customClayGrad)"
                              filter="url(#previewShadow)"
                              stroke="#FAF7F2"
                              strokeWidth="2"
                            />
                            {renderThemeMotif(0, 70, 0.75)}
                            {[-22, 0, 22].map((x, i) => (
                              <g key={i}>
                                <circle cx={x} cy="100" r="5" fill="#E0B74C" />
                              </g>
                            ))}
                          </g>
                        </g>
                      )}

                      {/* --- D: TIERED DANGLER --- */}
                      {currentDesignId === 'dangler' && (
                        <g>
                          {/* Left Dangler */}
                          <g transform="translate(105, 55)">
                            <polygon points="0,-12 12,0 0,12 -12,0" fill="url(#customClayGrad)" stroke="#FAF7F2" strokeWidth="1.5" />
                            <line x1="0" y1="12" x2="0" y2="30" stroke="#B08022" strokeWidth="2" />
                            <circle cx="0" cy="46" r="16" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                            {renderThemeMotif(0, 46, 0.55)}
                            <line x1="0" y1="62" x2="0" y2="80" stroke="#B08022" strokeWidth="2" />
                            <path d="M 0,80 L 16,120 L -16,120 Z" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                            {renderThemeMotif(0, 105, 0.6)}
                          </g>

                          {/* Right Dangler */}
                          <g transform="translate(215, 55)">
                            <polygon points="0,-12 12,0 0,12 -12,0" fill="url(#customClayGrad)" stroke="#FAF7F2" strokeWidth="1.5" />
                            <line x1="0" y1="12" x2="0" y2="30" stroke="#B08022" strokeWidth="2" />
                            <circle cx="0" cy="46" r="16" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                            {renderThemeMotif(0, 46, 0.55)}
                            <line x1="0" y1="62" x2="0" y2="80" stroke="#B08022" strokeWidth="2" />
                            <path d="M 0,80 L 16,120 L -16,120 Z" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                            {renderThemeMotif(0, 105, 0.6)}
                          </g>
                        </g>
                      )}

                    </g>
                  )}

                  {/* =========================================
                      2. NECKLACE SUB-DESIGNS
                     ========================================= */}
                  {selectedBase.id === 'necklace' && (
                    <g className="transition-all duration-500">
                      
                      {/* --- A: ROYAL HASLI CHOKER --- */}
                      {currentDesignId === 'hasli' && (
                        <g>
                          {/* Hasli Collar Arch */}
                          <path
                            d="M 50,75 Q 160,175 270,75"
                            fill="none"
                            stroke="#A38062"
                            strokeWidth="7"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 68,88 Q 160,180 252,88"
                            fill="none"
                            stroke={selectedPalette.hex}
                            strokeWidth="13"
                            strokeLinecap="round"
                            filter="url(#previewShadow)"
                          />
                          {/* Collar accent beads */}
                          <circle cx="160" cy="155" r="9" fill={selectedPalette.hex} />
                          {/* Main Statement Medallion */}
                          <circle
                            cx="160"
                            cy="195"
                            r="44"
                            fill="url(#customClayGrad)"
                            filter="url(#previewShadow)"
                            stroke="#FAF7F2"
                            strokeWidth="2.5"
                          />
                          <circle
                            cx="160"
                            cy="195"
                            r="34"
                            fill="none"
                            stroke={selectedPalette.accentColor}
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                          />
                          {/* Bold Theme Motif on Medallion */}
                          {renderThemeMotif(160, 195, 1.35)}
                          {/* Optional Ghungroos */}
                          {selectedFinish.id === 'tassel-ghungroo' && (
                            <g>
                              {[-22, 0, 22].map((x, i) => (
                                <circle key={i} cx={160 + x} cy="245" r="5" fill="#E0B74C" />
                              ))}
                            </g>
                          )}
                        </g>
                      )}

                      {/* --- B: LAYERED BEAD MALA --- */}
                      {currentDesignId === 'mala' && (
                        <g>
                          {/* Triple row bead strands */}
                          <path d="M 60,60 Q 160,140 260,60" fill="none" stroke={selectedPalette.hex} strokeWidth="6" strokeDasharray="6 6" />
                          <path d="M 50,75 Q 160,165 270,75" fill="none" stroke="#D58F69" strokeWidth="6" strokeDasharray="6 6" />
                          <path d="M 40,90 Q 160,190 280,90" fill="none" stroke={selectedPalette.hex} strokeWidth="6" strokeDasharray="6 6" />
                          {/* Blooming Center Medallion */}
                          <polygon
                            points="160,160 195,195 160,230 125,195"
                            fill="url(#customClayGrad)"
                            filter="url(#previewShadow)"
                            stroke="#FAF7F2"
                            strokeWidth="2"
                          />
                          {renderThemeMotif(160, 195, 1.1)}
                        </g>
                      )}

                      {/* --- C: MINIMALIST LOCKET CHOKER --- */}
                      {currentDesignId === 'pendant' && (
                        <g>
                          {/* Fine black/gold braided dori */}
                          <path d="M 50,70 Q 160,180 270,70" fill="none" stroke="#734D1E" strokeWidth="4" />
                          {/* Clean circular geometric locket */}
                          <circle cx="160" cy="180" r="38" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="2.5" />
                          <circle cx="160" cy="180" r="28" fill="none" stroke={selectedPalette.accentColor} strokeWidth="1.5" />
                          {renderThemeMotif(160, 180, 1.2)}
                        </g>
                      )}

                    </g>
                  )}

                  {/* =========================================
                      3. ARTISAN BUTTONS SUB-DESIGNS
                     ========================================= */}
                  {selectedBase.id === 'buttons' && (
                    <g className="transition-all duration-500">
                      
                      {/* --- A: SHERWANI DOME SET --- */}
                      {currentDesignId === 'sherwani' && (
                        <g>
                          {[
                            { x: 80, y: 70 },
                            { x: 160, y: 70 },
                            { x: 240, y: 70 },
                            { x: 80, y: 155 },
                            { x: 160, y: 155 },
                            { x: 240, y: 155 },
                            { x: 160, y: 235 }
                          ].map((pos, idx) => (
                            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
                              <circle cx="0" cy="0" r="25" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                              <circle cx="0" cy="0" r="18" fill="none" stroke={selectedPalette.accentColor} strokeWidth="1" strokeDasharray="2 2" />
                              {renderThemeMotif(0, 0, 0.65)}
                            </g>
                          ))}
                        </g>
                      )}

                      {/* --- B: KURTA FLAT ALPONA SET --- */}
                      {currentDesignId === 'kurta' && (
                        <g>
                          {[
                            { x: 85, y: 80 },
                            { x: 160, y: 80 },
                            { x: 235, y: 80 },
                            { x: 85, y: 175 },
                            { x: 160, y: 175 },
                            { x: 235, y: 175 }
                          ].map((pos, idx) => (
                            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
                              <circle cx="0" cy="0" r="27" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="2" />
                              <circle cx="0" cy="0" r="20" fill="none" stroke={selectedPalette.accentColor} strokeWidth="1" />
                              {renderThemeMotif(0, 0, 0.75)}
                            </g>
                          ))}
                        </g>
                      )}

                      {/* --- C: BLOUSE & SAREE BROOCH BUTTONS --- */}
                      {currentDesignId === 'brooch' && (
                        <g>
                          {[
                            { x: 105, y: 95 },
                            { x: 215, y: 95 },
                            { x: 105, y: 195 },
                            { x: 215, y: 195 }
                          ].map((pos, idx) => (
                            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
                              {/* Scalloped outer edge */}
                              <circle cx="0" cy="0" r="38" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="2.5" />
                              <circle cx="0" cy="0" r="28" fill="none" stroke="#E0B74C" strokeWidth="2" strokeDasharray="3 3" />
                              {renderThemeMotif(0, 0, 1.0)}
                            </g>
                          ))}
                        </g>
                      )}

                    </g>
                  )}

                  {/* =========================================
                      4. FESTIVE ENSEMBLES
                     ========================================= */}
                  {selectedBase.id === 'full-set' && (
                    <g className="transition-all duration-500">
                      {/* Collar Hasli on top */}
                      <path d="M 85,65 Q 160,135 235,65" fill="none" stroke={selectedPalette.hex} strokeWidth="9" strokeLinecap="round" filter="url(#previewShadow)" />
                      <circle cx="160" cy="145" r="30" fill="url(#customClayGrad)" filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="2" />
                      {renderThemeMotif(160, 145, 0.9)}

                      {/* Left Matching Piece */}
                      <g transform="translate(65, 175)">
                        <circle cx="0" cy="0" r="8" fill={selectedPalette.hex} />
                        <path d="M -18,32 C -18,12 18,12 18,32 Z" fill={selectedPalette.hex} filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                        {renderThemeMotif(0, 24, 0.45)}
                        <circle cx="0" cy="38" r="3.5" fill="#E0B74C" />
                      </g>

                      {/* Right Matching Piece */}
                      <g transform="translate(255, 175)">
                        <circle cx="0" cy="0" r="8" fill={selectedPalette.hex} />
                        <path d="M -18,32 C -18,12 18,12 18,32 Z" fill={selectedPalette.hex} filter="url(#previewShadow)" stroke="#FAF7F2" strokeWidth="1.5" />
                        {renderThemeMotif(0, 24, 0.45)}
                        <circle cx="0" cy="38" r="3.5" fill="#E0B74C" />
                      </g>
                    </g>
                  )}

                </svg>

                {/* Floating active palette badge on preview */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-semibold text-terracotta-900 border border-terracotta-200 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedPalette.hex }}></span>
                  <span>{selectedPalette.name.split(' ')[0]}</span>
                </div>
              </div>

              {/* Prominent Active Festive Theme HUD Banner */}
              <div className="hidden sm:flex p-3 rounded-xl bg-terracotta-50 border border-terracotta-200/80 mb-4 items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-base">
                    {selectedTheme.id === 'navratri' ? '🪔' : selectedTheme.id === 'divine' ? '🕉️' : selectedTheme.id === 'nature' ? '🌿' : '🏺'}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-terracotta-600 tracking-wider block">
                      Theme Motif Applied
                    </span>
                    <span className="text-xs font-bold text-terracotta-950">
                      {selectedTheme.name}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-stone-500 bg-white px-2.5 py-1 rounded-full border border-terracotta-200">
                  Motif: {selectedTheme.motif}
                </span>
              </div>

              {/* Order Specification Summary */}
              <div className="hidden sm:block space-y-2 py-3 border-y border-terracotta-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Selected Design:</span>
                  <span className="font-semibold text-terracotta-950">{selectedDesign ? selectedDesign.name : selectedBase.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Theme Motif:</span>
                  <span className="font-semibold text-terracotta-950">{selectedTheme.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Clay Glaze:</span>
                  <span className="font-semibold text-terracotta-950">{selectedPalette.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Artisan Finish:</span>
                  <span className="font-semibold text-terracotta-950">{selectedFinish.name}</span>
                </div>
              </div>

              {/* Total Price & Add to Bag Action */}
              <div className="hidden lg:flex pt-4 items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">Artisan Price</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-serif text-terracotta-950">₹{totalPrice}</span>
                    <span className="text-xs text-stone-400 line-through">₹{totalPrice + 450}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddCustomToCart}
                  className={`px-5 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center space-x-2 shadow-md ${
                    isSuccess
                      ? 'bg-green-700 text-white'
                      : 'bg-terracotta-700 text-white hover:bg-terracotta-800 hover:shadow-lg'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Craft & Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Step-by-Step Customizer Selection Options */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            
            {/* STEP 1: Choose Base Category & Specific Silhouette Design */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-terracotta-200/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-terracotta-700 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-serif text-lg font-bold text-terracotta-950">Select Base Item & Design Silhouette</h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">Step 1 of 4</span>
              </div>

              {/* Base Category Selector */}
              <label className="block text-xs font-semibold text-stone-600 mb-2">Item Category:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {CUSTOMIZER_DATA.itemBases.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => handleSelectBase(base)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all text-center flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-700 text-white shadow-sm'
                          : 'border-terracotta-200 hover:border-terracotta-400 bg-white text-terracotta-950'
                      }`}
                    >
                      <span>{base.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-Designs Grid for Selected Base */}
              <label className="block text-xs font-semibold text-stone-600 mb-2">
                Choose {selectedBase.name} Silhouette:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedBase.designs?.map((design) => {
                  const isSelected = selectedDesign && selectedDesign.id === design.id;
                  return (
                    <div
                      key={design.id}
                      onClick={() => setSelectedDesign(design)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-50/70 shadow-sm'
                          : 'border-terracotta-100 hover:border-terracotta-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-terracotta-950">{design.name}</span>
                        {isSelected && <Check size={16} className="text-terracotta-600" />}
                      </div>
                      <p className="text-[11px] text-terracotta-800/70 mt-1">{design.subtitle}</p>
                      <div className="mt-2 text-xs font-semibold text-terracotta-700">₹{design.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Sacred Theme & Occasion (Navratri, Temple, Nature, Tribal) */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-terracotta-200/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-terracotta-700 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="font-serif text-lg font-bold text-terracotta-950">Choose Festive Theme / Occasion</h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">Step 2 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOMIZER_DATA.themes.map((theme) => {
                  const isSelected = selectedTheme.id === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-50/70 shadow-sm ring-1 ring-terracotta-400'
                          : 'border-terracotta-100 hover:border-terracotta-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span>{theme.id === 'navratri' ? '🪔' : theme.id === 'divine' ? '🕉️' : theme.id === 'nature' ? '🌿' : '🏺'}</span>
                          <span className="text-xs font-bold text-terracotta-950">{theme.name}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-terracotta-600 bg-terracotta-100 px-2 py-0.5 rounded-full">
                          +{theme.priceModifier ? `₹${theme.priceModifier}` : 'Free'}
                        </span>
                      </div>
                      <p className="text-[11px] text-terracotta-800/70 mt-1">{theme.subtitle}</p>
                      <div className="mt-2 text-[10px] font-medium text-stone-500 uppercase tracking-wider">
                        Motif: <strong>{theme.motif}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Clay Glaze & Mineral Palette */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-terracotta-200/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-terracotta-700 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="font-serif text-lg font-bold text-terracotta-950">Clay Glaze & Mineral Palette</h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">Step 3 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CUSTOMIZER_DATA.palettes.map((palette) => {
                  const isSelected = selectedPalette.id === palette.id;
                  return (
                    <div
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-50/70 shadow-sm'
                          : 'border-terracotta-100 hover:border-terracotta-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className="w-5 h-5 rounded-full shadow-inner border border-black/10 shrink-0"
                          style={{ backgroundColor: palette.hex }}
                        />
                        <span className="text-xs font-bold text-terracotta-950 leading-tight">{palette.name}</span>
                      </div>
                      <p className="text-[10px] text-terracotta-800/70">{palette.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Hand-crafted Finish & Details */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-terracotta-200/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-terracotta-700 text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="font-serif text-lg font-bold text-terracotta-950">Artisan Finish & Accents</h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">Step 4 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CUSTOMIZER_DATA.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <div
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-50/70 shadow-sm'
                          : 'border-terracotta-100 hover:border-terracotta-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-terracotta-950">{finish.name}</span>
                          {isSelected && <Check size={14} className="text-terracotta-600" />}
                        </div>
                        <p className="text-[10px] text-terracotta-800/70 mt-1">{finish.description}</p>
                      </div>
                      <div className="mt-2 text-xs font-semibold text-terracotta-700">
                        {finish.cost === 0 ? 'Included' : `+₹${finish.cost}`}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Artisan Note Input */}
              <div className="mt-5 pt-4 border-t border-terracotta-100">
                <label className="block text-xs font-semibold text-terracotta-900 mb-1.5">
                  Artisan Instructions / Specific Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please use mustard yellow dori, match with my Navratri choli..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-terracotta-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-terracotta-900 placeholder:text-gray-400 bg-[#FAF7F2]/50"
                />
              </div>

              {/* Reset link */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetCustomizer}
                  className="text-xs text-stone-500 hover:text-terracotta-700 flex items-center space-x-1"
                >
                  <RotateCcw size={12} />
                  <span>Reset Selections</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {isSectionVisible && (
          <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-terracotta-200 px-4 pt-3 pb-safe shadow-[0_-8px_24px_rgba(52,20,11,0.12)]">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <div className="shrink-0">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Artisan Price</span>
                <span className="text-xl font-bold font-serif text-terracotta-950">₹{totalPrice}</span>
              </div>
              <button
                onClick={handleAddCustomToCart}
                className={`flex-1 max-w-sm px-4 py-3 rounded-full font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md ${
                  isSuccess ? 'bg-green-700 text-white' : 'bg-terracotta-700 text-white hover:bg-terracotta-800'
                }`}
              >
                {isSuccess ? <Check size={16} /> : <ShoppingBag size={16} />}
                <span>{isSuccess ? 'Added to Bag!' : 'Craft & Add to Bag'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
