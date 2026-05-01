import { NFTMetadata } from "../../types";
import NFTCard from "./NFTCard";
import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { LayoutGrid, List as ListIcon, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NFTGridProps {
  nfts: NFTMetadata[];
  totalCount?: number;
  onSelect: (nft: NFTMetadata) => void;
  onLoadMore?: () => void;
  loading?: boolean;
  view?: ViewMode;
}

const NFTSkeleton = memo(({ view }: { view: ViewMode }) => {
  if (view === "list") {
    return (
      <div className="w-full h-24 bg-bg-card border border-border-soft rounded-2xl p-3 sm:px-4 grid grid-cols-[72px_1fr_auto] items-center gap-4 sm:gap-6 animate-pulse box-border">
        <div className="w-[72px] h-[72px] bg-border-soft rounded-xl shrink-0" />
        <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
          <div className="h-3 bg-border-soft rounded w-1/4" />
          <div className="h-4 bg-border-soft rounded w-1/2" />
        </div>
        <div className="flex items-center gap-4 sm:gap-8 shrink-0">
          <div className="flex flex-col items-end gap-1 min-w-[70px] sm:min-w-[90px]">
             <div className="h-2 bg-border-soft rounded w-10" />
             <div className="h-4 bg-border-soft rounded w-16" />
          </div>
          <div className="w-10 h-10 rounded-full bg-border-soft shrink-0 hidden sm:block" />
        </div>
      </div>
    );
  }

  if (view === "compact") {
    return (
      <div className="relative aspect-square w-full bg-bg-card border border-border-soft rounded-[24px] animate-pulse flex flex-col h-full overflow-hidden">
        <div className="aspect-square bg-border-soft w-full" />
        <div className="p-5 flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <div className="h-2 bg-border-soft rounded w-1/4" />
            <div className="h-4 bg-border-soft rounded w-3/4" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-soft/30">
            <div className="h-4 bg-border-soft rounded w-1/3" />
            <div className="w-8 h-8 rounded-full bg-border-soft" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-card border border-border-soft rounded-[32px] overflow-hidden animate-pulse flex flex-col h-full shadow-sm">
      <div className="aspect-square bg-border-soft w-full" />
      <div className="p-7 flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-border-soft rounded w-1/4" />
          <div className="h-6 bg-border-soft rounded w-3/4" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-soft/30">
          <div className="flex flex-col gap-1">
            <div className="h-2 bg-border-soft rounded w-10" />
            <div className="h-5 bg-border-soft rounded w-20" />
          </div>
          <div className="w-11 h-11 rounded-full bg-border-soft" />
        </div>
      </div>
    </div>
  );
});

NFTSkeleton.displayName = "NFTSkeleton";

type ViewMode = "grid" | "list" | "compact";

export default function NFTGrid({ nfts, totalCount, onSelect, onLoadMore, loading, view = "grid" }: NFTGridProps) {
  const [columnCount, setColumnCount] = useState(5);
  const [containerWidth, setContainerWidth] = useState(1200);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && onLoadMore && !loading && nfts.length < (totalCount || 0)) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "400px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore, loading, nfts.length, totalCount]);

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

  const gap = view === "compact" ? 12 : 24;

  const displayCount = totalCount !== undefined ? totalCount : nfts.length;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
           <div className={`w-2.5 h-2.5 rounded-full ${loading ? "bg-gold animate-pulse shadow-[0_0_10px_var(--accent-gold)]" : "bg-status-success shadow-[0_0_10px_rgba(16,185,129,0.5)]"}`} />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              {loading && nfts.length === 0 ? "Summoning spirits..." : `${displayCount} Assets Identified`}
           </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
           <span className="text-[9px] text-text-muted uppercase tracking-widest font-black">Scroll for more heritage</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
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
          </div>

          {/* Lazy Loading Sentinel */}
          <div ref={sentinelRef} className="h-20 w-full flex items-center justify-center">
            {loading && nfts.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Identifying more spirits...</span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}



