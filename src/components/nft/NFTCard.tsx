import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Info } from "lucide-react";
import { NFTMetadata } from "../../types";
import { RARITY_CONFIG } from "../../data/rarityConfig";
import { getFinalRarity } from "../../data/rarityUpgrade";
import React, { memo, useState, useEffect } from "react";

interface NFTImageProps {
  src: string;
  alt: string;
  className: string;
}

export const NFTImage = memo(({ src, alt, className }: NFTImageProps) => {
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
});

NFTImage.displayName = "NFTImage";

interface NFTCardProps {
  nft: NFTMetadata;
  onClick: (nft: NFTMetadata) => void;
  view?: "grid" | "list" | "compact";
}

const NFTCard = memo(({ nft, onClick, view = "grid" }: NFTCardProps) => {
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
});

NFTCard.displayName = "NFTCard";
export default NFTCard;
