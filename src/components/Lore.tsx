import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "../context/LanguageContext";

export default function Lore() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0]);

  const highlightText = (text: string) => {
    const parts = text.split(/(Nusantara Eterna|Royal Raccoons)/gi);
    return parts.map((part, i) => {
      if (part.toLowerCase() === "nusantara eterna" || part.toLowerCase() === "royal raccoons") {
        return (
          <span 
            key={i} 
            className="gold-text font-bold"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const fadeInUp: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: "easeOut" 
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section 
      id="lore"
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center py-24 sm:py-32 px-4 overflow-hidden bg-bg-primary"
    >
      {/* Cinematic Parallax Background */}
      <motion.div 
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute inset-x-[-20%] top-[-20%] bottom-[-20%] z-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[150px] rounded-full" />
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      <motion.div 
        className="max-w-3xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-20">
          <span className="text-gold text-[10px] font-black uppercase tracking-[1em] block">
            {t("lore.badge") || "The Chronicles"}
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Section 1: Genesis */}
        <div className="space-y-12 mb-32 lg:mb-40">
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-display tracking-tighter text-text-primary uppercase font-medium"
          >
            {t("lore.genesis_title") || "Sacred Genesis"}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-8 text-text-secondary text-[12px] lg:text-[14px] uppercase tracking-[0.25em] font-light leading-[2] max-w-2xl mx-auto">
            <p>
              {highlightText(t("lore.genesis_p1"))}
            </p>
            <p className="text-gold opacity-80 font-medium italic">
              {t("lore.genesis_p2")}
            </p>
          </motion.div>
        </div>

        {/* Section 2: Sovereigns */}
        <div className="space-y-12 mb-32 lg:mb-40">
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-display tracking-tighter text-text-primary uppercase font-medium"
          >
            {t("lore.sovereigns_title") || "Imperial Lineage"}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-8 text-text-secondary text-[12px] lg:text-[14px] uppercase tracking-[0.25em] font-light leading-[2] max-w-2xl mx-auto">
            <p>
              {t("lore.sovereigns_p1")}
            </p>
            <p>
              {t("lore.sovereigns_p2")}
            </p>
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.98 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
            }
          }}
          className="relative py-24 sm:py-32 px-10 sm:px-20 mb-32 lg:mb-40 overflow-hidden rounded-[80px]"
        >
          <div className="absolute inset-0 bg-bg-card border border-gold/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 blur-[120px]" />
          
          <p className="italic text-text-primary font-display text-3xl lg:text-5xl relative z-10 leading-[1.2] tracking-tight uppercase font-light">
            {highlightText(t("lore.quote"))}
          </p>
        </motion.div>

        {/* Section 3: The Bond */}
        <div className="space-y-12 mb-32 lg:mb-40 text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-display tracking-tighter text-text-primary uppercase font-medium"
          >
            {t("lore.bond_title") || "The Eternal Bond"}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-8 text-text-secondary text-[12px] lg:text-[14px] uppercase tracking-[0.25em] font-light leading-[2] max-w-2xl mx-auto">
            <p>
              {t("lore.bond_p1")}
            </p>
            <p className="text-gold font-black tracking-[0.4em] text-[10px] uppercase underline underline-offset-8 decoration-gold/20">
              {t("lore.bond_p2")}
            </p>
            <p>
              {t("lore.bond_p3")}
            </p>
            <div className="pt-10 space-y-6">
              <p>
                {t("lore.bond_p4")}
              </p>
              <p className="text-text-primary font-medium">
                {t("lore.bond_p5")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={fadeInUp}
          className="pt-16 pb-24"
        >
          <motion.button 
             whileHover={{ y: -5 }}
             whileTap={{ scale: 0.98 }}
             className="btn-primary font-black uppercase tracking-[0.5em] text-[10px] px-20 py-6 !rounded-[24px]"
          >
            {t("lore.cta") || "Begin Journey"}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]) }}
        className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 opacity-[0.015] hidden xl:block select-none pointer-events-none"
      >
        <span className="text-[35rem] font-display font-black inline-block text-text-primary leading-none uppercase tracking-tighter">{t("lore.title") || "ARCHIVE"}</span>
      </motion.div>

      {/* Floating Dust Particles (Vibe) */}
      <div className="absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-screen bg-noise" />
    </section>
  );
}
