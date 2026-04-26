import { motion } from "motion/react";
import { ShoppingCart, ExternalLink, Users, Database, ShieldCheck } from "lucide-react";
import { NFT_COLLECTION } from "../constants";
import { useWallet } from "../context/WalletContext";
import { useTranslation } from "../context/LanguageContext";

export default function Marketplace() {
  const { isConnected, ownedNfts } = useWallet();
  const { t, language } = useTranslation();

  return (
    <section id="marketplace" className="section-padding bg-luxury-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-inline-end-0 w-1/2 h-full bg-luxury-gold/5 blur-[120px] -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 opacity-30" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-luxury-purple text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] mb-4 block text-glow">{t("marketplace.badge")}</span>
            <h2 className="text-[length:var(--font-size-fluid-h2)] font-display tracking-tighter uppercase leading-[0.9]">{t("marketplace.title_1")}<br/><span className="gold-text">{t("marketplace.title_2")}</span></h2>
          </motion.div>
          <motion.p 
            className="text-white/40 text-lg md:text-xl font-light max-w-md lg:text-end"
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {t("marketplace.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {NFT_COLLECTION.slice(0, 6).map((item, idx) => {
            const isOwned = isConnected && ownedNfts.includes(item.id);
            
            return (
              <motion.div
                key={item.id}
                className="group relative glass-gold rounded-[3rem] overflow-hidden hover:shadow-[0_0_80px_rgba(212,175,55,0.15)] transition-all duration-1000 ring-1 ring-white/5 hover:ring-luxury-gold/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="p-6">
                  {/* Image Area */}
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={`${item.name} ${item.outfit}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 inset-inline-end-4 px-3 py-1 glass rounded-full text-[8px] font-bold tracking-widest uppercase text-white/80 border border-white/10 z-10">
                      {t("marketplace.supply")}: {item.supply}
                    </div>

                    {isOwned && (
                      <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-6 py-2 bg-green-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4" />
                           {t("marketplace.your_asset")}
                        </div>
                      </div>
                    )}
                  </div>

                {/* Info Area */}
                <div className="mb-6">
                   <div className="flex items-center justify-between mb-2">
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
                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-1">{t("marketplace.offer")}</span>
                      <span className="text-xl font-display text-white">{item.price} ETH</span>
                    </div>
                    <div className="text-end">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-1">{t("marketplace.floor_price")}</span>
                      <span className="text-sm font-display text-luxury-gold">{(parseFloat(item.price) * 0.9).toFixed(2)} ETH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
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
                    >
                      <ExternalLink className="w-3 h-3" />
                      OpenSea
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/[0.03] transition-colors duration-700 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

        <div className="mt-20 text-center">
           <button className="px-12 py-5 glass border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all font-bold tracking-[0.3em] uppercase text-xs">
             {t("marketplace.explore")}
           </button>
        </div>
      </div>
    </section>
  );
}
