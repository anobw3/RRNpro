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
import AnimatedCounter from "./AnimatedCounter";
import LiveMintedBadge from "./LiveMintedBadge";

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
    <section id="hero" className="w-full flex justify-center px-0 sm:px-6 lg:px-12 py-24 sm:py-32 lg:py-48 relative min-h-screen items-center overflow-hidden">
      <MintModal 
        isOpen={mintStatus.isOpen} 
        onClose={() => setMintStatus({ ...mintStatus, isOpen: false })} 
        status={mintStatus.status}
        message={mintStatus.message}
        txHash={txHash || undefined}
      />
      
      {/* Background Section indicators */}
      <div className="absolute right-10 bottom-20 vertical-text hidden 2xl:block opacity-[0.02] pointer-events-none select-none">
        <span className="text-[200px] font-display font-black leading-none tracking-tighter uppercase text-text-primary">ARCHIPELAGO</span>
      </div>

      <div className="w-full max-w-7xl text-center mx-auto z-20 relative px-4 sm:px-6">
        <div className="hidden lg:block absolute -top-20 right-0">
          <LiveMintedBadge />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center"
        >
          {/* TOP BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-12"
          >
            <span className="text-[10px] font-black uppercase tracking-[1em] text-gold/60">
              {t("hero.badge") || "The Royal Lineage"}
            </span>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-4" />
          </motion.div>

          {/* MAIN LOGO WITH AMBIENT GLOW */}
          <div className="relative mb-20 group">
            <div className="absolute inset-0 bg-gold/10 blur-[120px] rounded-full scale-150 opacity-50 transition-all duration-1000 group-hover:bg-gold/20" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-40 h-40 sm:w-64 sm:h-64 z-10"
            >
              <img 
                src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                alt="Nusantara Royal Raccoon" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-all duration-700 hover:scale-105" 
              />
            </motion.div>
          </div>

          {/* HEADINGS */}
          <div className="space-y-6 mb-12 w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-text-primary text-[clamp(2.2rem,10vw,8rem)] sm:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-[1] sm:leading-[0.9] flex flex-col items-center text-center break-words"
            >
              <span>{t("hero.title_3") || "NU S AN T AR A"}</span>
            </motion.h1>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6, duration: 1 }}
               className="flex items-center justify-center gap-4 sm:gap-10"
            >
              <div className="h-px flex-1 max-w-[40px] sm:max-w-[100px] bg-gradient-to-l from-gold/50 to-transparent"></div>
              <h2 className="text-gold text-[8px] sm:text-xs font-black tracking-[0.4em] sm:tracking-[0.8em] uppercase whitespace-nowrap">
                {t("hero.title_1") || "ROYAL"} {t("hero.title_2") || "RACCOONS"}
              </h2>
              <div className="h-px flex-1 max-w-[40px] sm:max-w-[100px] bg-gradient-to-r from-gold/50 to-transparent"></div>
            </motion.div>

            <div className="lg:hidden mt-8 flex justify-center">
              <LiveMintedBadge />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-text-muted text-[12px] sm:text-[15px] uppercase tracking-[0.15em] sm:tracking-[0.25em] font-light max-w-2xl mx-auto mb-16 sm:mb-20 leading-[1.8] sm:leading-[2] px-2 sm:px-6 text-center"
          >
            {t("hero.description")}
          </motion.p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-20 sm:mb-24 w-full sm:w-auto px-4 sm:px-0">
            <motion.button 
              onClick={handleAction}
              disabled={isMinting}
              className="btn-primary w-full sm:w-auto !px-12 sm:!px-20 !py-5 sm:!py-6 group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {isMinting ? (
                <span className="flex items-center justify-center gap-4">
                  <div className="w-5 h-5 border-px border-black/10 border-t-black rounded-full animate-spin" />
                  {t("nav.minting") || "Initializing"}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-4">
                  <Zap className="w-4 h-4 fill-black" />
                  {isConnected ? t("nav.mint") : t("nav.connect")}
                </span>
              )}
            </motion.button>
            
            <a href="#collection" className="group w-full sm:w-auto">
              <motion.button 
                className="btn-outline w-full sm:w-auto !px-12 sm:!px-20 !py-5 sm:!py-6"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("nav.collection") || "Catalogue"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </motion.button>
            </a>
          </div>

          {/* PROGRESS & METRICS */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="w-full max-w-2xl px-6 sm:px-10 py-10 sm:py-12 rounded-[32px] sm:rounded-[40px] bg-bg-card/50 border border-gold/10 shadow-3xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-10 relative z-10">
               <div className="text-center sm:text-left">
                  <span className="text-[8px] sm:text-[9px] text-text-muted font-black uppercase tracking-[0.4em] block mb-3">{t("marketplace.supply") || "Circulation"}</span>
                  <div className="flex items-baseline justify-center sm:justify-start gap-3">
                     <span className="text-3xl sm:text-4xl font-display font-medium text-text-primary tracking-tighter">
                        <AnimatedCounter value={totalMinted} />
                      </span>
                     <span className="text-sm sm:text-base text-text-muted opacity-40 font-light">/ {maxSupply}</span>
                  </div>
               </div>
               <div className="text-center sm:text-right">
                  <span className="text-[8px] sm:text-[9px] text-text-muted font-black uppercase tracking-[0.4em] block mb-3">Entrance Value</span>
                  <span className="text-3xl sm:text-4xl font-display font-medium text-gold tracking-tighter">0.08 ETH</span>
               </div>
            </div>

            <div className="relative h-px w-full bg-gold/10 rounded-full overflow-hidden relative z-10">
               <motion.div 
                 className="absolute inset-y-0 left-0 bg-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                 initial={{ width: 0 }}
                 animate={{ width: `${mintProgress}%` }}
                 transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
               />
            </div>
            
            <div className="flex justify-between mt-6 relative z-10">
               <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gold/40">Status: Active</span>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-status-error animate-pulse" />
                 <span className="text-[8px] font-black uppercase tracking-[0.4em] text-status-error">Phase 1: {maxSupply - totalMinted} Relics Remaining</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
