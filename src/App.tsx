import { useEffect, Suspense, lazy } from "react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Container from "./layout/Container.tsx";
import { motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import CursorGlow from "./components/CursorGlow.tsx";
import BackgroundVibe from "./components/BackgroundVibe.tsx";
import AudioPlayer from "./components/AudioPlayer.tsx";
import "lenis/dist/lenis.css";

import { WalletProvider } from "./context/WalletContext.tsx";

// Lazy Loaded Sections
const Lore = lazy(() => import("./components/Lore.tsx"));
const Collection = lazy(() => import("./components/Collection.tsx"));
const Rarity = lazy(() => import("./components/Rarity.tsx"));
const Roadmap = lazy(() => import("./components/Roadmap.tsx"));
const Marketplace = lazy(() => import("./components/Marketplace.tsx"));
const WhySection = lazy(() => import("./components/Why.tsx"));
const Footer = lazy(() => import("./components/Footer.tsx"));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
  </div>
);

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-luxury-gold z-[201] origin-left"
        style={{ scaleX }}
      />

      <CursorGlow />
      <BackgroundVibe />
      <AudioPlayer />
      
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
        <div className="flex flex-col items-center gap-12">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-luxury-gold to-transparent"></div>
          <span className="vertical-text text-[9px] tracking-[0.8em] text-luxury-gold/50 uppercase">Nusantara Eterna MMXXIV</span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-luxury-gold to-transparent"></div>
        </div>
      </aside>

      <div className="relative z-10 flex flex-col pt-20">
        <Navbar />
        
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <Container>
            <Lore />
          </Container>

          <section id="collection" className="py-20 md:py-32">
            <Container>
              <Collection />
            </Container>
          </section>

          <Container>
            <Rarity />
            <Roadmap />
            <Marketplace />
            <WhySection />
          </Container>
          
          <Footer />
        </Suspense>
      </div>

      <div className="fixed inset-0 border-4 md:border-8 border-luxury-frame pointer-events-none z-[150] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
    </main>
    </WalletProvider>
  );
}

