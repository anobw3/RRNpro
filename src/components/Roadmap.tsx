import { motion } from "motion/react";
import { ROADMAP } from "../constants.ts";

export default function Roadmap() {
  return (
    <div id="roadmap" className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="w-full">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="font-display text-5xl md:text-7xl mb-4 tracking-tight">THE STRATEGIC<br/>TRAJECTORY</h2>
            <div className="flex items-center gap-6">
               <div className="h-1 w-24 bg-luxury-gold rounded-full" />
               <p className="text-white/40 tracking-[0.4em] text-[10px] uppercase font-bold">2026 — ∞ ARCHIPELAGO ERA</p>
            </div>
          </div>
          <div className="max-w-xs text-center md:text-right hidden sm:block">
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Mapped execution plan for the expansion of Nusantara Eterna across the digital landscape.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-[10%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden xl:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
            {ROADMAP.map((step, idx) => (
              <motion.div
                key={step.phase}
                className="group p-10 glass rounded-[2.5rem] relative hover:border-luxury-gold/30 transition-all duration-500 shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
              >
                <div className="absolute -top-12 -right-8 text-9xl font-display font-black text-white/[0.03] select-none pointer-events-none group-hover:text-luxury-gold/5 transition-colors duration-700">
                  {step.phase}
                </div>

                <div className="mb-10 relative">
                  <div className={`w-10 h-10 rounded-xl mb-6 flex items-center justify-center text-[10px] font-black border ${idx === 0 ? 'bg-luxury-gold text-black border-luxury-gold' : 'glass text-white/40 border-white/5 font-mono'}`}>
                     {step.phase}
                  </div>
                  <span className="text-luxury-gold text-[10px] font-mono tracking-widest mb-2 block">{step.date}</span>
                  <h3 className="font-display text-2xl group-hover:text-luxury-gold transition-colors duration-300">{step.title}</h3>
                </div>

                <ul className="space-y-5">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shadow-[0_0_10px_#D4AF37] flex-shrink-0" />
                      <span className="text-sm text-white/70 font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <motion.div 
                  className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`} />
                    <span className={`text-[9px] uppercase font-bold tracking-[0.2em] ${idx === 0 ? 'text-green-500' : 'text-white/40'}`}>
                      {idx === 0 ? 'Active' : 'Queued'}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
