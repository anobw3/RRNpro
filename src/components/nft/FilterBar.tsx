import { Search, Filter as FilterIcon, X } from "lucide-react";

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  activeIsland: string;
  setActiveIsland: (val: string) => void;
  activeRarity: string;
  setActiveRarity: (val: string) => void;
  islands: string[];
  rarities: string[];
}

export default function FilterBar({
  search,
  setSearch,
  activeIsland,
  setActiveIsland,
  activeRarity,
  setActiveRarity,
  islands,
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
