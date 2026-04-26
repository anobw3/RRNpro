import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { NFT_COLLECTION } from "../constants";
import { useTranslation } from "../context/LanguageContext";
import Container from "../layout/Container";

import { NFTImage } from "./nft/NFTCard";

export default function Hero() {
  const { t } = useTranslation();
  const featuredNFT = NFT_COLLECTION[0]; // Usually Aceh Ulee Balang

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-luxury-gold/10 blur-[150px] hero-glow-optimized rounded-full pointer-events-none opacity-50 z-0 animate-pulse" />
      <div className="absolute top-1/4 left-3/4 w-96 h-96 bg-luxury-purple/10 blur-[120px] hero-glow-optimized rounded-full pointer-events-none opacity-30 z-0 animate-bounce" style={{ animationDuration: '8s' }} />

      {/* Grid Decal */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4AF37 1.5px, transparent 1.5px)", backgroundSize: "60px 60px" }} />
      
      <Container className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
        <motion.div 
          className="flex flex-col gap-6 md:gap-8 text-center lg:text-start order-2 lg:order-first"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-luxury-gold/30 text-[9px] md:text-[10px] tracking-[.4em] uppercase text-luxury-gold w-fit font-bold mx-auto lg:ms-0 glass rounded-full">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
            {t("hero.badge")}
          </div>
          
          <h1 className="text-[length:var(--font-size-fluid-hero)] font-display leading-[1] md:leading-[0.85] tracking-tighter uppercase">
            {t("hero.title_1")}<br />
            <span className="italic font-light opacity-60 text-[0.6em] sm:text-[0.7em]">{t("hero.title_2")}</span><br />
            <span className="gold-text uppercase font-bold tracking-[-0.05em]">{t("hero.title_3")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl mx-auto lg:ms-0 balance">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <motion.button 
              className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-luxury-gold text-black text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.3em] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-4 group rounded-full"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("hero.btn_enter")} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:ltr:translate-x-2 group-hover:rtl:-translate-x-2 transition-transform rtl:rotate-180" />
            </motion.button>
            <motion.button 
              className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 premium-blur border border-white/10 text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.3em] hover:border-luxury-gold/50 transition-all flex items-center justify-center gap-4 group rounded-full"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                <Play className="w-2 h-2 sm:w-3 sm:h-3 fill-white group-hover:fill-luxury-gold transition-colors" />
              </div> {t("hero.btn_manifesto")}
            </motion.button>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-10 border-t border-white/5 grid grid-cols-3 gap-6 md:gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-luxury-gold text-2xl md:text-3xl font-display">10</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 font-bold">{t("hero.stats_units")}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-luxury-gold text-2xl md:text-3xl font-display">{featuredNFT.price} ETH</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 font-bold">Floor Price</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-luxury-gold text-2xl md:text-3xl font-display">100%</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 font-bold">Provenance</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Card Display */}
        <motion.div 
          className="relative flex items-center justify-center p-4 sm:p-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Decorative Rings - Hidden on small mobile to save CPU */}
          <div className="absolute w-[120%] aspect-square border border-luxury-gold/10 rounded-full animate-[spin_20s_linear_infinite] hidden md:block" />
          <div className="absolute w-[140%] aspect-square border border-luxury-purple/5 rounded-full animate-[spin_30s_linear_infinite_reverse] hidden md:block" />
          
          <motion.div 
            className="relative w-full max-w-[280px] sm:max-w-[380px] glass-gold divine-glow overflow-hidden flex flex-col rounded-[2.5rem] shadow-2xl ring-1 ring-luxury-gold/30"
            animate={typeof window !== 'undefined' && window.innerWidth > 768 ? { 
              y: [0, -25, 0],
              rotate: [0, 2, -2, 0],
              filter: ["drop-shadow(0 0 20px rgba(212,175,55,0.2))", "drop-shadow(0 0 40px rgba(212,175,55,0.4))", "drop-shadow(0 0 20px rgba(212,175,55,0.2))"]
            } : {}}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* Image Area - Clean & Taller with Head Visible */}
            <div className="relative aspect-[4/5] min-h-[280px] sm:min-h-[360px] bg-gradient-to-b from-[#1A1A23] to-[#0a0a0a] overflow-hidden group flex items-start justify-center pt-8 sm:pt-12 px-6">
              <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                <NFTImage 
                  src={featuredNFT.image} 
                  className="w-full h-full transition-transform duration-1000 md:group-hover:scale-[1.02]" 
                  alt={featuredNFT.name}
                />
              </div>
              
              {/* Subtle Gradient Shadow for bottom depth without cutting head */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
              
              <div className="absolute top-6 inset-inline-end-6 px-3 py-1 glass rounded-full text-[8px] font-bold tracking-[0.2em] text-luxury-gold flex items-center gap-2 z-20">
                <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse" />
                LIVE AUCTION
              </div>
            </div>

            {/* Info Section - Now clearly separated below image */}
            <div className="p-8 pb-10 flex flex-col gap-6 flex-1 bg-[#0a0a0a] z-20 border-t border-white/5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold">
                    {featuredNFT.rarity} Raccoon
                  </div>
                  <div className="text-[10px] text-white/30 font-mono tracking-tighter">
                    #0{featuredNFT.id}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-4xl font-display text-white leading-none tracking-tight uppercase mb-1">
                  {featuredNFT.name}
                </h3>
                <p className="text-xs text-white/50 italic font-light tracking-wide">
                  {featuredNFT.outfit} Costume
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[9px] tracking-[0.1em] uppercase text-white/40 font-bold">
                  <span>Biological Integrity</span>
                  <span className="text-luxury-gold">99.9%</span>
                </div>
                <div className="h-1.5 bg-white/5 w-full rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-gold"
                     initial={{ width: 0 }}
                     whileInView={{ width: '99.9%' }}
                     transition={{ duration: 2, delay: 1 }}
                    />
                </div>
              </div>

              <div className="mt-auto pt-6 flex justify-between items-center border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/30 uppercase tracking-[0.15em] font-bold">Heritage Code</span>
                  <span className="text-sm font-bold tracking-tighter text-white/90">NUS-GEN-{featuredNFT.id.padStart(3, '0')}</span>
                </div>
                <motion.div 
                  className="w-12 h-12 glass border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:border-luxury-gold/50 transition-all shadow-xl"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(212,175,55,0.1)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight className="w-5 h-5 text-luxury-gold rtl:rotate-180" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Background Section indicators */}
      <div className="absolute inset-inline-end-0 bottom-40 vertical-text hidden xl:block opacity-20 pointer-events-none">
        <span className="text-[120px] font-display font-black leading-none uppercase select-none">RACCOON</span>
      </div>
    </section>
  );
}
