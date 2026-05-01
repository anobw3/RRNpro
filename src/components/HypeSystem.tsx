import { motion, AnimatePresence } from "motion/react";
import { Flame, Rocket, Star, TrendingUp } from "lucide-react";
import { useHypeEngine } from "../services/MintVibeService";
import AnimatedCounter from "./AnimatedCounter";

function CountUp({ end }: { end: number }) {
  return <AnimatedCounter value={end} duration={2500} />;
}

export default function HypeSystem() {
  const { milestones } = useHypeEngine();

  return (
    <div className="fixed top-24 right-10 z-[110] pointer-events-none flex flex-col items-end gap-4">
      <AnimatePresence>
        {milestones && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            className="relative flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-gold/20 px-6 py-3 rounded-full shadow-large overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 animate-shimmer-gold" />
            
            <div className="relative">
              {milestones.includes('🔥') ? (
                <Flame className="w-5 h-5 text-gold animate-bounce" />
              ) : milestones.includes('🚀') ? (
                <Rocket className="w-5 h-5 text-gold animate-pulse" />
              ) : (
                <Star className="w-5 h-5 text-gold animate-spin-slow" />
              )}
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold whitespace-nowrap drop-shadow-sm">
              {milestones}
            </span>

            <div className="absolute bottom-0 left-0 h-px bg-gold w-full animate-draw-line" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
