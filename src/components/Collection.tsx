import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Zap, Globe, Sparkles } from "lucide-react";
<<<<<<< HEAD
import { useState, useMemo } from "react";
import { nftDatabase } from "../data/nftDatabase";
=======
import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useTranslation } from "../context/LanguageContext";
import { nftDatabase } from "../data/nftDatabase";
import { useWallet } from "../context/WalletContext";
import MintModal from "./MintModal";
>>>>>>> 17e96eb (first commit)
import { NFTMetadata } from "../types";
import { RARITY_CONFIG } from "../data/rarityConfig";
import { getFinalRarity } from "../data/rarityUpgrade";
import NFTGrid from "./nft/NFTGrid";
import FilterBar from "./nft/FilterBar";
<<<<<<< HEAD
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
=======
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
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleCount(prev => prev + 12);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
>>>>>>> 17e96eb (first commit)
      
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
<<<<<<< HEAD
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 mb-6"
          >
            <Sparkles className="w-3 h-3 text-luxury-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold">Genesis Edition</span>
=======
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-gold-soft border border-accent-gold-soft mb-6"
          >
            <Sparkles className="w-3 h-3 text-accent-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">{t("collection.badge")}</span>
>>>>>>> 17e96eb (first commit)
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
<<<<<<< HEAD
            className="text-5xl md:text-8xl font-display text-white mb-6 uppercase tracking-tighter"
          >
            Nusantara <span className="gold-text">Eterna</span>
=======
            className="text-5xl md:text-8xl font-display text-text-primary mb-6 uppercase tracking-tighter"
          >
            {t("hero.title_3")} <span className="gold-text">{t("rarity.divine")}</span>
>>>>>>> 17e96eb (first commit)
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
<<<<<<< HEAD
            className="text-white/40 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed"
          >
            Explore the royal heritage of Indonesia through our meticulously crafted NFT collection. 
            Each piece represents a unique chapter of traditional identity, woven into the spirit of the Royal Raccoon.
=======
            className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed"
          >
            {t("collection.adjust_filters")}
>>>>>>> 17e96eb (first commit)
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
<<<<<<< HEAD
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
=======
          sortBy={sortBy}
          setSortBy={setSortBy}
          islands={islands}
          viewMode={viewMode}
          setViewMode={setViewMode}
          rarities={rarities}
          onResetFilters={resetFilters}
        />

        {/* Collection Info Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 p-4 md:p-6 bg-bg-secondary border border-border-soft rounded-3xl backdrop-blur-xl z-10 relative shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-auto rounded-2xl overflow-hidden p-1">
              <SafeImage 
                src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                alt="Nusantara Eterna Logo" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-display text-text-primary uppercase tracking-tight">Nusantara Eterna</h1>
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-[10px] text-white"
                  >✓</motion.div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                <span>7,777 {t("marketplace.items") || "Items"}</span>
                <span>•</span>
                <span>0.02 ETH {t("nft.mint") || "Mint"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12 w-full lg:w-auto">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">{t("marketplace.floor_price")}</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-text-primary">{stats.floorPrice} ETH</span>
                <span className="text-[10px] text-status-success font-bold">+12.4%</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">{t("marketplace.offer")}</span>
              <span className="text-xl font-bold text-text-primary">{stats.topOffer} ETH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">24h {t("marketplace.volume") || "Vol"}</span>
              <span className="text-xl font-bold text-text-primary">{stats.vol24h}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">{t("marketplace.owners")}</span>
              <span className="text-xl font-bold text-text-primary">{stats.owners}</span>
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
                  nfts={isDataLoading ? [] : filteredAndSortedNFTs} 
                  onSelect={setSelectedNFT} 
                  loading={isDataLoading}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-bg-card border border-border-soft rounded-3xl shadow-sm">
             <h3 className="text-xl text-text-muted font-display uppercase tracking-widest">{activeTab} section coming soon</h3>
>>>>>>> 17e96eb (first commit)
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
<<<<<<< HEAD
              className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
=======
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-3xl"
>>>>>>> 17e96eb (first commit)
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
<<<<<<< HEAD
              className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-3xl max-h-[90vh] lg:max-h-none"
=======
              className="relative w-full max-w-6xl bg-bg-primary rounded-[2.5rem] border border-border-soft overflow-hidden flex flex-col lg:flex-row shadow-3xl max-h-[90vh] lg:max-h-none"
>>>>>>> 17e96eb (first commit)
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedNFT(null)}
<<<<<<< HEAD
                className="absolute top-6 inset-inline-end-6 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white"
=======
                className="absolute top-6 inset-inline-end-6 z-50 p-3 bg-bg-card hover:bg-bg-secondary rounded-full border border-border-soft transition-all text-text-primary"
>>>>>>> 17e96eb (first commit)
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
<<<<<<< HEAD
              <div className="w-full lg:w-1/2 p-10 md:p-14 overflow-y-auto bg-luxury-black/50">
=======
              <div className="w-full lg:w-1/2 p-10 md:p-14 overflow-y-auto bg-bg-secondary/50">
>>>>>>> 17e96eb (first commit)
                <div className="space-y-10">
                  {/* Badge & ID */}
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${RARITY_CONFIG[getFinalRarity(selectedNFT)].badge}`}>
<<<<<<< HEAD
                      {getFinalRarity(selectedNFT)}
                    </span>
                    <span className="text-white/20 font-mono text-sm tracking-widest uppercase">ID: #{selectedNFT.id.toString().padStart(5, '0')}</span>
=======
                      {t(`rarity.${getFinalRarity(selectedNFT).toLowerCase()}`) || getFinalRarity(selectedNFT)}
                    </span>
                    <span className="text-text-muted font-mono text-sm tracking-widest uppercase">{t("details.archive_id")}: #{selectedNFT.id.toString().padStart(5, '0')}</span>
>>>>>>> 17e96eb (first commit)
                  </div>

                  {/* Title */}
                  <div>
<<<<<<< HEAD
                    <h2 className="text-5xl md:text-7xl font-display text-white mb-4 uppercase tracking-tighter leading-none">
                      {selectedNFT.name.split('—')[0]}
                    </h2>
                    <div className="flex items-center gap-3 text-luxury-gold uppercase tracking-[0.5em] text-[10px] font-bold">
=======
                    <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-4 uppercase tracking-tighter leading-none">
                      {selectedNFT.name.split('—')[0]}
                    </h2>
                    <div className="flex items-center gap-3 text-accent-gold uppercase tracking-[0.5em] text-[10px] font-bold">
>>>>>>> 17e96eb (first commit)
                       <Globe className="w-3 h-3" />
                       {selectedNFT.island} • {selectedNFT.tribe}
                    </div>
                  </div>

                  {/* Meta Info */}
<<<<<<< HEAD
                  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                     <span className="text-[10px] text-white/20 uppercase tracking-widest font-black block mb-2">Heritage Origin</span>
                     <p className="text-white/80 text-lg font-light leading-relaxed">
=======
                  <div className="p-6 bg-bg-card border border-border-soft rounded-3xl">
                     <span className="text-[10px] text-text-muted uppercase tracking-widest font-black block mb-2">{t("details.heritage_origin") || "Heritage Origin"}</span>
                     <p className="text-text-primary text-lg font-light leading-relaxed">
>>>>>>> 17e96eb (first commit)
                        {selectedNFT.cultural_meta}
                     </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
<<<<<<< HEAD
                     <h4 className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Philosophical Chronicle</h4>
                     <p className="text-white/60 leading-relaxed font-light text-lg">
=======
                     <h4 className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-black">{t("details.chronicles")}</h4>
                     <p className="text-text-secondary leading-relaxed font-light text-lg">
>>>>>>> 17e96eb (first commit)
                        {selectedNFT.description}
                     </p>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedNFT.attributes.map((attr, idx) => (
<<<<<<< HEAD
                      <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center text-center">
                        <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1 font-bold">{attr.trait_type}</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{attr.value}</span>
=======
                      <div key={idx} className="p-4 bg-bg-card border border-border-soft rounded-2xl flex flex-col items-center text-center">
                        <span className="text-[8px] text-text-muted uppercase tracking-[0.2em] mb-1 font-bold">{attr.trait_type}</span>
                        <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">{attr.value}</span>
>>>>>>> 17e96eb (first commit)
                      </div>
                    ))}
                  </div>

                  {/* Buy Now & OpenSea */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
<<<<<<< HEAD
                    <button className="w-full flex-1 py-5 bg-luxury-gold text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:shadow-luxury-gold/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      Mint Asset (0.85 ETH)
=======
                    <button 
                      onClick={() => handleMint(selectedNFT.id.toString())}
                      disabled={isMinting}
                      className="btn-gold w-full flex-1 py-5 !rounded-2xl"
                    >
                      {isMinting ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4 fill-current" />
                      )}
                      {isMinting ? t("nav.minting") : `${t("nft.mint")} (${getPrice(selectedNFT)} ETH)`}
>>>>>>> 17e96eb (first commit)
                    </button>
                    <a 
                       href={`https://opensea.io/assets/ethereum/0x5678...4321/${selectedNFT.id}`}
                       target="_blank"
                       rel="noopener noreferrer"
<<<<<<< HEAD
                       className="w-full sm:w-auto px-8 py-5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:border-white/30 transition-all text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      OpenSea
=======
                       className="w-full sm:w-auto px-8 py-5 border border-border-soft rounded-2xl text-text-muted hover:text-text-primary transition-all text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {t("marketplace.view_opensea")}
>>>>>>> 17e96eb (first commit)
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
<<<<<<< HEAD
  );
}
=======
    );
});

Collection.displayName = "Collection";
export default Collection;
>>>>>>> 17e96eb (first commit)

