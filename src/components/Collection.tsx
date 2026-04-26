import { motion, AnimatePresence } from "motion/react";
import { Hash, X, ShieldCheck, Zap, Search, Filter, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { NFT_COLLECTION, NFTItem } from "../constants.ts";
import { useWallet } from "../context/WalletContext";
import { useTranslation } from "../context/LanguageContext";

export default function Collection() {
  const { t, language } = useTranslation();
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [search, setSearch] = useState("");
  const [activeIsland, setActiveIsland] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const { ownedNfts, isConnected } = useWallet();

  const ISLANDS = useMemo(() => ["All", ...Array.from(new Set(NFT_COLLECTION.map(item => item.island)))].sort(), []);
  
  const REGIONS = useMemo(() => {
    const list = NFT_COLLECTION
      .filter(item => activeIsland === "All" || item.island === activeIsland)
      .map(item => item.region);
    return ["All", ...Array.from(new Set(list))].sort();
  }, [activeIsland]);

  const CATEGORIES = ["All", "Divine", "Mythic", "Legendary", "Epic", "Rare", "Common"];

  const filteredNFTs = useMemo(() => {
    return NFT_COLLECTION.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.region.toLowerCase().includes(search.toLowerCase()) ||
                            item.outfit.toLowerCase().includes(search.toLowerCase()) ||
                            item.island.toLowerCase().includes(search.toLowerCase());
      const matchesIsland = activeIsland === "All" || item.island === activeIsland;
      const matchesRegion = activeRegion === "All" || item.region === activeRegion;
      const matchesCategory = activeCategory === "All" || item.rarity === activeCategory;
      
      return matchesSearch && matchesIsland && matchesRegion && matchesCategory;
    });
  }, [search, activeIsland, activeRegion, activeCategory]);

  return (
    <section id="collection" className="section-padding bg-luxury-black relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-luxury-purple text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] mb-4 block text-glow">{t("collection.badge")}</span>
            <h2 className="text-[length:var(--font-size-fluid-h2)] font-display text-white tracking-tighter leading-none uppercase">{t("collection.title_1")}<br/><span className="gold-text">{t("collection.title_2")}</span></h2>
          </motion.div>
          
          <div className="w-full lg:max-w-xl space-y-6 md:space-y-10">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 inset-inline-start-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-white/20 group-focus-within:text-luxury-gold transition-colors" />
              </div>
              <input 
                type="text"
                placeholder={t("collection.search_placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] py-4 md:py-6 ps-14 md:ps-16 pe-6 md:pe-8 text-sm md:text-md text-white placeholder:text-white/10 focus:outline-none focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 transition-all font-sans font-light tracking-wide"
              />
            </div>

            {/* Island Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3 font-sans pb-2">
               {ISLANDS.map(island => (
                 <button
                   key={island}
                   onClick={() => {
                     setActiveIsland(island);
                     setActiveRegion("All");
                   }}
                   className={`px-3 md:px-4 py-2 rounded-[0.8rem] md:rounded-xl text-[8px] md:text-[10px] font-bold tracking-widest uppercase transition-all border ${
                     activeIsland === island 
                      ? "bg-luxury-purple text-white border-luxury-purple shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                      : "bg-white/[0.02] text-white/40 border-white/5 hover:border-white/20"
                   }`}
                 >
                   {island === "All" ? t("nav.all") || "All" : island}
                 </button>
               ))}
            </div>

            {/* Region/Suku Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3 font-sans max-h-32 overflow-y-auto scrollbar-hide py-2 border-t border-white/5">
               {REGIONS.map(region => (
                 <button
                   key={region}
                   onClick={() => setActiveRegion(region)}
                   className={`px-3 md:px-4 py-2 rounded-[0.8rem] md:rounded-xl text-[8px] md:text-[10px] font-bold tracking-widest uppercase transition-all border ${
                     activeRegion === region 
                      ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                      : "bg-white/[0.02] text-white/40 border-white/5 hover:border-white/20"
                   }`}
                 >
                   {region === "All" ? t("collection.filter_regions") || "All Suku" : region}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-6 md:gap-8 mb-12 border-b border-white/5 overflow-x-auto scrollbar-hide pb-1 -mx-2 px-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative py-4 text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase transition-all whitespace-nowrap ${
                activeCategory === cat ? "text-luxury-gold" : "text-white/30 hover:text-white/60"
              }`}
            >
              {cat === "All" ? t("nav.all") || "All" : t(`rarity.${cat.toLowerCase()}`) || cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 inset-inline-0 h-0.5 bg-luxury-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredNFTs.map((item, idx) => {
              const isOwned = isConnected && ownedNfts.includes(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedNFT(item)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Card Container */}
                  <div className="relative aspect-[3/4.5] overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] group-hover:border-luxury-gold/50 transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] group-hover:-translate-y-4 ring-1 ring-white/5 group-hover:ring-luxury-gold/30">
                    {/* Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-90 z-10" />
                    <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/[0.08] transition-colors duration-700 z-10" />

                    {/* Owned Badge */}
                    {isOwned && (
                      <div className="absolute top-4 inset-inline-start-4 z-30 px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-full flex items-center gap-1.5 shadow-lg">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                        <span className="text-[8px] font-bold tracking-widest text-green-500 uppercase">{t("collection.owned")}</span>
                      </div>
                    )}

                  {/* NFT Image */}
                  <img
                    src={item.image}
                    alt={`${item.name} ${item.outfit}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between mb-3">
                         <span className={`px-3 py-1 rounded-full text-[8px] font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-md border border-white/10 text-white/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-luxury-gold/20 transition-shadow duration-500`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full me-2 shadow-[0_0_8px_currentColor] ${
                            item.rarity === 'Divine' ? 'text-white bg-white animate-pulse' :
                            item.rarity === 'Mythic' ? 'text-red-500 bg-red-500' :
                            item.rarity === 'Legendary' ? 'text-yellow-400 bg-yellow-400' :
                            item.rarity === 'Epic' ? 'text-purple-400 bg-purple-400' :
                            item.rarity === 'Rare' ? 'text-blue-400 bg-blue-400' : 'text-gray-400 bg-gray-400'
                          }`} />
                          {item.rarity}
                        </span>
                        <span className="text-[10px] text-white/40 flex items-center gap-1 font-mono">
                          #{item.id.padStart(4, '0')}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl text-white group-hover:text-luxury-gold transition-colors duration-300">{item.name} <span className="text-luxury-gold/70">{item.outfit}</span></h3>
                      <p className="text-[10px] text-white/50 tracking-[0.2em] font-medium uppercase mt-2">
                         {item.region}
                      </p>
                    </div>
                    
                    {/* Hover Reveal Button */}
                    <motion.div 
                      className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                    >
                      <div className="w-full py-3 bg-luxury-gold text-black rounded-lg text-[10px] font-bold tracking-widest flex items-center justify-center gap-2">
                        {t("collection.inspect")}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
          
          {filteredNFTs.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
              <Filter className="w-12 h-12 text-white/10 mb-6" />
              <h3 className="text-xl font-display text-white mb-2">{t("collection.no_records")}</h3>
              <p className="text-white/30 text-sm">{t("collection.adjust_filters")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedNFT && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNFT(null)}
              className="absolute inset-0 bg-luxury-black/95 backdrop-blur-2xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-6xl glass rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-luxury-gold/30 flex flex-col lg:flex-row shadow-[0_0_50px_rgba(212,175,55,0.15)] ring-1 ring-luxury-gold/20 max-h-[90vh] md:max-h-none"
            >
              <button 
                onClick={() => setSelectedNFT(null)}
                className="absolute top-4 inset-inline-end-4 md:top-6 md:inset-inline-end-6 z-50 p-2 md:p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:border-luxury-gold/50 transition-all group"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-luxury-gold" />
              </button>

              {/* Image Section - Cinematic */}
              <div className="w-full lg:w-1/2 relative bg-black flex items-center justify-center overflow-hidden group min-h-[300px] lg:min-h-0">
                <motion.img 
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={selectedNFT.image} 
                  alt={selectedNFT.name} 
                  className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-100 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r ltr:from-transparent ltr:via-transparent ltr:to-black/60 lg:ltr:to-luxury-black rtl:from-black/60 lg:rtl:from-luxury-black rtl:via-transparent rtl:to-transparent hidden lg:block" />
                
                {/* Rarity Aura */}
                <div className={`absolute bottom-0 inset-inline-0 h-1/2 bg-gradient-to-t opacity-40 mix-blend-screen pointer-events-none ${
                    selectedNFT.rarity === 'Divine' ? 'from-white/20' :
                    selectedNFT.rarity === 'Mythic' ? 'from-red-500/20' :
                    selectedNFT.rarity === 'Legendary' ? 'from-yellow-400/20' :
                    selectedNFT.rarity === 'Epic' ? 'from-purple-400/20' :
                    selectedNFT.rarity === 'Rare' ? 'from-blue-400/20' : 'from-gray-400/20'
                  }`} />
              </div>

              {/* Detailed Info Section */}
              <div className="w-full lg:w-1/2 p-6 md:p-14 overflow-y-auto max-h-[60vh] lg:max-h-none scrollbar-hide">
                <motion.div
                  initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Header */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                      <span className={`px-4 py-1 rounded-full text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase border ${
                        selectedNFT.rarity === 'Divine' ? 'bg-white/10 border-white text-white' :
                        selectedNFT.rarity === 'Mythic' ? 'bg-red-500/10 border-red-500 text-red-500' :
                        selectedNFT.rarity === 'Legendary' ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400' :
                        selectedNFT.rarity === 'Epic' ? 'bg-purple-500/10 border-purple-500 text-purple-500' :
                        selectedNFT.rarity === 'Rare' ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'bg-gray-500/10 border-gray-500 text-gray-500'
                      }`}>
                        {t(`rarity.${selectedNFT.rarity.toLowerCase()}`)} {t("details.class") || "CLASS"}
                      </span>
                      <span className="text-white/20 font-mono text-[10px] md:text-xs letter text-wide uppercase">{t("details.archive_id")}: #{selectedNFT.id.padStart(4, '0')}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display text-white mb-2 tracking-tight leading-none">{selectedNFT.name} <span className="text-luxury-gold/70">{selectedNFT.outfit}</span></h2>
                    <p className="text-luxury-gold font-medium tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase">{selectedNFT.region} {t("details.dynasty")} • {t("details.sovereign")}</p>
                  </div>

                  {/* Lore Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/5">
                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">{t("details.chronicles")}</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light italic">
                        "{selectedNFT.lore}"
                      </p>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">{t("details.cultural_weight")}</h4>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light">
                        {selectedNFT.culturalMeaning}
                      </p>
                    </div>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 p-1">
                    {[
                      { label: t("details.spirit"), value: selectedNFT.spirit, sub: "Manifestation" },
                      { label: t("details.element"), value: selectedNFT.element, sub: "Nature Core" },
                      { label: t("details.region"), value: selectedNFT.region, sub: "Regional Gate" },
                      { label: t("details.armor"), value: selectedNFT.outfit, sub: "Heritage Wear" }
                    ].map((attr, i) => (
                      <div key={i} className="p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-[1rem] md:rounded-2xl">
                        <span className="text-[8px] text-white/30 uppercase tracking-widest block mb-1">{attr.label}</span>
                        <span className="text-[10px] md:text-xs font-bold text-white block truncate">{attr.value}</span>
                        <span className="text-[8px] text-luxury-gold/50 uppercase tracking-widest mt-1 block font-medium">{attr.sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ability & Hierarchy */}
                  <div className="space-y-4">
                     <div className="p-5 md:p-6 glass rounded-[1.5rem] md:rounded-2.5rem border border-luxury-gold/10 relative overflow-hidden group">
                        <div className="absolute top-0 inset-inline-end-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                          <Zap className="w-10 h-10 md:w-12 md:h-12 text-luxury-gold" />
                        </div>
                        <span className="text-[9px] md:text-[10px] text-luxury-gold uppercase tracking-[0.3em] block mb-2 md:mb-3 font-bold">{t("details.primary_protocol")}</span>
                        <h5 className="text-md md:text-lg font-display text-white mb-2">{selectedNFT.ability.split(':')[0]}</h5>
                        <p className="text-[10px] md:text-xs text-white/50 leading-relaxed italic">
                          {selectedNFT.ability.split(':')[1]}
                        </p>
                     </div>
                     <p className="text-[8px] md:text-[9px] text-white/20 leading-relaxed uppercase tracking-[0.15em] md:tracking-[0.2em] text-center">
                        {t("details.hierarchy")}: {selectedNFT.rarityReason}
                     </p>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 pt-4">
                    <button className="w-full flex-1 py-4 md:py-5 bg-luxury-gold text-luxury-black font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 rounded-full md:rounded-none">
                      {t("details.engage")}
                    </button>
                    <a 
                      href={selectedNFT.openseaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-10 py-4 md:py-5 glass border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase rounded-full md:rounded-none flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-luxury-gold" />
                      OpenSea
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Cinematic Overlay */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

