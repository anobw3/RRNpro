<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
import { useState, useEffect, useRef, memo } from "react";
>>>>>>> 17e96eb (first commit)
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TRACKS = [
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiexkbmoquz4yyupt3oekfa4qxt6e67vtovk5x4tnvjas5y44oe5l4?filename=gamelan1.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreicsujzugnf3yfden3fmbtodlbuc4madx6n6r4qnyv77hsua74cyyq?filename=gamelan2.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeig4637yqy4bb6qmixtkjl5z46h2r5bqhncua5alwu6cmxygustima?filename=gamelan3.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeihmepqewvaeucpvupd2infd4iyd33zq4tmwkk5qhrbzkaoou7ukh4?filename=gamelan4.mp3",
  "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeigi6divjy5q7zk5v4q3folaiu6xvq3oey7vga7n2mioltjthwuk6y?filename=gamelan5.mp3"
];

<<<<<<< HEAD
export default function AudioPlayer() {
=======
const AudioPlayer = memo(() => {
>>>>>>> 17e96eb (first commit)
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

<<<<<<< HEAD
  // Select 1 random track on initial load
=======
  // Select 1 random track
>>>>>>> 17e96eb (first commit)
  const [currentTrackIndex] = useState(() => Math.floor(Math.random() * TRACKS.length));
  const fallbackIndexRef = useRef(currentTrackIndex);

  useEffect(() => {
<<<<<<< HEAD
    // Initial Audio Setup
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0; // Initialize at 0 for fade-in
=======
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
>>>>>>> 17e96eb (first commit)
    audio.preload = "none";
    audio.src = TRACKS[fallbackIndexRef.current];
    
    audio.onerror = () => {
<<<<<<< HEAD
      console.warn("Audio load error, attempting next track...");
      fallbackIndexRef.current = (fallbackIndexRef.current + 1) % TRACKS.length;
      if (fallbackIndexRef.current === currentTrackIndex) {
        console.error("All gamelan tracks failed to load.");
        setLoadError(true);
      } else {
        audio.src = TRACKS[fallbackIndexRef.current];
        if (isPlaying) {
          audio.play().catch(() => {});
        }
=======
      console.warn("[Audio] Load error, trying next...");
      fallbackIndexRef.current = (fallbackIndexRef.current + 1) % TRACKS.length;
      if (fallbackIndexRef.current === currentTrackIndex) {
        setLoadError(true);
      } else {
        audio.src = TRACKS[fallbackIndexRef.current];
>>>>>>> 17e96eb (first commit)
      }
    };

    audioRef.current = audio;

    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && !loadError) {
        setHasInteracted(true);
<<<<<<< HEAD
        playPromiseRef.current = audioRef.current.play();
        playPromiseRef.current
          .then(() => setIsPlaying(true))
          .catch((err) => {
            if (err.name !== "NotAllowedError" && err.name !== "AbortError") {
              console.error("Autoplay failed:", err);
            }
          });
        
        window.removeEventListener("click", handleFirstInteraction, true);
        window.removeEventListener("touchstart", handleFirstInteraction, true);
      }
    };

    window.addEventListener("click", handleFirstInteraction, true);
    window.addEventListener("touchstart", handleFirstInteraction, true);
=======
        // Play only if user clicks elsewhere, or we wait for button click
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true, capture: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true, capture: true });
>>>>>>> 17e96eb (first commit)

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
<<<<<<< HEAD
      window.removeEventListener("click", handleFirstInteraction, true);
      window.removeEventListener("touchstart", handleFirstInteraction, true);
    };
  }, []);

  // Handle Fade In / Out Logic
=======
    };
  }, []);

>>>>>>> 17e96eb (first commit)
  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    const targetVolume = isPlaying ? 0.2 : 0;
<<<<<<< HEAD
    const step = 0.01;
=======
    const step = 0.02;
>>>>>>> 17e96eb (first commit)

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (isPlaying) {
      playPromiseRef.current = audioRef.current.play();
<<<<<<< HEAD
      playPromiseRef.current.catch(err => {
        if (err.name !== "NotAllowedError" && err.name !== "AbortError") {
          console.error("Playback error:", err);
        }
      });
=======
      playPromiseRef.current.catch(() => {});
>>>>>>> 17e96eb (first commit)
    }

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) return;
      
      const currentVol = audioRef.current.volume;
<<<<<<< HEAD
      
=======
>>>>>>> 17e96eb (first commit)
      if (Math.abs(currentVol - targetVolume) < step) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
<<<<<<< HEAD
        
        if (!isPlaying && audioRef.current.volume === 0) {
          if (playPromiseRef.current) {
            playPromiseRef.current.then(() => audioRef.current?.pause()).catch(() => audioRef.current?.pause());
          } else {
            audioRef.current.pause();
          }
        }
      } else {
        const nextVol = currentVol + (isPlaying ? step : -step);
        audioRef.current.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, 50);
=======
        if (!isPlaying && audioRef.current.volume === 0) {
          audioRef.current.pause();
        }
      } else {
        audioRef.current.volume = Math.max(0, Math.min(0.2, currentVol + (isPlaying ? step : -step)));
      }
    }, 100);
>>>>>>> 17e96eb (first commit)

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying, hasInteracted]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          if (!hasInteracted) setHasInteracted(true);
          setIsPlaying(!isPlaying);
<<<<<<< HEAD
=======
          console.log(`[Audio] ${!isPlaying ? 'Started' : 'Stopped'} playback`);
>>>>>>> 17e96eb (first commit)
        }}
        disabled={loadError}
        className={`group relative flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-xl border transition-all duration-700 ${
          loadError ? "opacity-30 cursor-not-allowed border-red-500/20" :
          isPlaying 
<<<<<<< HEAD
            ? "border-luxury-gold/40 bg-luxury-gold/5 shadow-[0_0_30px_rgba(234,179,8,0.25)]" 
            : "border-white/10 bg-white/5 grayscale"
=======
            ? "border-accent-gold/40 bg-accent-gold-soft shadow-lg shadow-accent-gold/10" 
            : "border-border-soft bg-bg-card grayscale"
>>>>>>> 17e96eb (first commit)
        }`}
        whileHover={loadError ? {} : { scale: 1.05 }}
        whileTap={loadError ? {} : { scale: 0.95 }}
      >
        {isPlaying && !loadError && (
<<<<<<< HEAD
          <span className="absolute inset-0 rounded-full animate-pulse bg-luxury-gold/5" />
=======
          <span className="absolute inset-0 rounded-full animate-pulse bg-accent-gold/5" />
>>>>>>> 17e96eb (first commit)
        )}

        <div className="relative">
          {loadError ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : isPlaying ? (
<<<<<<< HEAD
            <Volume2 className="w-4 h-4 text-luxury-gold" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/40" />
=======
            <Volume2 className="w-4 h-4 text-accent-gold" />
          ) : (
            <VolumeX className="w-4 h-4 text-text-muted" />
>>>>>>> 17e96eb (first commit)
          )}
        </div>

        <span className={`text-[10px] font-display font-medium uppercase tracking-[0.2em] transition-colors ${
          loadError ? "text-red-400" :
<<<<<<< HEAD
          isPlaying ? "text-luxury-gold" : "text-white/40"
        }`}>
          {loadError ? "Error" : isPlaying ? "🔊 Gamelan ON" : "🔇 Gamelan OFF"}
=======
          isPlaying ? "text-accent-gold" : "text-text-muted"
        }`}>
          {loadError ? "Error" : isPlaying ? "Gamelan ON" : "Gamelan OFF"}
>>>>>>> 17e96eb (first commit)
        </span>

        {isPlaying && !loadError && (
          <div className="flex gap-1 h-3 items-end">
            {[0.8, 1.2, 0.6].map((speed, i) => (
              <motion.div 
                key={i}
                animate={{ height: [4, 12, 6, 10, 4] }} 
                transition={{ repeat: Infinity, duration: speed, ease: "easeInOut" }}
<<<<<<< HEAD
                className="w-[1px] bg-luxury-gold" 
=======
                className="w-[1px] bg-accent-gold" 
>>>>>>> 17e96eb (first commit)
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
<<<<<<< HEAD
}
=======
});

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
>>>>>>> 17e96eb (first commit)
