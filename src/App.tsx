import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import InteractiveShimmer from "./components/InteractiveShimmer";
import CursorGlow from "./components/CursorGlow";
import BackgroundVibe from "./components/BackgroundVibe";
import AudioPlayer from "./components/AudioPlayer";
import LiveActivity from "./components/LiveActivity";
import HypeSystem from "./components/HypeSystem";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { WalletProvider } from "./context/WalletContext";
import { ThemeProvider } from "./context/ThemeContext";
import { HypeProvider } from "./services/MintVibeService";
import SectionLoader from "./components/ui/SectionLoader.tsx";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home.tsx"));
const Protocol = lazy(() => import("./pages/Protocol.tsx"));
const Manifesto = lazy(() => import("./pages/Manifesto.tsx"));
const Law = lazy(() => import("./pages/Law.tsx"));
const Governance = lazy(() => import("./pages/Governance.tsx"));
const Archive = lazy(() => import("./pages/Archive.tsx"));
const Lineage = lazy(() => import("./pages/Lineage.tsx"));
const Code = lazy(() => import("./pages/Code.tsx"));
const Kingdom = lazy(() => import("./pages/Kingdom.tsx"));
const Security = lazy(() => import("./pages/Security.tsx"));
const Transparency = lazy(() => import("./pages/Transparency.tsx"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <ThemeProvider>
      <WalletProvider>
        <HypeProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <ScrollToTop />
              <main className="relative bg-bg-primary text-text-primary min-h-screen selection:bg-accent-gold selection:text-black z-10">
                <InteractiveShimmer />
                <CursorGlow />
                <BackgroundVibe />
                <AudioPlayer />
                <LiveActivity />
                <HypeSystem />
                
                <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
                  <div className="flex flex-col items-center gap-12">
                    <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold to-transparent opacity-30"></div>
                    <span className="vertical-text text-[8px] font-black tracking-[1em] text-gold/40 uppercase">Archipelago Legacy Protocol</span>
                    <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold to-transparent opacity-30"></div>
                  </div>
                </aside>

                <Navbar />
                
                <Suspense fallback={<SectionLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/protocol" element={<Protocol />} />
                    <Route path="/manifesto" element={<Manifesto />} />
                    <Route path="/law" element={<Law />} />
                    <Route path="/governance" element={<Governance />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/lineage" element={<Lineage />} />
                    <Route path="/code" element={<Code />} />
                    <Route path="/kingdom" element={<Kingdom />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/transparency" element={<Transparency />} />
                  </Routes>
                </Suspense>

                <div className="fixed inset-0 border-0 md:border-12 border-white/[0.03] pointer-events-none z-[150] md:shadow-[inset_0_0_150px_rgba(0,0,0,0.4)] shadow-none"></div>
              </main>
            </BrowserRouter>
          </ErrorBoundary>
        </HypeProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}


