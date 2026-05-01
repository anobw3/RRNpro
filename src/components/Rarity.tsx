import { motion } from "motion/react";
import { RARITIES } from "../constants.ts";
import { useTranslation } from "../context/LanguageContext";

export default function Rarity() {
  const { t } = useTranslation();
  
  return (
    <div id="rarity" className="py-32 relative">
      <div className="w-full">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">The Hierarchy</span>
            <h2 className="font-display text-5xl md:text-8xl mb-10 tracking-tight uppercase text-text-primary font-medium">Sacred Tiers</h2>
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-30" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {RARITIES.map((tier, idx) => (
            <motion.div
              key={tier.name}
              className={`group relative p-12 bg-bg-card border border-border-soft rounded-[40px] overflow-hidden hover:border-gold/30 transition-all duration-1000 shadow-3xl`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.aura ?? 'from-gold/5'} group-hover:scale-125 transition-transform duration-[2000ms] opacity-20`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-text-muted font-bold tracking-[0.3em] uppercase">Archive Tier</span>
                      <span className={`text-4xl lg:text-5xl font-display font-medium tracking-tighter text-text-primary uppercase`}>
                        {tier.name}
                      </span>
                   </div>
                   <div className="w-16 h-16 rounded-[22px] bg-bg-primary border border-border-soft flex items-center justify-center text-gold shadow-inner shadow-black/20">
                      <span className="text-2xl font-black italic">{idx + 1}</span>
                   </div>
                </div>

                <p className="text-text-secondary font-light mb-12 leading-relaxed text-sm lg:text-base uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                  {t(`rarity.${tier.name.toLowerCase()}_desc`) || tier.desc}
                </p>

                <div className="flex items-center gap-6">
                  <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-border-soft to-transparent opacity-50`} />
                  <span className="text-[9px] font-black tracking-[0.4em] text-gold uppercase underline underline-offset-8 decoration-gold/20">Examine Specs</span>
                </div>
              </div>

              {/* Decorative Divine Shine */}
              {tier.name === "Divine" && (
                <motion.div 
                   className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-gold/10 to-transparent rotate-45 pointer-events-none"
                   animate={{ left: ['-100%', '100%'] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
