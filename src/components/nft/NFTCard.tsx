import { motion, AnimatePresence } from "motion/react";
<<<<<<< HEAD
import { ExternalLink, Info } from "lucide-react";
import { NFTMetadata } from "../../types";
import { RARITY_CONFIG } from "../../data/rarityConfig";
import { getFinalRarity } from "../../data/rarityUpgrade";
import React, { memo, useState, useEffect } from "react";
=======
import { ExternalLink, Info, Zap, Shield, Sparkles } from "lucide-react";
import { NFTMetadata } from "../../types";
import { RARITY_CONFIG } from "../../data/rarityConfig";
import { getFinalRarity } from "../../data/rarityUpgrade";
import { useWallet } from "../../context/WalletContext";
import { useTranslation } from "../../context/LanguageContext";
import React, { memo, useState, useEffect, useCallback } from "react";
import SafeImage from "../ui/SafeImage";

const MotionSafeImage = motion(SafeImage);
>>>>>>> 17e96eb (first commit)

interface NFTImageProps {
  src: string;
  alt: string;
  className: string;
}

export const NFTImage = memo(({ src, alt, className }: NFTImageProps) => {
<<<<<<< HEAD
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [loadStatus, setLoadStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);

  const gateways = [
    "https://ipfs.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://gateway.pinata.cloud/ipfs/",
  ];

  const getCID = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("ipfs://")) return url.replace("ipfs://", "");
    if (url.includes("ipfs/")) return url.split("ipfs/")[1].split("?")[0];
    return null;
  };

  useEffect(() => {
    const cid = getCID(src);
    if (cid) {
      setCurrentSrc(`${gateways[0]}${cid}`);
    } else {
      setCurrentSrc(src || null);
    }
  }, [src]);

  const handleError = () => {
    const cid = getCID(src);
    if (cid && retryCount < gateways.length - 1) {
      const nextRetry = retryCount + 1;
      setRetryCount(nextRetry);
      setCurrentSrc(`${gateways[nextRetry]}${cid}`);
    } else {
      setLoadStatus("error");
      setCurrentSrc("https://via.placeholder.com/600x600/1A1A23/D4AF37?text=NFT+Hidden");
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-black/20 to-black/80 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {loadStatus === "loading" && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-luxury-black/40 backdrop-blur-sm"
          >
            <div className="w-8 h-8 border-2 border-luxury-gold/10 border-t-luxury-gold rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img
        src={currentSrc}
        alt={alt}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: loadStatus === "loaded" ? 1 : 0,
          scale: loadStatus === "loaded" ? (retryCount > 0 ? 0.95 : 1) : 0.95
        }}
        onLoad={() => setLoadStatus("loaded")}
        onError={handleError}
        className={`${className} object-cover object-center`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
=======
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
>>>>>>> 17e96eb (first commit)
});

NFTImage.displayName = "NFTImage";

interface NFTCardProps {
  nft: NFTMetadata;
  onClick: (nft: NFTMetadata) => void;
  view?: "grid" | "list" | "compact";
}

const NFTCard = memo(({ nft, onClick, view = "grid" }: NFTCardProps) => {
<<<<<<< HEAD
  const finalRarity = getFinalRarity(nft);
  const rarityStyle = RARITY_CONFIG[finalRarity];
  const openseaUrl = `https://opensea.io/assets/ethereum/0x5678...4321/${nft.id}`;

  const hoverEffect = typeof window !== 'undefined' && window.innerWidth > 768 
    ? (view === "list" ? { x: 10 } : { y: -5 })
    : {};

  if (view === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={hoverEffect}
        className="group relative w-full cursor-pointer"
        onClick={() => onClick(nft)}
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${rarityStyle.gradient} rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
        <div className="relative flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 overflow-hidden transition-all group-hover:bg-white/10 group-hover:border-white/20">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <NFTImage
              src={nft.image}
              alt={nft.name}
              className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-display text-white group-hover:text-luxury-gold transition-colors truncate">
                {nft.name.split('—')[0]}
              </h3>
              <span className="text-[10px] text-white/30 font-mono">
                #{nft.id.toString().padStart(4, '0')}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 mb-2">
              <p className="text-[10px] text-white/50 truncate">
                {nft.tribe}
              </p>
              <p className="text-[10px] text-white/40 truncate">
                {nft.outfit}
              </p>
            </div>
            <div className={`inline-block px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase ${rarityStyle.badge}`}>
              {finalRarity}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (view === "compact") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="group relative w-full cursor-pointer"
        onClick={() => onClick(nft)}
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${rarityStyle.gradient} rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden aspect-square">
          <NFTImage
            src={nft.image}
            alt={nft.name}
            className="w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
            <div className={`px-1.5 py-0.5 rounded-full text-[7px] font-bold uppercase ${rarityStyle.badge}`}>
              {finalRarity}
            </div>
            <span className="text-[8px] text-white/50 font-mono">
              #{nft.id.toString().slice(-3)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hoverEffect}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative w-full cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 active:scale-[0.98]"
      onClick={() => onClick(nft)}
    >
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0D1117]">
        <NFTImage
          src={nft.image}
          alt={nft.name}
          className="w-full h-full transition-transform duration-700 group-hover:scale-[1.05]"
        />
        
        {/* Premium Overlay Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Small Pill Badge (Top Left) */}
        <div className="absolute top-4 left-4 z-20">
          <div className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white/90 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${rarityStyle.badge.split(' ')[0]} shadow-[0_0_8px_currentColor]`} />
            <span>{finalRarity}</span>
          </div>
        </div>

        {/* Number Badge (Top Right) */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-2 py-1 rounded-lg text-[10px] bg-black/60 backdrop-blur-md border border-white/10 text-white/40 font-mono tracking-tighter">
            #{nft.id.toString().padStart(4, '0')}
          </span>
        </div>
      </div>

      {/* Content Section (Bottom) */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-[#161B22] to-[#0D1117] flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm sm:text-base font-display font-medium text-white group-hover:text-luxury-gold transition-colors truncate">
            {nft.name.split('—')[0]}
          </h3>
          <Info className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-luxury-gold/80 font-bold uppercase tracking-widest">{nft.tribe}</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="text-white/40 truncate">{nft.outfit}</span>
        </div>
        
        <div className="mt-3 pt-3 flex items-center justify-between border-t border-white/5">
           <div className="flex flex-col">
             <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Heritage</span>
             <span className="text-xs font-semibold text-white/70">Nusantara GEN-1</span>
           </div>
           
           <div className="flex items-center gap-2">
              <a 
                href={openseaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all shadow-xl group/btn"
              >
                <ExternalLink className="w-4 h-4 text-white/40 group-hover/btn:text-luxury-gold" />
              </a>
           </div>
        </div>
      </div>
    </motion.div>
  );
=======
  const { t } = useTranslation();
  const { mint } = useWallet();
  
  const handleClick = useCallback(() => {
    if (nft) onClick(nft);
  }, [onClick, nft]);

  try {
    if (!nft) return null;
    
    const finalRarity = getFinalRarity(nft);
    const rarityStyle = RARITY_CONFIG[finalRarity];
    
    const price = finalRarity === "Divine" ? "0.15" : finalRarity === "Mythic" ? "0.12" : finalRarity === "Legendary" ? "0.10" : finalRarity === "Epic" ? "0.08" : finalRarity === "Rare" ? "0.05" : "0.02";

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (view === "list") {
      return (
        <motion.div
          layout={!isMobile}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={!isMobile ? { x: 5, scale: 1.01 } : {}}
        className="group relative flex items-center gap-4 sm:gap-6 luxury-card p-3 sm:p-4 cursor-pointer hover:shadow-accent-gold/5 z-10 active:scale-[0.98]"
        onClick={handleClick}
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-bg-card">
            <NFTImage
              src={nft?.image || ""}
              alt={nft?.name || "NFT"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 nft-overlay pointer-events-none" />
            <div className="absolute top-2 left-2 bg-green-500/80 p-1 rounded-md backdrop-blur-sm z-10 shadow-sm">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-gold transition-colors mb-1 truncate uppercase tracking-tight">
                   {(nft?.name || "").split('—')[0]}
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                   <span className="text-[9px] sm:text-[10px] text-text-muted font-black tracking-widest uppercase">#{(nft?.id || 0).toString().padStart(4, '0')}</span>
                   <div className="flex items-center gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                     <span className="text-[9px] sm:text-[10px] text-text-secondary uppercase font-bold tracking-widest truncate max-w-[80px]">{nft?.island || "Unknown"}</span>
                   </div>
                </div>
              </div>
              <div className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${(rarityStyle || {}).badge || ""}`}>
                {finalRarity}
              </div>
            </div>

            <div className="flex items-end justify-between mt-2">
               <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">{t("details.price")}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-text-primary">{price} ETH</span>
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-pink-500 rounded-sm flex items-center justify-center p-0.5 shadow-sm">
                      <Shield className="w-full h-full text-white" />
                    </div>
                  </div>
               </div>
               
               <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-text-muted font-mono block">{t("details.rank")}: {(nft?.id || 0) % 7777}</span>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{t("details.last_sale")}</span>
               </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        layout={!isMobile}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`group relative luxury-card overflow-hidden cursor-pointer shadow-sm dark:shadow-none hover:shadow-accent-gold/10 z-10 active:scale-[0.98] ${view === "compact" ? "scale-95" : ""}`}
        onClick={handleClick}
      >
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-bg-card">
          <NFTImage
            src={nft?.image || ""}
            alt={nft?.name || "NFT"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 nft-overlay pointer-events-none" />
          
          {/* Collection Icon Overlay */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-500/80 p-1 sm:p-1.5 rounded-lg backdrop-blur-sm z-10 shadow-sm">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
          </div>

          {/* Selection Indicator */}
          {!isMobile && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-bg-card border border-border-soft flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-2.5 h-2.5 border-t border-r border-text-primary rotate-45" />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={`flex flex-col gap-2 sm:gap-3 ${view === "compact" ? "p-2 sm:p-3" : "p-3 sm:p-4"}`}>
          <div className="flex justify-between items-start gap-1">
            <span className={`${view === "compact" || isMobile ? "text-[10px] sm:text-xs" : "text-sm"} font-bold text-text-primary group-hover:text-accent-gold transition-colors truncate uppercase tracking-tight`}>
              {(nft?.name || "").split('—')[0]}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
               <span className="text-[8px] sm:text-[10px] text-text-secondary uppercase font-black tracking-widest truncate max-w-[50px]">{nft?.island || "Unknown"}</span>
            </div>
          </div>

          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className={`${view === "compact" || isMobile ? "text-xs sm:text-sm" : "text-sm sm:text-base"} font-bold text-text-primary`}>{price} ETH</span>
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-pink-500 rounded-sm flex items-center justify-center p-0.5 shadow-sm">
                  <Shield className="w-full h-full text-white" />
                </div>
              </div>
              {view !== "compact" && !isMobile && (
                <span className="text-[8px] sm:text-[9px] text-text-muted font-bold uppercase tracking-widest mt-0.5">
                  {t("details.last_sale")}: 0.015 ETH
                </span>
              )}
            </div>
            
            <div className="flex flex-col items-end">
               <div className={`px-1.5 py-0.5 rounded-md text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${(rarityStyle || {}).badge || ""}`}>
                 {finalRarity}
               </div>
               {view !== "compact" && !isMobile && <span className="text-[9px] text-text-muted font-mono mt-1">{t("details.rank")}: {(nft?.id || 0) % 7777}</span>}
            </div>
          </div>
        </div>

        {/* Hover Status */}
        {!isMobile && <div className="absolute inset-x-0 bottom-0 h-1 hidden group-hover:block bg-gradient-to-r from-accent-gold to-purple-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
      </motion.div>
    );
  } catch (err) {
    console.error("NFTCard Render Failure:", err);
    return null;
  }
>>>>>>> 17e96eb (first commit)
});

NFTCard.displayName = "NFTCard";
export default NFTCard;
