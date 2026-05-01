<<<<<<< HEAD
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
=======
import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Wallet, Zap } from "lucide-react";
import { NFT_COLLECTION } from "../constants";
import { useTranslation } from "../context/LanguageContext";
import { useWallet } from "../context/WalletContext";
import Container from "../layout/Container";

import NFTCard from "./nft/NFTCard";
import { nftDatabase } from "../data/nftDatabase";
import MintModal from "./MintModal";

const Hero = memo(() => {
  const { t } = useTranslation();
  const { isConnected, connect, isMinting, mint, totalMinted, maxSupply, mintProgress, error: walletError, mintSuccess, txHash } = useWallet();
  const featuredNFTMetadata = nftDatabase.JAVA.find(n => n.id === 50) || nftDatabase.SUMATRA[0];

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mintStatus, setMintStatus] = useState<{ isOpen: boolean; status: "success" | "error"; message?: string }>({
    isOpen: false,
    status: "success"
  });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Sync modal when minting completes
  useEffect(() => {
    if (mintSuccess) {
      setMintStatus({
        isOpen: true,
        status: "success",
        message: "Your Spirit has awakened! The Royal Raccoon is now yours."
      });
    }
  }, [mintSuccess]);

  useEffect(() => {
    if (walletError && isMinting === false && !mintSuccess) {
      setMintStatus({
        isOpen: true,
        status: "error",
        message: walletError
      });
    }
  }, [walletError, isMinting, mintSuccess]);

  useEffect(() => {
    // Set landing date to 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((difference % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAction = useCallback(async () => {
    if (isConnected) {
      console.log("[Hero] Minting item: 1");
      await mint("1");
    } else {
      console.log("[Hero] Connecting wallet");
      connect();
    }
  }, [isConnected, connect, mint]);

  return (
    <section id="hero" className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative min-h-screen items-center overflow-visible ambient-glow">
      <MintModal 
        isOpen={mintStatus.isOpen} 
        onClose={() => setMintStatus({ ...mintStatus, isOpen: false })} 
        status={mintStatus.status}
        message={mintStatus.message}
        txHash={txHash || undefined}
      />
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-accent-gold-soft blur-[150px] rounded-full pointer-events-none opacity-40 z-0" />
      <div className="absolute top-1/4 left-3/4 w-96 h-96 bg-accent-gold-soft/10 blur-[120px] rounded-full pointer-events-none opacity-20 z-0" />
      
      <div className="w-full max-w-5xl text-center mx-auto z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* TOP LOGO AND BADGE */}
          <div className="flex flex-col items-center gap-5 mb-10 relative">
            {/* Fire/Flame Aura Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none z-0">
               <motion.div 
                 animate={{ 
                   scale: [1, 1.2, 1],
                   opacity: [0.3, 0.6, 0.3],
                   rotate: [0, 10, -10, 0]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-accent-gold-soft/30 blur-[40px] rounded-full"
               />
               <motion.div 
                 animate={{ 
                   scale: [1.2, 1.4, 1.2],
                   opacity: [0.2, 0.4, 0.2],
                   y: [0, -20, 0]
                 }}
                 transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                 className="absolute inset-0 bg-accent-gold-soft/20 blur-[50px] rounded-full"
               />
               {/* Embers - Reduced for mobile */}
               {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ 
                     opacity: [0, 1, 0],
                     scale: [0, 1, 0],
                     y: -100 - (Math.random() * 100),
                     x: (Math.random() - 0.5) * 100
                   }}
                   transition={{ 
                     duration: 2 + Math.random() * 2, 
                     repeat: Infinity, 
                     delay: Math.random() * 3 
                   }}
                   className="absolute left-1/2 bottom-1/2 w-1 h-1 bg-yellow-400 rounded-full blur-[1px]"
                 />
               ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -8, 0]
              }}
              transition={{ 
                delay: 0.2, 
                duration: 1,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="w-28 h-28 sm:w-36 sm:h-36 mb-2 relative z-10"
            >
              <div className="absolute inset-0 bg-accent-gold-soft blur-[30px] rounded-full animate-pulse" />
              <img 
                src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                alt="Nusantara Royal Raccoon" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_var(--glow)]" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center mb-4 relative z-10"
            >
              <h1 className="text-text-primary text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.3em] font-display leading-tight interactive-gold">
                {t("hero.title_3")}
              </h1>
              <span className="text-accent-gold text-sm sm:text-base font-bold tracking-[0.8em] mt-3 opacity-90 uppercase interactive-gold">
                {t("hero.title_1")} {t("hero.title_2")}
              </span>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative z-10 inline-block px-6 py-2 text-[10px] sm:text-xs tracking-[0.5em] rounded-full border border-border-soft bg-bg-card backdrop-blur-md text-text-primary uppercase font-bold shadow-lg"
            >
              {t("hero.badge")}
            </motion.span>
          </div>

          {/* TITLE SECTION REMOVED (BROKEN IMAGE) */}

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto mt-6 leading-relaxed balance font-light">
            {t("hero.description")}
          </p>

          {/* FEATURED NFT CARD - RELATIVE POSITIONED FOR VISIBILITY */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 relative z-10 w-full max-w-[320px] sm:max-w-[380px] mx-auto flex justify-center items-center overflow-visible"
            style={{ background: 'transparent' }} // Removed debug red background but kept container stable
          >
            <div className="w-full h-full relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl">
              <NFTCard 
                nft={featuredNFTMetadata} 
                onClick={(nft) => console.log("Hero NFT clicked", nft)}
                view="grid"
              />
            </div>
          </motion.div>

          {/* PROGRESS BAR */}
          <div className="mt-10 w-full max-w-xl mx-auto">
            <div className="flex justify-between text-[10px] sm:text-xs text-text-muted mb-3 tracking-widest font-bold uppercase">
              <span>{t("marketplace.supply")}</span>
              <span className="text-accent-gold">{totalMinted} / {maxSupply} {t("marketplace.mint_now")}</span>
            </div>

            <div className="w-full h-2.5 bg-bg-card rounded-full overflow-hidden p-0.5 border border-border-soft">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-accent-gold rounded-full shadow-md"
                initial={{ width: 0 }}
                animate={{ width: `${mintProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* COUNTDOWN GRID */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-10 max-w-md mx-auto text-center w-full">
            {[
              { label: t("details.element") === "Element" ? "DAYS" : "HARI", value: timeLeft.days },
              { label: t("details.element") === "Element" ? "HRS" : "JAM", value: timeLeft.hours },
              { label: t("details.element") === "Element" ? "MIN" : "MENIT", value: timeLeft.minutes },
              { label: t("details.element") === "Element" ? "SEC" : "DETIK", value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="luxury-card py-3 px-1 shadow-sm dark:shadow-none">
                <div className="text-xl sm:text-2xl font-bold text-text-primary font-display">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[8px] sm:text-[10px] text-text-muted tracking-widest font-bold uppercase mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 text-text-primary">
            <motion.button 
              onClick={handleAction}
              disabled={isMinting}
              className="btn-gold px-12 py-4 text-xs sm:text-sm tracking-[0.2em] uppercase disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMinting ? (
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 animate-pulse" /> {t("nav.minting")}
                </span>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  {isConnected ? t("nav.mint") : t("nav.connect")}
                </>
              )}
            </motion.button>
            
            <a href="#collection">
              <motion.button 
                className="px-8 sm:px-12 py-4 rounded-full border border-border-soft bg-bg-card hover:bg-bg-secondary text-text-primary font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("nav.collection")}
              </motion.button>
            </a>
          </div>

          {/* Activity Feed Mini */}
          <div className="mt-12 flex items-center gap-3 h-6 justify-center opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            <div className="flex animate-marquee-slower whitespace-nowrap gap-8 text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-[0.2em] font-medium italic">
              <span>User 0x4f...a2 minted Legendary Aceh Raccoon</span>
              <span>User 0x72...1b minted Epic Bugis Raccoon</span>
              <span>User 0x1a...9c minted Rare Java Raccoon</span>
            </div>
          </div>
        </motion.div>
      </div>
>>>>>>> 17e96eb (first commit)

      {/* Background Section indicators */}
      <div className="absolute inset-inline-end-0 bottom-40 vertical-text hidden xl:block opacity-20 pointer-events-none">
        <span className="text-[120px] font-display font-black leading-none uppercase select-none">RACCOON</span>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
});

Hero.displayName = "Hero";
export default Hero;
>>>>>>> 17e96eb (first commit)
