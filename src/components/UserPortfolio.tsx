import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, RefreshCcw, Wallet, Info } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useUserNFTs, AlchemyNFT } from '../hooks/useUserNFTs';
import { CONTRACT_ADDRESS } from '../constants';
import { useTranslation } from '../context/LanguageContext';

const NFTSkeleton = () => (
  <div className="bg-bg-card border border-border-soft rounded-[24px] overflow-hidden animate-pulse">
    <div className="aspect-square bg-bg-primary/50" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-bg-primary/50 rounded w-3/4" />
      <div className="h-3 bg-bg-primary/50 rounded w-1/2" />
    </div>
  </div>
);

const NFTCard = ({ nft }: { nft: AlchemyNFT }) => {
  const { t } = useTranslation();
  const openseaUrl = `https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-bg-card border border-border-soft rounded-[32px] overflow-hidden hover:border-gold/30 transition-all duration-700 shadow-3xl"
    >
      <div className="aspect-square relative overflow-hidden bg-bg-primary/50">
        <img
          src={nft.image.thumbnailUrl || nft.image.cachedUrl || "/placeholder.png"}
          alt={nft.name}
          className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x400/0b0b0f/D4AF37?text=ARCHIVE";
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center z-20">
          <a
            href={openseaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-bg-card border border-gold/40 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-black transition-all shadow-2xl"
          >
            <ExternalLink className="w-3 h-3" />
            OpenSea
          </a>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
      
      <div className="p-6">
        <h3 className="text-[12px] font-bold text-text-primary truncate mb-2 uppercase tracking-widest leading-none">
          {nft.name || "Unnamed Legacy"}
        </h3>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-medium truncate flex-1">
            {nft.collection?.name || "The Archive"}
          </span>
          <span className="text-[9px] text-gold font-black tracking-tighter shrink-0 font-sans">
            #{nft.tokenId.length > 5 ? nft.tokenId.slice(0, 5) + '...' : nft.tokenId}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function UserPortfolio() {
  const { isConnected, address } = useWallet();
  const { nfts, loading, error, retry } = useUserNFTs(address);
  const { t } = useTranslation();

  if (!isConnected) return null;

  return (
    <div id="portfolio" className="py-32 relative overflow-hidden border-t border-border-soft">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-gold">Authenticated Vault</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display text-text-primary uppercase tracking-tighter leading-none font-medium">
              Digital <span className="text-gold italic">Heritage</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={retry}
              disabled={loading}
              className="flex items-center gap-3 px-6 py-3 bg-bg-card border border-border-soft rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-gold hover:border-gold/30 transition-all disabled:opacity-50 group"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-700`} />
              Synchronize
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {[...Array(4)].map((_, i) => (
                <NFTSkeleton key={i} />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center bg-bg-card rounded-[40px] border border-status-error/20 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-status-error/5 pointer-events-none" />
              <Info className="w-16 h-16 text-status-error mx-auto mb-6 relative z-10" />
              <h3 className="text-3xl font-display text-text-primary mb-4 uppercase tracking-tighter relative z-10">Sync Interrupted</h3>
              <p className="text-text-muted text-[13px] mb-12 max-w-sm mx-auto uppercase tracking-widest leading-relaxed relative z-10">{error}</p>
              <button
                onClick={retry}
                className="btn-primary px-12 py-5 !rounded-2xl relative z-10"
              >
                Re-Authenticate
              </button>
            </motion.div>
          ) : nfts.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="py-32 text-center bg-bg-card rounded-[48px] border border-border-soft shadow-3xl"
            >
              <div className="w-20 h-20 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center mx-auto mb-10">
                <Wallet className="w-8 h-8 text-gold/30" />
              </div>
              <h3 className="text-4xl font-display text-text-primary mb-6 uppercase tracking-tighter font-medium">Archive Empty</h3>
              <p className="text-text-secondary text-[12px] uppercase tracking-[0.2em] font-light max-w-sm mx-auto leading-relaxed opacity-60 mb-12">
                We couldn't detect any digital relics in this vault. Begin your lineage by minting a Royal Raccoon.
              </p>
              <a href="#marketplace" className="text-gold text-[10px] font-black uppercase tracking-[0.4em] underline underline-offset-8 decoration-gold/30 hover:decoration-gold transition-all">Visit Marketplace</a>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {nfts.map((nft, idx) => (
                <motion.div
                  key={`${nft.contract.address}-${nft.tokenId}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NFTCard nft={nft} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
