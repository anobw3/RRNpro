import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Info, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { NFTMetadata } from "../../types";
import { RARITY_CONFIG } from "../../data/rarityConfig";
import { getFinalRarity } from "../../data/rarityUpgrade";
import { useWallet } from "../../context/WalletContext";
import { useTranslation } from "../../context/LanguageContext";
import React, { memo, useState, useEffect, useCallback } from "react";
import SafeImage from "../ui/SafeImage";

const MotionSafeImage = motion(SafeImage);

interface NFTImageProps {
  src: string;
  alt: string;
  className: string;
}

export const NFTImage = memo(({ src, alt, className }: NFTImageProps) => {
  try {
    return (
      <SafeImage 
        src={src || ""} 
        alt={alt || "NFT Image"} 
        className={className} 
      />
    );
  } catch (err) {
    console.error("NFTImage Failed:", err);
    return <div className="w-full h-full bg-bg-card" />;
  }
});

NFTImage.displayName = "NFTImage";

interface NFTCardProps {
  nft: NFTMetadata;
  onClick: (nft: NFTMetadata) => void;
  view?: "grid" | "list" | "compact";
}

const NFTCard = memo(({ nft, onClick, view = "grid" }: NFTCardProps) => {
  const { t } = useTranslation();
  
  const handleClick = useCallback(() => {
    if (nft) onClick(nft);
  }, [onClick, nft]);

  if (!nft) return null;
  
  const finalRarity = getFinalRarity(nft);
  const rarityStyle = RARITY_CONFIG[finalRarity] || (RARITY_CONFIG as any)['Rare'];
  
  const price = finalRarity === "Divine" ? "0.15" : finalRarity === "Mythic" ? "0.12" : finalRarity === "Legendary" ? "0.10" : finalRarity === "Epic" ? "0.08" : finalRarity === "Rare" ? "0.05" : "0.02";

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (view === "list") {
    return (
      <motion.div
        layout={!isMobile}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={!isMobile ? { y: -2, backgroundColor: "var(--bg-card)" } : {}}
        className="group relative grid grid-cols-[72px_1fr_auto] items-center gap-4 sm:gap-6 h-24 p-3 sm:px-4 rounded-2xl border border-border-soft hover:border-gold/30 transition-all duration-300 cursor-pointer overflow-hidden z-10 box-border shadow-sm hover:shadow-lg w-full"
        onClick={handleClick}
      >
        <div className="relative w-[72px] h-[72px] flex-shrink-0 overflow-hidden rounded-xl bg-bg-primary/50 border border-border-soft group-hover:border-gold/20 transition-all">
          <NFTImage
            src={nft?.image || ""}
            alt={nft?.name || "NFT"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] text-gold font-black uppercase tracking-[0.2em] truncate max-w-[100px]">{nft?.island || "Eterna"}</span>
            <span className="text-[9px] text-text-muted font-bold tracking-widest opacity-40 shrink-0">#{(nft?.id || 0).toString().padStart(4, '0')}</span>
          </div>
          <h3 className="text-sm font-display font-medium text-text-primary group-hover:text-gold transition-colors truncate uppercase tracking-tight">
            {(nft?.name || "").split('—')[0]}
          </h3>
          <div className="flex items-center gap-2 mt-1 blur-none">
             <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.1em] border border-gold/10 whitespace-nowrap ${rarityStyle?.badge || ""}`}>
                {finalRarity}
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
          <div className="flex flex-col items-end min-w-[70px] sm:min-w-[90px]">
             <span className="text-[8px] text-text-muted font-black uppercase tracking-[0.2em] mb-0.5 whitespace-nowrap">{t("details.price")}</span>
             <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-base font-display font-medium text-text-primary whitespace-nowrap">{price}</span>
                <span className="text-[9px] font-sans opacity-40 font-medium">ETH</span>
             </div>
          </div>
          <div className="w-10 h-10 rounded-full border border-border-soft flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold transition-all duration-500 shadow-sm flex-shrink-0 hidden sm:flex">
             <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-black transition-colors" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout={!isMobile}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={!isMobile ? { y: -12, backgroundColor: "var(--bg-card)" } : {}}
      transition={{ duration: 0.5 }}
      className={`group relative bg-bg-card border border-border-soft rounded-[32px] overflow-hidden cursor-pointer transition-all duration-700 shadow-sm hover:shadow-2xl active:scale-[0.98] h-full flex flex-col ${view === "compact" ? "scale-95" : ""}`}
      onClick={handleClick}
    >
      <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden bg-bg-primary/50">
        <NFTImage
          src={nft?.image || ""}
          alt={nft?.name || "NFT"}
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700 pointer-events-none" />
        
        <div className="absolute top-4 right-4 z-20">
           <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] backdrop-blur-md shadow-lg border border-gold/10 whitespace-nowrap ${rarityStyle?.badge || "bg-bg-card/80 text-text-primary"}`}>
              {finalRarity}
           </div>
        </div>
        
        <div className="absolute bottom-4 left-4 z-20">
           <span className="text-[10px] text-white/60 font-medium tracking-widest backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full border border-white/10 uppercase shrink-0">#{(nft?.id || 0) + 1}</span>
        </div>
      </div>

      <div className={`flex-1 flex flex-col min-w-0 ${view === "compact" ? "p-5" : "p-7"}`}>
        <div className="flex flex-col gap-1.5 mb-4 w-full overflow-hidden">
          <span className={`${view === "compact" ? "text-[8px]" : "text-[9px]"} text-gold font-black uppercase tracking-[0.4em] truncate w-full`}>{nft?.island || "Eterna"}</span>
          <h3 className={`${view === "compact" ? "text-base" : "text-xl"} font-display font-medium text-text-primary group-hover:text-gold transition-colors truncate uppercase tracking-tighter leading-tight w-full`}>
            {(nft?.name || "").split('—')[0]}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-soft/30 min-w-0">
          <div className="flex flex-col min-w-0 shrink-0">
            <span className={`${view === "compact" ? "text-[8px]" : "text-[9px]"} text-text-muted font-black uppercase tracking-[0.4em] mb-1 whitespace-nowrap`}>{t("details.price")}</span>
            <div className="flex items-baseline gap-1">
              <span className={`${view === "compact" ? "text-lg" : "text-2xl"} font-display font-medium text-text-primary group-hover:text-gold transition-all whitespace-nowrap`}>{price}</span>
              <span className="text-[10px] font-sans opacity-40 font-medium">ETH</span>
            </div>
          </div>
          
          <div className={`${view === "compact" ? "w-9 h-9" : "w-11 h-11"} rounded-full border border-border-soft flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold transition-all duration-700 shadow-xl flex-shrink-0 ml-2`}>
             <ArrowRight className={`${view === "compact" ? "w-4 h-4" : "w-5 h-5"} text-text-primary group-hover:text-black transition-colors`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

NFTCard.displayName = "NFTCard";
export default NFTCard;
