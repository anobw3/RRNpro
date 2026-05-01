import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

const ACTIVITIES = [
  { user: "0x4f...a2", action: "minted", item: "Legendary Aceh" },
  { user: "0x72...1b", action: "minted", item: "Epic Bugis" },
  { user: "0x1a...9c", action: "minted", item: "Rare Java" },
  { user: "0x3d...f4", action: "minted", item: "Divine Papua" },
  { user: "0x8k...2e", action: "minted", item: "Mythic Bali" },
];

export default function LiveActivity() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[100] hidden md:block pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-4 bg-bg-card backdrop-blur-xl px-5 py-3 rounded-2xl border border-border-soft shadow-xl"
          >
            <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent-gold animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">{t("nav.live_activity")}</span>
              <p className="text-[10px] text-text-primary font-medium">
                <span className="text-accent-gold">{ACTIVITIES[index].user}</span> {t(`nav.${ACTIVITIES[index].action}`)} {ACTIVITIES[index].item}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
