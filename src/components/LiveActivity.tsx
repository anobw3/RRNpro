import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import { useHypeEngine, HypeEventType } from "../services/MintVibeService";

const getRarityStyles = (rarity: string) => {
  switch (rarity) {
    case 'Divine': return 'text-white drop-shadow-[0_0_8px_white]';
    case 'Legendary': return 'text-gold drop-shadow-[0_0_8px_var(--gold)]';
    case 'Epic': return 'text-purple-400';
    case 'Rare': return 'text-blue-400';
    default: return 'text-text-primary';
  }
};

export default function LiveActivity() {
  const { events } = useHypeEngine();
  const { t } = useTranslation();

  const displayEvents = events.slice(0, 3);

  return (
    <div className="fixed bottom-10 left-10 z-[100] hidden lg:flex flex-col gap-3 pointer-events-none w-80">
      <AnimatePresence mode="popLayout">
        {displayEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1 - (idx * 0.2), 
              x: 0, 
              filter: "blur(0px)",
              scale: 1 - (idx * 0.05),
              y: idx * 10
            }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)", transition: { duration: 0.3 } }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8
            }}
            className={`flex items-center gap-4 bg-bg-card/80 backdrop-blur-md border border-border-soft px-5 py-3.5 rounded-[22px] shadow-2xl overflow-hidden relative hide-scrollbar will-change-transform`}
          >
            <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
            <div className="w-9 h-9 rounded-xl bg-bg-primary border border-gold/10 flex items-center justify-center relative z-10">
              {event.type === HypeEventType.RARITY_DROP ? (
                <Activity className="w-4 h-4 text-gold animate-pulse" />
              ) : (
                <Zap className="w-4 h-4 text-gold" />
              )}
            </div>
            <div className="flex flex-col gap-0.5 relative z-10 flex-1 min-w-0">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-text-muted">
                {event.type === HypeEventType.RARITY_DROP ? "Rare Protocol" : "Archive Link"}
              </span>
              <p className="text-[10px] text-text-primary font-bold uppercase tracking-widest leading-tight truncate">
                <span className="text-gold">{event.user}</span> 
                <span className="mx-1 opacity-50 lowercase italic">minted</span> 
                <span className={getRarityStyles(event.rarity || 'Common')}>{event.item}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 px-4 py-2 mt-2"
      >
        <div className="w-1 h-1 rounded-full bg-status-success animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40">Protocol Streaming</span>
      </motion.div>
    </div>
  );
}
