import { motion } from "motion/react";
<<<<<<< HEAD

export default function BackgroundVibe() {
=======
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

>>>>>>> 17e96eb (first commit)
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Gradients */}
      <motion.div 
        animate={{
<<<<<<< HEAD
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-luxury-gold blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-luxury-purple blur-[150px]"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%", 
            opacity: Math.random() * 0.3
          }}
          animate={{
            y: [null, (Math.random() - 0.5) * 100 + "px"],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-luxury-gold rounded-full"
=======
          scale: isMobile ? 1 : [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-accent-gold-soft blur-[120px]"
      />
      {!isMobile && (
        <motion.div 
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent-gold-soft/40 blur-[150px]"
        />
      )}

      {/* Floating Particles */}
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
            opacity: [pos.opacity, pos.opacity + 0.1, pos.opacity],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[1px] h-[1px] bg-accent-gold/40 rounded-full"
>>>>>>> 17e96eb (first commit)
        />
      ))}

      {/* Grid Pattern with Fade */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
<<<<<<< HEAD
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black" />
=======
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
>>>>>>> 17e96eb (first commit)
    </div>
  );
}
