import { motion } from "motion/react";
<<<<<<< HEAD
import { ShoppingCart, ExternalLink, Users, Database, ShieldCheck } from "lucide-react";
=======
import { ShoppingCart, ExternalLink, Users, Database, ShieldCheck, Zap } from "lucide-react";
>>>>>>> 17e96eb (first commit)
import { NFT_COLLECTION } from "../constants";
import { useWallet } from "../context/WalletContext";
import { useTranslation } from "../context/LanguageContext";
import { NFTImage } from "./nft/NFTCard";
<<<<<<< HEAD

export default function Marketplace() {
  const { isConnected, ownedNfts } = useWallet();
  const { t, language } = useTranslation();

  return (
    <div id="marketplace" className="py-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-inline-end-0 w-1/2 h-full bg-luxury-gold/5 blur-[120px] -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 opacity-30" />
=======
import MintModal from "./MintModal";
import { useState, useCallback, useMemo, memo, useEffect } from "react";

const Marketplace = memo(() => {
  const { isConnected, connect, isMinting, mint, chainId, ownedNfts, error: walletError, mintSuccess, txHash } = useWallet();
  const { t, language } = useTranslation();
  const [mintStatus, setMintStatus] = useState<{ isOpen: boolean; status: "success" | "error"; message?: string }>({
    isOpen: false,
    status: "success"
  });

  // Sync modal when minting completes
  useEffect(() => {
    if (mintSuccess) {
      setMintStatus({
        isOpen: true,
        status: "success",
        message: t("mint.success_msg")
      });
    }
  }, [mintSuccess, t]);

  useEffect(() => {
    if (walletError && !isMinting && !mintSuccess) {
      setMintStatus({
        isOpen: true,
        status: "error",
        message: walletError
      });
    }
  }, [walletError, isMinting, mintSuccess]);

  const handleMint = useCallback(async (nftId: string) => {
    if (!isConnected) {
      console.log("[Marketplace] Mint triggered - connecting wallet");
      await connect();
      return;
    }

    console.log(`[Marketplace] Minting item: ${nftId}`);
    await mint(nftId);
  }, [isConnected, connect, mint]);

  const nftsToDisplay = useMemo(() => NFT_COLLECTION.slice(0, 6), []);

  return (
    <div id="marketplace" className="py-24 relative overflow-hidden">
      <MintModal 
        isOpen={mintStatus.isOpen} 
        onClose={() => setMintStatus({ ...mintStatus, isOpen: false })} 
        status={mintStatus.status}
        message={mintStatus.message}
        txHash={txHash || undefined}
      />
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-inline-end-0 w-1/2 h-full bg-accent-gold/5 blur-[120px] -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 opacity-30 pointer-events-none" />
>>>>>>> 17e96eb (first commit)
      
      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
<<<<<<< HEAD
            <span className="text-luxury-purple text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] mb-4 block text-glow">{t("marketplace.badge")}</span>
            <h2 className="text-[length:var(--font-size-fluid-h2)] font-display tracking-tighter uppercase leading-[0.9]">{t("marketplace.title_1")}<br/><span className="gold-text">{t("marketplace.title_2")}</span></h2>
          </motion.div>
          <motion.p 
            className="text-white/40 text-lg md:text-xl font-light max-w-md lg:text-end"
=======
            <span className="text-purple-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] mb-4 block text-glow">{t("marketplace.badge")}</span>
            <h2 className="text-[length:var(--font-size-fluid-h2)] font-display tracking-tighter uppercase leading-[0.9] text-text-primary">{t("marketplace.title_1")}<br/><span className="gold-text">{t("marketplace.title_2")}</span></h2>
          </motion.div>
          <motion.p 
            className="text-text-secondary text-lg md:text-xl font-light max-w-md lg:text-end"
>>>>>>> 17e96eb (first commit)
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {t("marketplace.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
<<<<<<< HEAD
          {NFT_COLLECTION.slice(0, 6).map((item, idx) => {
=======
          {nftsToDisplay.map((item, idx) => {
>>>>>>> 17e96eb (first commit)
            const isOwned = isConnected && ownedNfts.includes(item.id);
            
            return (
              <motion.div
                key={item.id}
<<<<<<< HEAD
                className="group relative glass-gold rounded-[3rem] overflow-hidden hover:shadow-[0_0_80px_rgba(212,175,55,0.15)] transition-all duration-1000 ring-1 ring-white/5 hover:ring-luxury-gold/30"
=======
                className="group relative bg-bg-card backdrop-blur-xl border border-border-soft rounded-[3rem] overflow-hidden hover:shadow-[0_0_80px_var(--accent-gold-soft)] transition-all duration-1000"
>>>>>>> 17e96eb (first commit)
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="p-6">
                  {/* Image Area */}
<<<<<<< HEAD
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
=======
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-white/5">
>>>>>>> 17e96eb (first commit)
                    <NFTImage 
                      src={item.image} 
                      alt={`${item.name} ${item.outfit}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
<<<<<<< HEAD
                    <div className="absolute top-4 inset-inline-end-4 px-3 py-1 glass rounded-full text-[8px] font-bold tracking-widest uppercase text-white/80 border border-white/10 z-10">
=======
                    <div className="absolute top-4 inset-inline-end-4 px-3 py-1 bg-bg-card backdrop-blur-md rounded-full text-[8px] font-bold tracking-widest uppercase text-text-primary border border-border-soft z-10">
>>>>>>> 17e96eb (first commit)
                      {t("marketplace.supply")}: {item.supply}
                    </div>

                    {isOwned && (
                      <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<<<<<<< HEAD
                        <div className="px-6 py-2 bg-green-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2">
=======
                        <div className="px-6 py-2 bg-status-success text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
>>>>>>> 17e96eb (first commit)
                           <ShieldCheck className="w-4 h-4" />
                           {t("marketplace.your_asset")}
                        </div>
                      </div>
                    )}
                  </div>

                {/* Info Area */}
                <div className="mb-6">
                   <div className="flex items-center justify-between mb-2">
<<<<<<< HEAD
                     <h3 className="font-display text-xl group-hover:text-luxury-gold transition-colors">{item.name} <span className="text-luxury-gold/70 text-sm">{item.outfit}</span></h3>
                     <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        item.rarity === 'Divine' ? 'text-white' :
                        item.rarity === 'Mythic' ? 'text-red-500' :
                        item.rarity === 'Legendary' ? 'text-yellow-400' :
                        item.rarity === 'Epic' ? 'text-purple-400' :
                        item.rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'
                      }`}>{t(`rarity.${item.rarity.toLowerCase()}`)}</span>
                   </div>
                   <div className="flex items-center gap-4 text-white/40 text-[10px] font-medium tracking-widest uppercase">
=======
                     <h3 className="font-display text-xl group-hover:text-accent-gold transition-colors text-text-primary">{item.name} <span className="text-accent-gold-soft text-sm">{item.outfit}</span></h3>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${
                        item.rarity === 'Divine' ? 'text-text-primary' :
                        item.rarity === 'Mythic' ? 'text-status-error' :
                        item.rarity === 'Legendary' ? 'text-accent-gold' :
                        item.rarity === 'Epic' ? 'text-accent-purple' :
                        item.rarity === 'Rare' ? 'text-blue-500' : 'text-text-muted'
                      }`}>{t(`rarity.${item.rarity.toLowerCase()}`)}</span>
                   </div>
                   <div className="flex items-center gap-4 text-text-secondary text-[10px] font-medium tracking-widest uppercase">
>>>>>>> 17e96eb (first commit)
                     <div className="flex items-center gap-1.5">
                       <Users className="w-3 h-3" />
                       <span>{Math.floor(Math.random() * 50) + 1} {t("marketplace.owners")}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <Database className="w-3 h-3" />
                       <span>Ethereum</span>
                     </div>
                   </div>
                </div>

                {/* Price and Actions */}
<<<<<<< HEAD
                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-1">{t("marketplace.offer")}</span>
                      <span className="text-xl font-display text-white">{item.price} ETH</span>
                    </div>
                    <div className="text-end">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-1">{t("marketplace.floor_price")}</span>
                      <span className="text-sm font-display text-luxury-gold">{(parseFloat(item.price) * 0.9).toFixed(2)} ETH</span>
=======
                <div className="pt-6 border-t border-border-soft">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-1">{t("marketplace.offer")}</span>
                      <span className="text-xl font-display text-text-primary">{item.price} ETH</span>
                    </div>
                    <div className="text-end">
                      <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-1">{t("marketplace.floor_price")}</span>
                      <span className="text-sm font-display text-accent-gold">{(parseFloat(item.price) * 0.9).toFixed(2)} ETH</span>
>>>>>>> 17e96eb (first commit)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
<<<<<<< HEAD
                      disabled={isOwned}
                      className={`flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] ${
                        isOwned 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-not-allowed' 
                        : 'bg-luxury-gold text-luxury-black hover:scale-[1.02]'
                      }`}
                    >
                      {isOwned ? (
                        <>
                          <ShieldCheck className="w-3 h-3" />
                          {t("collection.owned")}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3" />
                          {t("marketplace.mint_now")}
                        </>
                      )}
                    </button>
                    <a 
                      href={item.openseaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 glass text-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
=======
                      onClick={() => handleMint(item.id)}
                      disabled={isMinting}
                      className="flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] bg-accent-gold text-black hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                      {isMinting ? (
                        <div className="w-3" />
                      ) : (
                        <Zap className="w-3 h-3 fill-current" />
                      )}
                      {isMinting ? t("nav.minting") : t("marketplace.mint_now")}
                    </button>
                    <a 
                       href={`https://opensea.io/assets/ethereum/0x5678...4321/${item.id}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-2 py-3 bg-bg-card border border-border-soft text-text-secondary text-[10px] font-bold uppercase tracking-widest hover:bg-bg-secondary transition-colors active:scale-95"
>>>>>>> 17e96eb (first commit)
                    >
                      <ExternalLink className="w-3 h-3" />
                      OpenSea
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
<<<<<<< HEAD
              <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/[0.03] transition-colors duration-700 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

        <div className="mt-20 text-center">
           <button className="px-12 py-5 glass border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all font-bold tracking-[0.3em] uppercase text-xs">
=======
              <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/[0.03] transition-colors duration-700 pointer-events-none" />
            </motion.div>
            );
          })}
      </div>

        <div className="mt-20 text-center">
           <button className="px-12 py-5 bg-bg-card backdrop-blur-xl border border-border-soft text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all font-bold tracking-[0.3em] uppercase text-xs active:scale-95">
>>>>>>> 17e96eb (first commit)
             {t("marketplace.explore")}
           </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
});

Marketplace.displayName = "Marketplace";
export default Marketplace;
>>>>>>> 17e96eb (first commit)
