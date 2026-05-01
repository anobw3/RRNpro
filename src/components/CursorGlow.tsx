import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
<<<<<<< HEAD

  useEffect(() => {
=======
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
>>>>>>> 17e96eb (first commit)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

<<<<<<< HEAD
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

=======
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isDesktop) return null;

>>>>>>> 17e96eb (first commit)
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mousePos.x, springConfig);
  const springY = useSpring(mousePos.y, springConfig);

  return (
    <>
      {/* Primary Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] opacity-20 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
<<<<<<< HEAD
          background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)",
=======
          background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)",
>>>>>>> 17e96eb (first commit)
        }}
      />
      
      {/* Secondary Dot */}
      <motion.div
<<<<<<< HEAD
        className="fixed top-0 left-0 w-3 h-3 bg-luxury-gold rounded-full pointer-events-none z-[999] mix-blend-difference hidden md:block"
=======
        className="fixed top-0 left-0 w-3 h-3 bg-accent-gold rounded-full pointer-events-none z-[999] mix-blend-difference hidden md:block"
>>>>>>> 17e96eb (first commit)
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
