import { RarityStyle, RarityType } from "../types";

export const RARITY_CONFIG: Record<RarityType, RarityStyle> = {
  Divine: {
    color: "text-text-primary",
    glow: "shadow-text-primary/20",
    gradient: "from-text-primary/10 via-accent-gold/20 to-transparent",
    border: "border-text-primary/30",
    badge: "bg-text-primary/10 text-text-primary border border-text-primary/20 shadow-lg",
  },
  Mythic: {
    color: "text-red-500",
    glow: "shadow-red-500/20",
    gradient: "from-red-600/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30",
    badge: "bg-red-500/10 text-red-500 border border-red-500/20",
  },
  Legendary: {
    color: "text-accent-gold",
    glow: "shadow-accent-gold-soft/20",
    gradient: "from-accent-gold/20 to-transparent",
    border: "border-accent-gold/30",
    badge: "bg-accent-gold-soft/10 text-accent-gold border border-accent-gold/20",
  },
  Epic: {
    color: "text-purple-500",
    glow: "shadow-purple-500/10",
    gradient: "from-purple-500/20 to-transparent",
    border: "border-purple-500/30",
    badge: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  },
  Rare: {
    color: "text-blue-500",
    glow: "shadow-blue-500/10",
    gradient: "from-blue-500/20 to-transparent",
    border: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  },
  Common: {
    color: "text-text-muted",
    glow: "shadow-none",
    gradient: "from-text-muted/5 to-transparent",
    border: "border-border-soft",
    badge: "bg-bg-card text-text-muted border border-border-soft",
  },
};
