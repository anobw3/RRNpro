import { motion } from "motion/react";
import { RARITIES } from "../constants.ts";
<<<<<<< HEAD

export default function Rarity() {
=======
import { useTranslation } from "../context/LanguageContext";

export default function Rarity() {
  const { t } = useTranslation();
  
>>>>>>> 17e96eb (first commit)
  return (
    <div id="rarity" className="py-24 relative">
      <div className="w-full">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
<<<<<<< HEAD
            <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">Hierarchy of Power</span>
            <h2 className="font-display text-4xl md:text-6xl mb-8 tracking-tight">THE RARITY SYSTEM</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto opacity-50" />
=======
            <span className="text-accent-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">{t("rarity.badge") || "Hierarchy of Power"}</span>
            <h2 className="font-display text-4xl md:text-6xl mb-8 tracking-tight uppercase text-text-primary">{t("rarity.title") || "THE RARITY SYSTEM"}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto opacity-50" />
>>>>>>> 17e96eb (first commit)
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RARITIES.map((tier, idx) => (
            <motion.div
              key={tier.name}
<<<<<<< HEAD
              className={`group relative p-10 glass rounded-[2.5rem] overflow-hidden hover:border-luxury-gold/30 transition-all duration-700 shadow-xl`}
=======
              className={`group relative p-10 bg-bg-card backdrop-blur-xl border border-border-soft rounded-[2.5rem] overflow-hidden hover:border-accent-gold/30 transition-all duration-700 shadow-xl`}
>>>>>>> 17e96eb (first commit)
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
            >
              {/* Background Aura */}
<<<<<<< HEAD
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.aura ?? 'from-luxury-gold/5'} group-hover:scale-125 transition-transform duration-1000 opacity-20`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <span className={`text-4xl md:text-5xl font-display font-black tracking-tighter ${tier.color}`}>
                    {tier.name}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center ${tier.color} border border-white/5`}>
=======
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.aura ?? 'from-accent-gold/5'} group-hover:scale-125 transition-transform duration-1000 opacity-20`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <span className={`text-4xl md:text-5xl font-display font-black tracking-tighter ${tier.color} uppercase`}>
                    {t(`rarity.${tier.name.toLowerCase()}`) || tier.name}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl bg-bg-card backdrop-blur-xl border border-border-soft flex items-center justify-center ${tier.color}`}>
>>>>>>> 17e96eb (first commit)
                     <span className="text-2xl font-black">{idx + 1}</span>
                  </div>
                </div>

<<<<<<< HEAD
                <p className="text-white/70 font-light mb-10 leading-relaxed text-sm md:text-base">
                  {tier.desc}
                </p>

                <div className="flex items-center gap-4">
                  <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10`} />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Class {tier.name}</span>
=======
                <p className="text-text-secondary font-light mb-10 leading-relaxed text-sm md:text-base">
                  {t(`rarity.${tier.name.toLowerCase()}_desc`) || tier.desc}
                </p>

                <div className="flex items-center gap-4">
                  <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent to-border-soft`} />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase">{t("details.class") || "Class"} {t(`rarity.${tier.name.toLowerCase()}`) || tier.name}</span>
>>>>>>> 17e96eb (first commit)
                </div>
              </div>

              {/* Decorative Shine for Divine */}
              {tier.name === "Divine" && (
                <motion.div 
                   className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 pointer-events-none"
                   animate={{ left: ['-100%', '100%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
