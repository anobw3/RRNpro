import { RarityStyle, RarityType } from "../types";

export const RARITY_CONFIG: Record<RarityType, RarityStyle> = {
  Divine: {
    color: "text-white",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.6)]",
    gradient: "from-white/30 via-luxury-gold/20 to-transparent",
    border: "border-white/50",
    badge: "bg-white/20 text-white border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)]",
  },
  Mythic: {
    color: "text-purple-400",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.6)]",
    gradient: "from-purple-600/30 via-fuchsia-500/20 to-transparent",
    border: "border-purple-500/50",
    badge: "bg-purple-500/30 text-purple-200 border border-purple-500/40",
  },
  Legendary: {
    color: "text-luxury-gold",
    glow: "shadow-[0_0_30px_rgba(212,175,55,0.5)]",
    gradient: "from-luxury-gold/30 to-transparent",
    border: "border-luxury-gold/50",
    badge: "bg-luxury-gold/30 text-luxury-gold border border-luxury-gold/40",
  },
  Epic: {
    color: "text-luxury-purple",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.4)]",
    gradient: "from-luxury-purple/30 to-transparent",
    border: "border-luxury-purple/50",
    badge: "bg-luxury-purple/30 text-luxury-purple border border-luxury-purple/40",
  },
  Rare: {
    color: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    gradient: "from-blue-500/30 to-transparent",
    border: "border-blue-500/50",
    badge: "bg-blue-500/30 text-blue-200 border border-blue-500/40",
  },
  Common: {
    color: "text-white/40",
    glow: "shadow-none",
    gradient: "from-white/10 to-transparent",
    border: "border-white/10",
    badge: "bg-white/10 text-white/40 border border-white/20",
  },
};
