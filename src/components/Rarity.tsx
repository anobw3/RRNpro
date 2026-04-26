import { motion } from "motion/react";
import { RARITIES } from "../constants.ts";

export default function Rarity() {
  return (
    <div id="rarity" className="py-24 relative">
      <div className="w-full">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">Hierarchy of Power</span>
            <h2 className="font-display text-4xl md:text-6xl mb-8 tracking-tight">THE RARITY SYSTEM</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto opacity-50" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RARITIES.map((tier, idx) => (
            <motion.div
              key={tier.name}
              className={`group relative p-10 glass rounded-[2.5rem] overflow-hidden hover:border-luxury-gold/30 transition-all duration-700 shadow-xl`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
            >
              {/* Background Aura */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.aura ?? 'from-luxury-gold/5'} group-hover:scale-125 transition-transform duration-1000 opacity-20`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <span className={`text-4xl md:text-5xl font-display font-black tracking-tighter ${tier.color}`}>
                    {tier.name}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center ${tier.color} border border-white/5`}>
                     <span className="text-2xl font-black">{idx + 1}</span>
                  </div>
                </div>

                <p className="text-white/70 font-light mb-10 leading-relaxed text-sm md:text-base">
                  {tier.desc}
                </p>

                <div className="flex items-center gap-4">
                  <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10`} />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Class {tier.name}</span>
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
