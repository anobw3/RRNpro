<<<<<<< HEAD
import { Search, Filter as FilterIcon, X } from "lucide-react";
=======
import { useState, useEffect, useCallback, memo } from "react";
import { Search, Filter as FilterIcon, X, LayoutGrid, Grid3X3, List, RotateCcw, ChevronDown } from "lucide-react";
import { useTranslation } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
>>>>>>> 17e96eb (first commit)

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  activeIsland: string;
  setActiveIsland: (val: string) => void;
  activeRarity: string;
  setActiveRarity: (val: string) => void;
  islands: string[];
  rarities: string[];
<<<<<<< HEAD
}

export default function FilterBar({
=======
  sortBy: string;
  setSortBy: (val: string) => void;
  viewMode: "grid" | "list" | "compact";
  setViewMode: (val: "grid" | "list" | "compact") => void;
  onResetFilters: () => void;
}

const FilterBar = memo(({
>>>>>>> 17e96eb (first commit)
  search,
  setSearch,
  activeIsland,
  setActiveIsland,
  activeRarity,
  setActiveRarity,
  islands,
<<<<<<< HEAD
  rarities
}: FilterBarProps) {
  return (
    <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
      {/* Search Bar - Premium Style */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold/30 to-luxury-purple/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-5 h-5 text-white/20 group-focus-within:text-luxury-gold transition-colors" />
          <input
            type="text"
            placeholder="Search tribe, outfit, or island..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 md:py-5 ps-14 pe-14 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-luxury-gold/20 transition-all backdrop-blur-md"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-5 text-white/20 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Island Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
             <FilterIcon className="w-3.5 h-3.5 text-luxury-gold/60" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Islands</span>
          </div>
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none -mx-1 px-1">
            {["All", ...islands].map((island) => (
              <button
                key={island}
                onClick={() => setActiveIsland(island)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
                  activeIsland === island
                    ? "bg-luxury-gold text-black border-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {island}
              </button>
            ))}
          </div>
        </div>

        {/* Rarity Filters */}
        <div className="space-y-3">
           <div className="flex items-center gap-2 px-1">
             <FilterIcon className="w-3.5 h-3.5 text-luxury-gold/60" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Rarity Tier</span>
          </div>
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none -mx-1 px-1">
            {["All", ...rarities].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setActiveRarity(rarity)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
                  activeRarity === rarity
                    ? "bg-luxury-gold text-black border-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
=======
  rarities,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onResetFilters
}: FilterBarProps) => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(search);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        console.log(`[Filter] Searching for: ${localSearch}`);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch, search]);

  // Sync local search with external reset
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const sortOptions = [
    { id: "price-low", label: t("details.element") === "Element" ? "Price: Low to High" : "Harga: Rendah ke Tinggi" },
    { id: "price-high", label: t("details.element") === "Element" ? "Price: High to Low" : "Harga: Tinggi ke Rendah" },
    { id: "rarity", label: t("details.element") === "Element" ? "Rarity Rank" : "Peringkat Kelangkaan" }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.id === sortBy)?.label || "Price: Low to High";
  const hasActiveFilters = search !== "" || activeIsland !== "All" || activeRarity !== "All";

  const handleIslandChange = useCallback((island: string) => {
    setActiveIsland(island);
    console.log(`[Filter] Island changed: ${island}`);
  }, [setActiveIsland]);

  const handleRarityChange = useCallback((rarity: string) => {
    setActiveRarity(rarity);
    console.log(`[Filter] Rarity changed: ${rarity}`);
  }, [setActiveRarity]);

  return (
    <div className="mb-10 space-y-4">
      {/* Primary Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-bg-secondary border border-border-soft p-2 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3 rounded-xl transition-all border flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${
              isFilterOpen ? "bg-accent-gold border-accent-gold text-black" : "bg-bg-card border-border-soft text-text-muted hover:text-text-primary"
            }`}
          >
            <FilterIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <div className="flex items-center p-1 bg-bg-card border border-border-soft rounded-xl gap-1">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-bg-secondary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("compact")}
              className={`p-2 rounded-lg transition-all ${viewMode === "compact" ? "bg-bg-secondary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-bg-secondary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Search */}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-gold transition-colors" />
          <input
            type="text"
            placeholder={t("collection.search_placeholder") || "Search items by name, rank, or traits..."}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-bg-card border border-border-soft rounded-xl py-3 ps-12 pe-12 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-gold/50 transition-all font-sans"
          />
          {localSearch && (
            <button 
              onClick={() => setLocalSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Custom Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none sm:min-w-[180px]">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full bg-bg-card border border-border-soft rounded-xl py-3 px-4 flex items-center justify-between gap-3 text-[10px] font-bold text-text-primary uppercase tracking-widest hover:bg-bg-secondary transition-all"
            >
              <span className="truncate">{currentSortLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsSortOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 left-0 sm:left-auto top-full mt-2 sm:w-56 bg-bg-secondary border border-border-soft rounded-xl overflow-hidden shadow-2xl z-50 origin-top shadow-accent-gold/5"
                  >
                    <div className="p-1">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSortBy(opt.id);
                            setIsSortOpen(false);
                            console.log(`[Filter] Sorting applied: ${opt.id}`);
                          }}
                          className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                            sortBy === opt.id 
                              ? "bg-accent-gold text-black" 
                              : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={onResetFilters}
            className="p-3 bg-bg-card border border-border-soft rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-all shrink-0 shadow-sm"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-bg-secondary border border-border-soft p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 shadow-sm">
              {/* Island Filters */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted ml-1">{t("details.region") || "Island Origin"}</span>
                <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-2 scrollbar-none -mx-2 px-2 md:mx-0 md:px-0">
                  {["All", ...islands].map((island) => (
                    <button
                      key={island}
                      onClick={() => handleIslandChange(island)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        activeIsland === island
                          ? "bg-accent-gold text-black border-accent-gold shadow-lg shadow-accent-gold-soft"
                          : "bg-bg-card text-text-secondary border-border-soft hover:border-text-muted hover:text-text-primary"
                      }`}
                    >
                      {island === "All" ? t("nav.all") : island}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rarity Filters */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted ml-1">{t("nav.rarity") || "Rarity Class"}</span>
                <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-2 scrollbar-none -mx-2 px-2 md:mx-0 md:px-0">
                  {["All", ...rarities].map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => handleRarityChange(rarity)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        activeRarity === rarity
                          ? "bg-text-primary text-bg-primary border-text-primary shadow-lg shadow-text-primary/10"
                          : "bg-bg-card text-text-secondary border-border-soft hover:border-text-muted hover:text-text-primary"
                      }`}
                    >
                      {rarity === "All" ? t("nav.all") : rarity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Controls */}
              <div className="space-y-4">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted ml-1">Status</span>
                 <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-2 scrollbar-none -mx-2 px-2 md:mx-0 md:px-0">
                    {["All", "Buy Now", "Live Auction", "Has Offers"].map(status => (
                      <button key={status} className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-bg-card text-text-secondary border border-border-soft hover:border-text-primary transition-all font-sans">
                        {status}
                      </button>
                    ))}
                 </div>
                 {hasActiveFilters && (
                   <button 
                     onClick={onResetFilters}
                     className="text-[10px] font-bold uppercase text-status-error hover:opacity-80 underline underline-offset-4 decoration-status-error/30 transition-all pt-2 block"
                   >
                     Reset Current Filters
                   </button>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FilterBar.displayName = "FilterBar";

export default FilterBar;

>>>>>>> 17e96eb (first commit)
