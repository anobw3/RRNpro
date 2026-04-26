import { useEffect } from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Lore from "./components/Lore.tsx";
import Collection from "./components/Collection.tsx";
import Rarity from "./components/Rarity.tsx";
import Roadmap from "./components/Roadmap.tsx";
import Marketplace from "./components/Marketplace.tsx";
import WhySection from "./components/Why.tsx";
import Footer from "./components/Footer.tsx";
import { motion, useScroll, useSpring } from "motion/react";
import { NFT_IMAGES } from "./assets/images";
import Lenis from "lenis";
import CursorGlow from "./components/CursorGlow.tsx";
import BackgroundVibe from "./components/BackgroundVibe.tsx";
import "lenis/dist/lenis.css";

import { WalletProvider } from "./context/WalletContext.tsx";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <WalletProvider>
      <main className="relative bg-luxury-black min-h-screen selection:bg-luxury-gold selection:text-luxury-black">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-luxury-gold z-[201] origin-left"
        style={{ scaleX }}
      />

      <CursorGlow />
      <BackgroundVibe />
      
      {/* Sidebar Accent */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
        <div className="flex flex-col items-center gap-12">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-luxury-gold to-transparent"></div>
          <span className="vertical-text text-[9px] tracking-[0.8em] text-luxury-gold/50 uppercase">Nusantara Eterna MMXXIV</span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-luxury-gold to-transparent"></div>
        </div>
      </aside>

      <div className="relative z-10 flex flex-col">
        <Navbar />
        <Hero />
        <Lore />
        <Collection />
        <Rarity />
        <Roadmap />
        <Marketplace />
        <WhySection />
        <Footer />
      </div>

      {/* Frame Border - Optional for extreme luxury feel, but can be intrusive on mobile */}
      <div className="fixed inset-0 border-4 md:border-8 border-luxury-frame pointer-events-none z-[150] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
    </main>
    </WalletProvider>
  );
}
