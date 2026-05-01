import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Zap, Globe, Sparkles, ShieldCheck } from "lucide-react";
import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useTranslation } from "../context/LanguageContext";
import { nftDatabase } from "../data/nftDatabase";
import { useWallet } from "../context/WalletContext";
import MintModal from "./MintModal";
import { NFTMetadata } from "../types";
import { RARITY_CONFIG } from "../data/rarityConfig";
import { getFinalRarity } from "../data/rarityUpgrade";
import NFTGrid from "./nft/NFTGrid";
import FilterBar from "./nft/FilterBar";
import NFTCard, { NFTImage } from "./nft/NFTCard";
import SafeImage from "./ui/SafeImage";

const Collection = memo(() => {
  // DEBUG LOG
  console.log("Collection Component Rendering");
  const { t } = useTranslation();
  const { isMinting, mint, isConnected, connect, chainId, switchNetwork, error: walletError, mintSuccess, txHash } = useWallet();
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
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
        message: t("nav.success")
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

  const [search, setSearch] = useState("");
  const [activeIsland, setActiveIsland] = useState("All");
  const [activeRarity, setActiveRarity] = useState("All");
  const [sortBy, setSortBy] = useState("price-low");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [activeTab, setActiveTab] = useState("Items");

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    // Simulate data preparation
    setIsDataLoading(true);
    const timer = setTimeout(() => {
      setIsDataLoading(false);
      console.log("[Collection] data ready.");
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeIsland, activeRarity, search]); // Re-trigger loading on filter change to show off skeletons

  // Update visible items on scroll for simple virtualization/lazy loading
  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + 12);
  }, []);

  const islands = useMemo(() => Object.keys(nftDatabase), []);
  const rarities = useMemo(() => ["Divine", "Mythic", "Legendary", "Epic", "Rare", "Common"], []);
  
  const rarityRank: Record<string, number> = useMemo(() => ({
    "Divine": 6,
    "Mythic": 5,
    "Legendary": 4,
    "Epic": 3,
    "Rare": 2,
    "Common": 1
  }), []);

  const getPrice = useCallback((nft: NFTMetadata) => {
    const finalRarity = getFinalRarity(nft);
    return finalRarity === "Divine" ? 0.15 : finalRarity === "Mythic" ? 0.12 : finalRarity === "Legendary" ? 0.10 : finalRarity === "Epic" ? 0.08 : finalRarity === "Rare" ? 0.05 : 0.02;
  }, []);

  const allNFTs = useMemo(() => {
    try {
      const dbValues = Object.values(nftDatabase || {});
      if (!dbValues || dbValues.length === 0) {
        console.warn("NFT Database is empty or undefined");
        return [];
      }
      const data = dbValues.flat();
      console.log(`[Collection] Loaded ${data.length} NFTs from database.`);
      
      // Ensure IPFS links are valid as a first-pass correction
      return data.map(nft => ({
        ...nft,
        image: (nft?.image || "").replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
      }));
    } catch (err) {
      console.error("Error processing NFT data:", err);
      return [];
    }
  }, []);

  const ALL = "All";

  const normalizeRegion = (region: string) => {
    if (!region) return "OTHER";
    const r = region.toLowerCase();

    if (r.includes("bali")) return "BALI_NUSA_TENGGARA";
    if (r.includes("nusa")) return "BALI_NUSA_TENGGARA";
    if (r.includes("ntb")) return "BALI_NUSA_TENGGARA";
    if (r.includes("ntt")) return "BALI_NUSA_TENGGARA";

    if (r.includes("sumatra")) return "SUMATRA";
    if (r.includes("java")) return "JAVA";
    if (r.includes("kalimantan")) return "KALIMANTAN";
    if (r.includes("sulawesi")) return "SULAWESI";
    if (r.includes("papua")) return "PAPUA";

    return "OTHER";
  };

  const filteredAndSortedNFTs = useMemo(() => {
    const searchTerms = search.toLowerCase().trim();
    
    let filtered = allNFTs.filter((nft) => {
      const finalRarity = getFinalRarity(nft);
      
      const matchesSearch = !searchTerms || 
        nft.name.toLowerCase().includes(searchTerms) ||
        nft.tribe.toLowerCase().includes(searchTerms) ||
        nft.island.toLowerCase().includes(searchTerms) ||
        nft.description.toLowerCase().includes(searchTerms) ||
        nft.attributes.some(attr => 
          attr.trait_type.toLowerCase().includes(searchTerms) || 
          attr.value.toLowerCase().includes(searchTerms)
        );
      
      const matchRegion = activeIsland === ALL || normalizeRegion(nft.island) === activeIsland;
      const matchRarity = activeRarity === ALL || finalRarity.toLowerCase() === activeRarity.toLowerCase();

      return matchesSearch && matchRegion && matchRarity;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low" || sortBy === "id") {
        return getPrice(a) - getPrice(b);
      }
      if (sortBy === "price-high") {
        return getPrice(b) - getPrice(a);
      }
      if (sortBy === "rarity") {
        const rankA = rarityRank[getFinalRarity(a)] || 0;
        const rankB = rarityRank[getFinalRarity(b)] || 0;
        return rankB - rankA;
      }
      return 0;
    });
  }, [allNFTs, search, activeIsland, activeRarity, sortBy, getPrice, rarityRank]);

  const visibleNFTs = useMemo(() => filteredAndSortedNFTs.slice(0, visibleCount), [filteredAndSortedNFTs, visibleCount]);

  const stats = useMemo(() => {
    const prices = allNFTs.map(getPrice);
    const floor = prices.length > 0 ? Math.min(...(prices as number[])) : 0.02;
    return {
      floorPrice: floor,
      topOffer: 0.018,
      vol24h: "12.8 ETH",
      owners: new Set(allNFTs.map(n => n.id % 100)).size + "K" // Dynamic owners simulation
    };
  }, [allNFTs]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setActiveIsland(ALL);
    setActiveRarity(ALL);
    setSortBy("price-low");
    setVisibleCount(12);
  }, []);

  const handleMint = useCallback(async (nftId: string) => {
    if (!isConnected) {
      console.log("[Collection] Mint triggered - connecting wallet");
      await connect();
      return;
    }

    console.log(`[Collection] Mint triggered for NFT: ${nftId}`);
    await mint(nftId);
  }, [isConnected, connect, mint]);

  if (!allNFTs || allNFTs.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.4em] font-bold">
        {t("collection.no_records")}
      </div>
    );
  }

  return (
    <div className="relative z-10">
    <MintModal 
      isOpen={mintStatus.isOpen} 
      onClose={() => setMintStatus({ ...mintStatus, isOpen: false })} 
      status={mintStatus.status}
      message={mintStatus.message}
      txHash={txHash || undefined}
    />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 inset-inline-start-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
      <div className="absolute bottom-0 inset-inline-start-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
      
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-gold-soft border border-accent-gold-soft mb-6"
          >
            <Sparkles className="w-3 h-3 text-accent-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">{t("collection.badge")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display text-text-primary mb-6 uppercase tracking-tighter"
          >
            {t("hero.title_3")} <span className="gold-text">{t("rarity.divine")}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed"
          >
            {t("collection.adjust_filters")}
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
          sortBy={sortBy}
          setSortBy={setSortBy}
          islands={islands}
          viewMode={viewMode}
          setViewMode={setViewMode}
          rarities={rarities}
          onResetFilters={resetFilters}
        />

        {/* Collection Info Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-12 p-8 bg-bg-card/40 border border-border-soft rounded-[32px] backdrop-blur-xl relative shadow-2xl">
          <div className="flex items-center gap-8">
            <div className="relative w-36 h-auto rounded-2xl overflow-hidden shadow-2xl p-0.5 bg-gradient-to-br from-gold/30 to-transparent">
              <SafeImage 
                 src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                 alt="Nusantara Eterna Logo" 
                 className="w-full h-auto object-contain rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-medium text-text-primary uppercase tracking-tight">Nusantara Eterna</h1>
                <div className="px-3 py-1 bg-gold/10 text-gold text-[8px] font-black uppercase tracking-widest rounded-full border border-gold/20">Royal Verified</div>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                <span>7,777 Unique Assets</span>
                <span>•</span>
                <span>Established Lineage</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 lg:gap-16 w-full lg:w-auto">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Floor Price</span>
              <span className="text-2xl font-display font-medium text-text-primary">{stats.floorPrice} ETH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">High Offer</span>
              <span className="text-2xl font-display font-medium text-text-primary">{stats.topOffer} ETH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Circulation</span>
              <span className="text-2xl font-display font-medium text-text-primary">{stats.vol24h}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Holders</span>
              <span className="text-2xl font-display font-medium text-text-primary">{stats.owners}</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-soft">
          <div className="flex gap-8">
            {["Items", "Offers", "Analytics", "Activity"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                  activeTab === tab ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {t(`marketplace.tab_${tab.toLowerCase()}`) || tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Live Marketplace Data</span>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Items" ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Marketplace Sidebar */}
            <div className="hidden xl:block w-64 shrink-0 space-y-6">
              <div className="bg-bg-card border border-border-soft rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="p-5 bg-gradient-to-b from-purple-500/10 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-accent-gold fill-accent-gold" />
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Instant Sell</h3>
                  </div>
                  <div className="mb-6">
                     <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Max Offer Value</div>
                     <div className="text-2xl font-display text-text-primary">2.194 <span className="text-accent-gold text-sm font-bold">ETH</span></div>
                  </div>
                  <button className="btn-gold w-full py-4 !rounded-xl">
                    Sell Now
                  </button>
                </div>
                <div className="p-4 border-t border-border-soft bg-bg-primary/50">
                   <button className="w-full text-center text-[10px] font-bold text-text-muted hover:text-text-primary uppercase tracking-widest transition-colors">
                      View All Offers
                   </button>
                </div>
              </div>

              <div className="bg-bg-card border border-border-soft rounded-2xl p-5 space-y-4">
                 <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Listing Activity</h4>
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-soft flex-shrink-0 animate-pulse" />
                         <div className="flex-1 space-y-1">
                            <div className="h-2 w-16 bg-text-muted/20 rounded animate-pulse" />
                            <div className="h-2 w-24 bg-text-muted/10 rounded animate-pulse" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* NFT Grid with dynamic view mode and built-in loading handler */}
              {filteredAndSortedNFTs.length === 0 && !isDataLoading ? (
                <div className="text-center py-20 bg-bg-card border border-border-soft rounded-3xl backdrop-blur-xl shadow-xl">
                  <h3 className="text-xl sm:text-2xl font-display text-text-primary mb-2 uppercase tracking-tight">No Nusantara Found</h3>
                  <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto px-6 font-light">{t("collection.adjust_filters")}</p>
                  <button onClick={resetFilters} className="btn-gold px-8 py-3 !rounded-full">Reset Filters</button>
                </div>
              ) : (
                <NFTGrid 
                  nfts={isDataLoading ? [] : visibleNFTs} 
                  totalCount={filteredAndSortedNFTs.length}
                  onSelect={setSelectedNFT} 
                  onLoadMore={handleLoadMore}
                  loading={isDataLoading}
                  view={viewMode}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-bg-card border border-border-soft rounded-3xl shadow-sm">
             <h3 className="text-xl text-text-muted font-display uppercase tracking-widest">{activeTab} section coming soon</h3>
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
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-3xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl bg-bg-primary rounded-[32px] border border-border-soft overflow-hidden flex flex-col lg:flex-row shadow-3xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedNFT(null)}
                className="absolute top-6 right-6 z-50 p-4 bg-bg-card/80 backdrop-blur-md hover:bg-bg-secondary rounded-full border border-border-soft transition-all text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative bg-black flex items-center justify-center overflow-hidden min-h-[400px]">
                <NFTImage 
                  src={selectedNFT.image} 
                  alt={selectedNFT.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>

              {/* Info Side */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 bg-bg-secondary/30 backdrop-blur-sm">
                <div className="space-y-8">
                  {/* Badge & ID */}
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${RARITY_CONFIG[getFinalRarity(selectedNFT)].badge}`}>
                      {getFinalRarity(selectedNFT)}
                    </span>
                    <span className="text-text-muted font-mono text-xs tracking-widest">#{selectedNFT.id.toString().padStart(5, '0')}</span>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-text-primary mb-4 uppercase tracking-tight">
                      {selectedNFT.name.split('—')[0]}
                    </h2>
                    <div className="flex items-center gap-3 text-gold uppercase tracking-[0.4em] text-[9px] font-bold">
                       <Globe className="w-3 h-3" />
                       {selectedNFT.island} • {selectedNFT.tribe}
                    </div>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {selectedNFT.attributes.slice(0, 4).map((attr, idx) => (
                      <div key={idx} className="p-4 bg-bg-card/50 border border-border-soft rounded-2xl">
                        <span className="text-[8px] text-text-muted uppercase tracking-widest block mb-1">{attr.trait_type}</span>
                        <span className="text-xs font-bold text-text-primary uppercase">{attr.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Heritage Description */}
                  <div className="p-6 bg-bg-card/50 border border-border-soft rounded-2xl">
                      <p className="text-text-secondary text-sm font-light leading-relaxed italic">
                        "{selectedNFT.cultural_meta}"
                      </p>
                  </div>

                  {/* Action */}
                  <div className="pt-6 border-t border-border-soft">
                    <div className="flex items-center justify-between mb-8">
                       <div>
                         <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-1">Minting Fee</span>
                         <span className="text-2xl font-display font-medium text-text-primary">{getPrice(selectedNFT)} ETH</span>
                       </div>
                       <div className="text-right">
                          <span className="text-[9px] text-text-muted uppercase tracking-widest block mb-1">Verification</span>
                          <ShieldCheck className="w-5 h-5 text-gold ml-auto" />
                       </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleMint(selectedNFT.id.toString())}
                        disabled={isMinting}
                        className="btn-primary flex-1 py-4 text-xs"
                      >
                        {isMinting ? t("nav.minting") : "Acquire Asset"}
                      </button>
                      <a 
                         href={`https://opensea.io/assets/ethereum/0x5678...4321/${selectedNFT.id}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center p-4 bg-white/5 border border-border-soft rounded-full text-text-muted hover:text-text-primary transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    );
});

Collection.displayName = "Collection";
export default Collection;

