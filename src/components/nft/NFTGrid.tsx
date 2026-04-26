import { NFTMetadata } from "../../types";
import NFTCard from "./NFTCard";
import * as ReactWindow from "react-window";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { LayoutGrid, List as ListIcon, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
    </div>
  );
});

RowComponent.displayName = "RowComponent";

export default function NFTGrid({ nfts, onSelect }: NFTGridProps) {
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

  const rowCount = Math.ceil(nfts.length / columnCount);

  const rowData = useMemo(() => ({
    nfts,
    columnCount,
    itemWidth,
    gap,
    onSelect,
    view
  }), [nfts, columnCount, itemWidth, gap, onSelect, view]);

  const viewModes: { id: ViewMode; icon: any; label: string }[] = [
    { id: "grid", icon: LayoutGrid, label: "Grid" },
    { id: "list", icon: ListIcon, label: "List" },
    { id: "compact", icon: Grid3X3, label: "Compact" },
  ];

  return (
    <div className="w-full">
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
      </div>

      <AnimatePresence mode="wait">
        <motion.div
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


