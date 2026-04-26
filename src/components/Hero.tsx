import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { NFT_IMAGES } from "../assets/images";
import { useTranslation } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-[100vh] lg:min-h-screen flex items-center justify-center pt-24 pb-20 px-6 sm:px-12 section-padding overflow-hidden">
      {/* Grid Decal */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4AF37 1.5px, transparent 1.5px)", backgroundSize: "60px 60px" }} />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
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
              <span className="text-luxury-gold text-2xl md:text-3xl font-display">8.5 ETH</span>
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
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Decorative Rings */}
          <div className="absolute w-[120%] aspect-square border border-luxury-gold/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[140%] aspect-square border border-luxury-purple/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          
          <motion.div 
            className="relative w-full max-w-[380px] aspect-[3/4.5] glass-gold divine-glow overflow-hidden flex flex-col rounded-[2.5rem] shadow-2xl ring-1 ring-luxury-gold/30"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-2/3 bg-gradient-to-b from-[#1A1A23] to-luxury-black overflow-hidden group">
              <img 
                src={NFT_IMAGES.HERO_SOVEREIGN} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                referrerPolicy="no-referrer"
                alt="Featured Sovereign"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-6 inset-inline-end-6 px-3 py-1 glass rounded-full text-[8px] font-bold tracking-widest text-luxury-gold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse" />
                LIVE AUCTION
              </div>

              <div className="absolute bottom-6 inset-inline-start-6 inset-inline-end-6">
                <div className="text-[10px] uppercase tracking-widest text-luxury-gold mb-1 font-bold">Divine Raccoon</div>
                <div className="text-3xl font-display text-white">Royal Raccoon Aceh</div>
                <div className="text-xs text-white/60 italic font-light">Ulee Balang Costume</div>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-4 flex-1 justify-center">
              <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-white/50 font-bold">
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
              <div className="mt-4 p-4 rounded-xl border border-white/5 bg-white/[0.03] flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Heritage Code</span>
                  <span className="text-sm font-bold tracking-tighter">NUS-GEN-001</span>
                </div>
                <motion.div 
                  className="w-10 h-10 glass rounded-full flex items-center justify-center cursor-pointer hover:border-luxury-gold/50"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight className="w-4 h-4 text-luxury-gold rtl:rotate-180" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Section indicators */}
      <div className="absolute inset-inline-end-0 bottom-40 vertical-text hidden xl:block opacity-20 pointer-events-none">
        <span className="text-[120px] font-display font-black leading-none uppercase select-none">RACCOON</span>
      </div>
    </section>
  );
}
