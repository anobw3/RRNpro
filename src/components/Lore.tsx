import { motion } from "motion/react";
import { useTranslation } from "../context/LanguageContext";

export default function Lore() {
  const { t } = useTranslation();

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
  );
}
