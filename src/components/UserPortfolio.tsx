import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, RefreshCcw, Wallet, Info } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useUserNFTs, AlchemyNFT } from '../hooks/useUserNFTs';
import { CONTRACT_ADDRESS } from '../constants';
import { useTranslation } from 'react-i18next';

const NFTSkeleton = () => (
  <div className="bg-bg-card border border-border-soft rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-text-primary/10" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-text-primary/10 rounded w-3/4" />
      <div className="h-3 bg-text-primary/10 rounded w-1/2" />
    </div>
  </div>
);

const NFTCard = ({ nft }: { nft: AlchemyNFT }) => {
  const { t } = useTranslation();
  const openseaUrl = `https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group luxury-card overflow-hidden active:scale-[0.98]"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={nft.image.thumbnailUrl || nft.image.cachedUrl || "/placeholder.png"}
          alt={nft.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x400/1a1a1a/D4AF37?text=NFT";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
          <a
            href={openseaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-accent-gold rounded-full text-black hover:scale-110 transition-transform"
            title="View on OpenSea"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-bold text-text-primary truncate mb-1 uppercase tracking-tight">
          {nft.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest font-medium">
            {nft.collection?.name || "Unidentified"}
          </span>
          <span className="text-[10px] text-accent-gold font-bold">
            #{nft.tokenId.length > 5 ? nft.tokenId.slice(0, 5) + '...' : nft.tokenId}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function UserPortfolio() {
  const { isConnected, address } = useWallet();
  const { nfts, loading, error, retry } = useUserNFTs(address); // We could pass CONTRACT_ADDRESS here to filter
  const { t } = useTranslation();

  if (!isConnected) return null;

  return (
    <div id="portfolio" className="py-24 relative overflow-hidden border-t border-border-soft">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent-gold" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent-gold">Your Collection</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary uppercase tracking-tighter leading-none">
              NFT <span className="gold-text">Portfolio</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={retry}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-soft rounded-full text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-accent-gold transition-all disabled:opacity-50"
            >
              <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              Sync Assets
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
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {[...Array(4)].map((_, i) => (
                <NFTSkeleton key={i} />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center bg-status-error/5 rounded-3xl border border-status-error/10"
            >
              <span className="sr-only">Error sync failed</span>
              <Info className="w-12 h-12 text-status-error mx-auto mb-4" />
              <h3 className="text-xl font-display text-text-primary mb-2 uppercase">Sync Failed</h3>
              <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">{error}</p>
              <button
                onClick={retry}
                className="px-8 py-3 bg-status-error text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all font-sans"
              >
                Retry Request
              </button>
            </motion.div>
          ) : nfts.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="py-24 text-center bg-bg-card rounded-[3rem] border border-border-soft"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-accent-gold/50" />
              </div>
              <h3 className="text-2xl font-display text-text-primary mb-4 uppercase tracking-tighter">No Assets Found</h3>
              <p className="text-text-secondary text-sm max-w-xs mx-auto leading-relaxed">
                We couldn't detect any NFTs in this wallet. Mint your first Royal Raccoon to start your collection.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {nfts.map((nft) => (
                <NFTCard key={`${nft.contract.address}-${nft.tokenId}`} nft={nft} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
