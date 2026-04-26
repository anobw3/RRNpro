import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Zap, Globe, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { nftDatabase } from "../data/nftDatabase";
import { NFTMetadata } from "../types";
import { RARITY_CONFIG } from "../data/rarityConfig";
import { getFinalRarity } from "../data/rarityUpgrade";
import NFTGrid from "./nft/NFTGrid";
import FilterBar from "./nft/FilterBar";
import { NFTImage } from "./nft/NFTCard";

export default function Collection() {
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
  const [search, setSearch] = useState("");
  const [activeIsland, setActiveIsland] = useState("All");
  const [activeRarity, setActiveRarity] = useState("All");

  const islands = Object.keys(nftDatabase);
  const rarities = ["Divine", "Mythic", "Legendary", "Epic", "Rare", "Common"];

  const allNFTs = useMemo(() => {
    return Object.values(nftDatabase).flat();
  }, []);

  const filteredNFTs = useMemo(() => {
    return allNFTs.filter((nft) => {
      const finalRarity = getFinalRarity(nft);
      const matchesSearch = 
        nft.name.toLowerCase().includes(search.toLowerCase()) ||
        nft.tribe.toLowerCase().includes(search.toLowerCase()) ||
        nft.outfit.toLowerCase().includes(search.toLowerCase()) ||
        nft.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesIsland = activeIsland === "All" || nft.island.toUpperCase() === activeIsland;
      const matchesRarity = activeRarity === "All" || finalRarity === activeRarity;

      return matchesSearch && matchesIsland && matchesRarity;
    });
  }, [allNFTs, search, activeIsland, activeRarity]);

  return (
    <div className="relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 inset-inline-start-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
      <div className="absolute bottom-0 inset-inline-start-0 w-full h-px bg-gradient-to-r from-transparent via-luxury-purple/20 to-transparent" />
      
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 mb-6"
          >
            <Sparkles className="w-3 h-3 text-luxury-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Genesis Edition</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display text-white mb-6 uppercase tracking-tighter"
          >
            Nusantara <span className="gold-text">Eterna</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed"
          >
            Explore the royal heritage of Indonesia through our meticulously crafted NFT collection. 
            Each piece represents a unique chapter of traditional identity, woven into the spirit of the Royal Raccoon.
          </motion.p>
        </div>

        {/* Filters */}
        <FilterBar 
          search={search}
          setSearch={setSearch}
          activeIsland={activeIsland}
          setActiveIsland={setActiveIsland}
          activeRarity={activeRarity}
          setActiveRarity={setActiveRarity}
          islands={islands}
          rarities={rarities}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="text-[10px] uppercase font-bold tracking-widest text-white/30">
            Showing <span className="text-white">{filteredNFTs.length}</span> Assets
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-white/30">
            Sorted by: <span className="text-luxury-gold">Divine Rarity</span>
          </div>
        </div>

        {/* NFT Grid */}
        <NFTGrid nfts={filteredNFTs} onSelect={setSelectedNFT} />

        {/* Empty State */}
        {filteredNFTs.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-3xl font-display text-white mb-4">No Warriors Found</h3>
            <p className="text-white/30">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNFT(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-3xl max-h-[90vh] lg:max-h-none"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedNFT(null)}
                className="absolute top-6 inset-inline-end-6 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative bg-black flex items-center justify-center overflow-hidden min-h-[400px] lg:min-h-0">
                <NFTImage 
                  src={selectedNFT.image} 
                  alt={selectedNFT.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Rarity Glow Aura */}
                <div className={`absolute inset-0 bg-gradient-to-t ${RARITY_CONFIG[getFinalRarity(selectedNFT)].gradient} opacity-40 mix-blend-screen pointer-events-none`} />
              </div>

              {/* Info Side */}
              <div className="w-full lg:w-1/2 p-10 md:p-14 overflow-y-auto bg-luxury-black/50">
                <div className="space-y-10">
                  {/* Badge & ID */}
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${RARITY_CONFIG[getFinalRarity(selectedNFT)].badge}`}>
                      {getFinalRarity(selectedNFT)}
                    </span>
                    <span className="text-white/20 font-mono text-sm tracking-widest uppercase">ID: #{selectedNFT.id.toString().padStart(5, '0')}</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-5xl md:text-7xl font-display text-white mb-4 uppercase tracking-tighter leading-none">
                      {selectedNFT.name.split('—')[0]}
                    </h2>
                    <div className="flex items-center gap-3 text-luxury-gold uppercase tracking-[0.5em] text-[10px] font-bold">
                       <Globe className="w-3 h-3" />
                       {selectedNFT.island} • {selectedNFT.tribe}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                     <span className="text-[10px] text-white/20 uppercase tracking-widest font-black block mb-2">Heritage Origin</span>
                     <p className="text-white/80 text-lg font-light leading-relaxed">
                        {selectedNFT.cultural_meta}
                     </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Philosophical Chronicle</h4>
                     <p className="text-white/60 leading-relaxed font-light text-lg">
                        {selectedNFT.description}
                     </p>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedNFT.attributes.map((attr, idx) => (
                      <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center text-center">
                        <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1 font-bold">{attr.trait_type}</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{attr.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buy Now & OpenSea */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
                    <button className="w-full flex-1 py-5 bg-luxury-gold text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:shadow-luxury-gold/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      Mint Asset (0.85 ETH)
                    </button>
                    <a 
                       href={`https://opensea.io/assets/ethereum/0x5678...4321/${selectedNFT.id}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full sm:w-auto px-8 py-5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:border-white/30 transition-all text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      OpenSea
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

