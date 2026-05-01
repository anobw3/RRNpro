<<<<<<< HEAD
import { motion } from "motion/react";
=======
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
>>>>>>> 17e96eb (first commit)
import { useTranslation } from "../context/LanguageContext";

export default function Lore() {
  const { t } = useTranslation();
<<<<<<< HEAD

  return (
    <div className="relative py-20 px-4">
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y: "-20%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-luxury-purple/10 blur-[150px] rounded-full"></div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.8em] mb-6 block text-glow uppercase">{t("lore.badge")}</span>
          <h2 className="text-[length:var(--font-size-fluid-h2)] font-display mb-12 md:mb-16 tracking-tighter leading-none uppercase">{t("lore.title_1")}<br/>{t("lore.title_2")}</h2>
          
          <div className="space-y-8 md:space-y-12 text-white/50 text-base md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-center font-sans tracking-wide">
            <p className="balance">
              {t("lore.p1")}
            </p>
            
            <div className="relative py-8 md:py-12 px-6 md:px-8 overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.02] border-y border-luxury-gold/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
              <p className="italic text-white/80 font-display text-xl md:text-3xl relative z-10 leading-snug">
                "{t("lore.quote")}"
              </p>
            </div>

            <p className="balance text-base md:text-xl">
              {t("lore.p2")}
            </p>
          </div>

          <motion.div 
            className="mt-12 md:mt-20 inline-block p-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="px-8 md:px-10 py-3 md:py-4 bg-luxury-black rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase hover:bg-luxury-gold hover:text-black transition-all cursor-pointer">
              {t("lore.btn_explore")}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background text */}
      <div className="absolute inset-inline-start-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] hidden lg:block select-none pointer-events-none">
        <span className="text-[20rem] font-display font-black ltr:rotate-90 rtl:-rotate-90 inline-block">HISTORY</span>
      </div>
      <div className="absolute inset-inline-end-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] hidden lg:block select-none pointer-events-none">
        <span className="text-[20rem] font-display font-black ltr:-rotate-90 rtl:rotate-90 inline-block">FUTURE</span>
      </div>
    </div>
=======
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
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl aspect-video bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-gold-soft),transparent_70%)]" />
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <motion.div 
        className="max-w-2xl mx-auto relative z-10 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-12">
          <span className="text-accent-gold text-[10px] sm:text-xs font-bold uppercase tracking-[1em] block drop-shadow-[0_0_10px_var(--accent-gold-soft)]">
            {t("lore.badge")}
          </span>
        </motion.div>

        {/* Section 1: Genesis */}
        <div className="space-y-8 mb-20 sm:mb-28">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-5xl font-display tracking-tight text-text-primary uppercase"
          >
            {t("lore.genesis_title")}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-6 text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans">
            <p>
              {highlightText(t("lore.genesis_p1"))}
            </p>
            <p className="text-text-muted italic">
              {t("lore.genesis_p2")}
            </p>
          </motion.div>
        </div>

        {/* Section 2: Sovereigns */}
        <div className="space-y-8 mb-20 sm:mb-28">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-5xl font-display tracking-tight text-text-primary uppercase"
          >
            {t("lore.sovereigns_title")}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-6 text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans">
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
            hidden: { opacity: 0, scale: 0.95 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              transition: { duration: 1.5, ease: "easeOut" } 
            }
          }}
          className="relative py-16 sm:py-24 px-8 sm:px-12 mb-20 sm:mb-28 overflow-hidden"
        >
          <div className="absolute inset-0 bg-text-primary/[0.02] backdrop-blur-sm border-y border-accent-gold/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-gold/5 blur-[100px]" />
          
          <p className="italic text-text-primary font-display text-2xl sm:text-4xl relative z-10 leading-snug drop-shadow-lg">
            {highlightText(t("lore.quote"))}
          </p>
        </motion.div>

        {/* Section 3: The Bond */}
        <div className="space-y-8 mb-20 sm:mb-28">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-5xl font-display tracking-tight text-text-primary uppercase"
          >
            {t("lore.bond_title")}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="space-y-6 text-text-secondary text-base sm:text-lg font-light leading-relaxed font-sans text-center">
            <p>
              {t("lore.bond_p1")}
            </p>
            <p className="text-accent-gold font-bold tracking-[0.2em] text-sm uppercase">
              {t("lore.bond_p2")}
            </p>
            <p>
              {t("lore.bond_p3")}
            </p>
            <div className="pt-8 space-y-4">
              <p>
                {t("lore.bond_p4")}
              </p>
              <p className="text-text-primary">
                {t("lore.bond_p5")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={fadeInUp}
          className="pt-12 sm:pt-16"
        >
          <div className="inline-block p-[0.5px] bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent rounded-full hover:via-accent-gold transition-all duration-700 group">
            <div className="px-12 sm:px-16 py-4 sm:py-5 bg-bg-primary rounded-full text-[10px] sm:text-xs font-bold tracking-[0.4em] text-accent-gold uppercase group-hover:bg-accent-gold group-hover:text-black transition-all cursor-pointer whitespace-nowrap shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              {t("lore.cta")}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]) }}
        className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 opacity-[0.02] hidden lg:block select-none pointer-events-none"
      >
        <span className="text-[25rem] font-display font-black inline-block text-text-primary">{t("lore.title")}</span>
      </motion.div>

      {/* Floating Dust Particles (Vibe) */}
      <div className="absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-screen bg-noise" />
    </section>
>>>>>>> 17e96eb (first commit)
  );
}
