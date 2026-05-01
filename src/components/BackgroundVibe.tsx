import { motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";

export default function BackgroundVibe() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particlePositions = useMemo(() => {
    const count = isMobile ? 8 : 20;
    return [...Array(count)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      opacity: Math.random() * 0.3,
      duration: 3 + Math.random() * 5,
      yMove: (Math.random() - 0.5) * 60 + "px"
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Static Grain Texture Effect for that premium "paper/film" look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Primary Ambient Glow */}
      <motion.div 
        animate={{
          scale: isMobile ? 1 : [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: isMobile ? 0 : [0, 50, 0],
          y: isMobile ? 0 : [-20, 20, -20]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[5%] w-[70%] h-[70%] rounded-full bg-gold/15 blur-[120px]"
      />

      {!isMobile && (
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.05, 0.02],
            x: [0, -40, 0],
            y: [50, 0, 50]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[15%] -right-[5%] w-[60%] h-[60%] rounded-full bg-gold/10 blur-[150px]"
        />
      )}

      {/* Floating Sparkles (very few, very subtle) */}
      {particlePositions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: pos.x, 
            y: pos.y, 
            opacity: pos.opacity
          }}
          animate={{
            y: [null, pos.yMove],
            opacity: [pos.opacity, pos.opacity + 0.15, pos.opacity],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[1.5px] h-[1.5px] bg-gold/30 rounded-full"
        />
      ))}

      {/* Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/20 via-transparent to-bg-primary/20" />
    </div>
  );
}
