import { motion } from "motion/react";
import { ShoppingCart, ExternalLink, Users, Database, ShieldCheck, Zap } from "lucide-react";
import { NFT_COLLECTION } from "../constants";
import { useWallet } from "../context/WalletContext";
import { useTranslation } from "../context/LanguageContext";
import { NFTImage } from "./nft/NFTCard";
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
      
      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] mb-4 block text-glow">{t("marketplace.badge")}</span>
            <h2 className="text-[length:var(--font-size-fluid-h2)] font-display tracking-tighter uppercase leading-[0.9] text-text-primary">{t("marketplace.title_1")}<br/><span className="gold-text">{t("marketplace.title_2")}</span></h2>
          </motion.div>
          <motion.p 
            className="text-text-secondary text-lg md:text-xl font-light max-w-md lg:text-end"
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {t("marketplace.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nftsToDisplay.map((item, idx) => {
            const isOwned = isConnected && ownedNfts.includes(item.id);
            
            return (
              <motion.div
                key={item.id}
                className="group relative bg-bg-card border border-border-soft rounded-[18px] overflow-hidden hover:shadow-2xl transition-all duration-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              >
                <div className="p-4">
                  {/* Image Area */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-black">
                    <NFTImage 
                       src={item.image} 
                       alt={item.name}
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {isOwned && (
                      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-status-success text-black text-[8px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        {t("marketplace.your_asset")}
                      </div>
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="px-2 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-xl font-medium tracking-wide text-text-primary group-hover:text-gold transition-colors">{item.name}</h3>
                      <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">#{item.id}</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-bold text-text-muted uppercase tracking-widest">{item.rarity}</div>
                       <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-bold text-text-muted uppercase tracking-widest">{item.island}</div>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="pt-6 px-2 border-t border-border-soft">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-[9px] text-text-muted uppercase tracking-[0.2em] block mb-1">Price</span>
                        <span className="text-xl font-semibold text-text-primary">{item.price} ETH</span>
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] text-text-muted uppercase tracking-[0.2em] block mb-1">Status</span>
                         <span className="text-[10px] font-bold text-gold uppercase tracking-[0.1em]">Verified Asset</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleMint(item.id)}
                        disabled={isMinting}
                        className="btn-primary !px-4 !py-3 !text-[9px]"
                      >
                        {isMinting ? t("nav.minting") : "Buy Now"}
                      </button>
                      <a 
                         href={`https://opensea.io/assets/ethereum/0x5678...4321/${item.id}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-border-soft rounded-full text-text-muted text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>

        <div className="mt-20 text-center">
           <button className="px-12 py-5 bg-bg-card backdrop-blur-xl border border-border-soft text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all font-bold tracking-[0.3em] uppercase text-xs active:scale-95">
             {t("marketplace.explore")}
           </button>
        </div>
      </div>
    </div>
  );
});

Marketplace.displayName = "Marketplace";
export default Marketplace;
