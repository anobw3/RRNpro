import { useState, useEffect, useRef, memo } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TRACKS = [
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiexkbmoquz4yyupt3oekfa4qxt6e67vtovk5x4tnvjas5y44oe5l4?filename=gamelan1.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreicsujzugnf3yfden3fmbtodlbuc4madx6n6r4qnyv77hsua74cyyq?filename=gamelan2.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeig4637yqy4bb6qmixtkjl5z46h2r5bqhncua5alwu6cmxygustima?filename=gamelan3.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeihmepqewvaeucpvupd2infd4iyd33zq4tmwkk5qhrbzkaoou7ukh4?filename=gamelan4.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeigi6divjy5q7zk5v4q3folaiu6xvq3oey7vga7n2mioltjthwuk6y?filename=gamelan5.mp3"
];

const AudioPlayer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Select 1 random track
  const [currentTrackIndex] = useState(() => Math.floor(Math.random() * TRACKS.length));
  const fallbackIndexRef = useRef(currentTrackIndex);

  useEffect(() => {
    // Auto collapse after expansion
    if (isExpanded) {
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 3000);
    }
    return () => {
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
    };
  }, [isExpanded]);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none";
    audio.src = TRACKS[fallbackIndexRef.current];
    
    audio.onerror = () => {
      console.warn("[Audio] Load error, trying next...");
      fallbackIndexRef.current = (fallbackIndexRef.current + 1) % TRACKS.length;
      if (fallbackIndexRef.current === currentTrackIndex) {
        setLoadError(true);
      } else {
        audio.src = TRACKS[fallbackIndexRef.current];
      }
    };

    audioRef.current = audio;

    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && !loadError) {
        setHasInteracted(true);
        // Play only if user clicks elsewhere, or we wait for button click
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true, capture: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true, capture: true });

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    const targetVolume = isPlaying ? 0.2 : 0;
    const step = 0.02;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (isPlaying) {
      playPromiseRef.current = audioRef.current.play();
      playPromiseRef.current.catch(() => {});
    }

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) return;
      
      const currentVol = audioRef.current.volume;
      if (Math.abs(currentVol - targetVolume) < step) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (!isPlaying && audioRef.current.volume === 0) {
          audioRef.current.pause();
        }
      } else {
        audioRef.current.volume = Math.max(0, Math.min(0.2, currentVol + (isPlaying ? step : -step)));
      }
    }, 100);

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying, hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100]">
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          if (!hasInteracted) setHasInteracted(true);
          setIsPlaying(!isPlaying);
          setIsExpanded(true);
        }}
        disabled={loadError}
        layout
        className={`group relative flex items-center justify-center overflow-hidden backdrop-blur-2xl border transition-all duration-500 rounded-full ${
          loadError ? "opacity-30 cursor-not-allowed border-status-error/20 w-11 h-11" :
          isPlaying 
            ? "border-gold/40 bg-bg-card shadow-[0_0_15px_rgba(212,175,55,0.2)]" 
            : "border-border-soft bg-bg-primary/50 opacity-60 hover:opacity-100"
        } ${isExpanded ? "px-6 py-3 w-auto" : "w-11 h-11"}`}
        whileHover={loadError ? {} : { scale: 1.05 }}
        whileTap={loadError ? {} : { scale: 0.95 }}
      >
        {isPlaying && !loadError && (
          <div className="absolute inset-0 bg-gold/5 blur-xl animate-pulse-slow" />
        )}

        <div className="relative flex items-center gap-3">
          <div className="flex-shrink-0">
            {loadError ? (
              <VolumeX className="w-4 h-4 text-status-error" />
            ) : isPlaying ? (
              <Volume2 className="w-4 h-4 text-gold" />
            ) : (
              <VolumeX className="w-4 h-4 text-text-muted transition-colors group-hover:text-text-primary" />
            )}
          </div>

          <AnimatePresence mode="wait">
            {isExpanded && !loadError && (
              <motion.span 
                initial={{ opacity: 0, width: 0, x: -10 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -10 }}
                className={`text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap ${
                  isPlaying ? "text-gold" : "text-text-muted transition-colors"
                }`}
              >
                {isPlaying ? "Music ON" : "Music OFF"}
              </motion.span>
            )}
            {isExpanded && loadError && (
               <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-status-error whitespace-nowrap"
              >
                Signal Lost
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {isPlaying && !loadError && isExpanded && (
          <div className="flex gap-1 h-2 items-center ml-4">
            {[0.8, 1.2, 0.6].map((speed, i) => (
              <motion.div 
                key={i}
                animate={{ scaleY: [0.3, 1, 0.5, 1, 0.3] }} 
                transition={{ repeat: Infinity, duration: speed, ease: "easeInOut" }}
                className="w-[1px] h-full bg-gold/60 origin-center" 
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
});

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
