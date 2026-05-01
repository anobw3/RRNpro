import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isDesktop) return null;

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mousePos.x, springConfig);
  const springY = useSpring(mousePos.y, springConfig);

  return (
    <>
      {/* Primary Atmospheric Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[1] opacity-[0.07] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
        }}
      />
      
      {/* Subtle Halo */}
      <motion.div
        className="fixed top-0 left-0 w-[40px] h-[40px] rounded-full border border-gold/10 pointer-events-none z-[999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
