import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { useHypeEngine } from "../services/MintVibeService";
import AnimatedCounter from "./AnimatedCounter";

export default function LiveMintedBadge() {
  const { currentSupply } = useHypeEngine();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-2xl backdrop-saturate-150 will-change-transform"
    >
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gold/10">
        <TrendingUp className="w-3.5 h-3.5 text-gold animate-pulse" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gold/60 leading-none mb-1">Live Minted</span>
        <span className="text-xs font-display font-bold text-text-primary tracking-widest flex items-baseline gap-1">
          <AnimatedCounter value={currentSupply} duration={2500} />
          <span className="text-[9px] opacity-30 font-sans tracking-normal">/ 8,888</span>
        </span>
      </div>
    </motion.div>
  );
}
