import { NFTMetadata } from "../../types";
import NFTCard from "./NFTCard";
<<<<<<< HEAD
import * as ReactWindow from "react-window";
=======
>>>>>>> 17e96eb (first commit)
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { LayoutGrid, List as ListIcon, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

<<<<<<< HEAD
const List = (ReactWindow as any).List || (ReactWindow as any).default?.List;

interface NFTGridProps {
  nfts: NFTMetadata[];
  onSelect: (nft: NFTMetadata) => void;
}

type ViewMode = "grid" | "list" | "compact";

// Memoized Row Component for react-window v2
const RowComponent = memo(({ index, style, nfts, columnCount, itemWidth, gap, onSelect, view }: any) => {
  const items = [];
  const startIndex = index * columnCount;

  for (let i = 0; i < columnCount; i++) {
    const nftIndex = startIndex + i;
    if (nftIndex < nfts.length) {
      items.push(
        <div 
          key={nfts[nftIndex].id} 
          style={{ width: itemWidth, marginRight: i < columnCount - 1 ? gap : 0 }}
        >
          <NFTCard nft={nfts[nftIndex]} onClick={onSelect} view={view} />
        </div>
      );
    }
  }

  return (
    <div style={{ ...style, display: "flex", paddingBottom: gap }}>
      {items}
=======
interface NFTGridProps {
  nfts: NFTMetadata[];
  onSelect: (nft: NFTMetadata) => void;
  loading?: boolean;
}

const NFTSkeleton = memo(({ view }: { view: ViewMode }) => {
  if (view === "list") {
    return (
      <div className="w-full h-[120px] bg-bg-card border border-border-soft rounded-2xl p-4 flex gap-6 animate-pulse">
        <div className="w-24 h-24 bg-border-soft rounded-xl shrink-0" />
        <div className="flex flex-col justify-center gap-3 flex-1">
          <div className="h-4 bg-border-soft rounded w-1/3" />
          <div className="h-3 bg-border-soft rounded w-2/3 opacity-60" />
        </div>
      </div>
    );
  }

  if (view === "compact") {
    return (
      <div className="aspect-square bg-bg-card border border-border-soft rounded-xl animate-pulse" />
    );
  }

  return (
    <div className="w-full bg-bg-card border border-border-soft rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-border-soft" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 bg-border-soft rounded w-1/4" />
        <div className="h-5 bg-border-soft rounded w-3/4" />
      </div>
>>>>>>> 17e96eb (first commit)
    </div>
  );
});

<<<<<<< HEAD
RowComponent.displayName = "RowComponent";

export default function NFTGrid({ nfts, onSelect }: NFTGridProps) {
=======
NFTSkeleton.displayName = "NFTSkeleton";

type ViewMode = "grid" | "list" | "compact";

export default function NFTGrid({ nfts, onSelect, loading }: NFTGridProps) {
>>>>>>> 17e96eb (first commit)
  const [view, setView] = useState<ViewMode>("grid");
  const [columnCount, setColumnCount] = useState(5);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth - 48, 1280);
      setContainerWidth(width);
      
      if (view === "list") {
        setColumnCount(1);
      } else if (view === "compact") {
        if (width < 640) setColumnCount(3);
        else if (width < 768) setColumnCount(4);
        else if (width < 1024) setColumnCount(6);
        else setColumnCount(8);
      } else {
        if (width < 640) setColumnCount(2);
        else if (width < 768) setColumnCount(2);
        else if (width < 1024) setColumnCount(3);
        else if (width < 1280) setColumnCount(4);
        else setColumnCount(5);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [view]);

  const gap = view === "compact" ? 8 : 16;
  const itemWidth = useMemo(() => (containerWidth - (columnCount - 1) * gap) / columnCount, [containerWidth, columnCount, gap]);
  
  const itemHeight = useMemo(() => {
    if (view === "list") return 120; 
    if (view === "compact") return itemWidth; 
    return itemWidth + 100; 
  }, [view, itemWidth]);

<<<<<<< HEAD
  const rowCount = Math.ceil(nfts.length / columnCount);
=======
  const rowCount = Math.ceil((loading && nfts.length === 0 ? columnCount * 3 : nfts.length) / columnCount);
>>>>>>> 17e96eb (first commit)

  const rowData = useMemo(() => ({
    nfts,
    columnCount,
    itemWidth,
    gap,
    onSelect,
<<<<<<< HEAD
    view
  }), [nfts, columnCount, itemWidth, gap, onSelect, view]);
=======
    view,
    loading: loading && nfts.length === 0
  }), [nfts, columnCount, itemWidth, gap, onSelect, view, loading]);
>>>>>>> 17e96eb (first commit)

  const viewModes: { id: ViewMode; icon: any; label: string }[] = [
    { id: "grid", icon: LayoutGrid, label: "Grid" },
    { id: "list", icon: ListIcon, label: "List" },
    { id: "compact", icon: Grid3X3, label: "Compact" },
  ];

  return (
    <div className="w-full">
<<<<<<< HEAD
      <div className="flex justify-between items-center mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 max-w-fit">
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setView(mode.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
              ${view === mode.id ? "text-black" : "text-white/40 hover:text-white/60"}
            `}
          >
            {view === mode.id && (
              <motion.div
                layoutId="activeView"
                className="absolute inset-0 bg-luxury-gold rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <mode.icon className={`w-4 h-4 relative z-10 transition-colors`} />
            <span className="relative z-10 hidden sm:inline">{mode.label}</span>
          </button>
        ))}
=======
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex bg-bg-card backdrop-blur-md border border-border-soft rounded-2xl p-1.5 w-full sm:w-auto overflow-hidden text-text-primary">
          {viewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setView(mode.id)}
              className={`
                relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${view === mode.id ? "text-black" : "text-text-muted hover:text-text-secondary"}
              `}
            >
              {view === mode.id && (
                <motion.div
                  layoutId="activeView"
                  className="absolute inset-0 bg-accent-gold rounded-xl shadow-[0_0_15px_var(--accent-gold-soft)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <mode.icon className={`w-3.5 h-3.5 relative z-10 transition-colors`} />
              <span className="relative z-10">{mode.label}</span>
            </button>
          ))}
        </div>
        
        <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-text-muted">
          <span className={`w-2 h-2 rounded-full ${loading ? "bg-accent-gold animate-pulse" : "bg-status-success"}`} />
          {loading && nfts.length === 0 ? "Summoning Spirits..." : `${nfts.length} Assets Found`}
        </div>
>>>>>>> 17e96eb (first commit)
      </div>

      <AnimatePresence mode="wait">
        <motion.div
<<<<<<< HEAD
          key={view}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <div className="md:hidden grid gap-3" 
            style={{ 
              gridTemplateColumns: view === "compact" 
                ? `repeat(3, minmax(0, 1fr))` 
                : view === "list" 
                  ? "1fr" 
                  : "repeat(2, minmax(0, 1fr))" 
            }}
          >
            {nfts.map((nft) => (
              <NFTCard key={nft.id.toString()} nft={nft} onClick={onSelect} view={view} />
            ))}
          </div>
          
          <div className="hidden md:block">
            <List
              height={800}
              rowCount={rowCount}
              rowHeight={itemHeight + gap}
              width={containerWidth}
              rowComponent={RowComponent}
              rowProps={rowData}
              className="scrollbar-hide"
            />
=======
          key={view + (loading && nfts.length === 0 ? '-loading' : '')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {/* Mobile Display */}
          <div className="md:hidden pb-10">
            <div className={`grid gap-6 mt-6 ${
              view === "grid" ? "grid-cols-1" : 
              view === "compact" ? "grid-cols-3" : "grid-cols-1"
            }`}>
              {loading && nfts.length === 0 ? (
                Array.from({ length: 9 }).map((_, idx) => (
                  <NFTSkeleton key={idx} view={view} />
                ))
              ) : (
                nfts.map((nft) => (
                  <div key={nft.id.toString()} className="flex justify-center items-center w-full">
                    <NFTCard nft={nft} onClick={onSelect} view={view} />
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Desktop Display */}
          <div className="hidden md:block">
            <div className={`grid gap-${gap / 4} ${
              view === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" :
              view === "compact" ? "grid-cols-4 md:grid-cols-6 lg:grid-cols-8" : 
              "grid-cols-1"
            }`}>
              {loading && nfts.length === 0 ? (
                Array.from({ length: 12 }).map((_, idx) => (
                  <NFTSkeleton key={idx} view={view} />
                ))
              ) : (
                nfts.map((nft) => (
                  <NFTCard key={nft.id.toString()} nft={nft} onClick={onSelect} view={view} />
                ))
              )}
            </div>
>>>>>>> 17e96eb (first commit)
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


<<<<<<< HEAD
=======

>>>>>>> 17e96eb (first commit)
