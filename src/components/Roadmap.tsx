import { motion } from "motion/react";
import { ROADMAP } from "../constants.ts";

export default function Roadmap() {
  return (
<<<<<<< HEAD
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
=======
    <div id="roadmap" className="py-24 relative overflow-hidden border-t border-border-soft">
      <div className="w-full">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-8xl mb-6 tracking-tighter leading-none text-text-primary">
              STRATEGIC<br/>
              <span className="text-accent-gold italic">EXPANSION</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="h-[1px] w-24 bg-gradient-to-r from-accent-gold to-transparent" />
               <p className="text-text-muted tracking-[0.4em] text-[10px] uppercase font-bold">EST. 2027 — ARCHIPELAGO ERA</p>
            </div>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              Our vision for a cross-chain heritage ecosystem begins in the first light of 2027.
>>>>>>> 17e96eb (first commit)
            </p>
          </div>
        </div>

        <div className="relative">
<<<<<<< HEAD
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
=======
          {/* Vertical Timeline Line (Mobile/Tablet) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-text-primary/10 via-accent-gold/40 to-transparent hidden lg:block -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24 relative z-10">
            {ROADMAP.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = step.status === "active";
              
              return (
                <div key={step.phase} className="relative flex flex-col lg:flex-row items-center justify-between w-full">
                  {/* Phase Marker on Line */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, type: "spring", stiffness: 200 }}
                    className={`absolute left-6 lg:left-1/2 w-12 h-12 rounded-full border-2 transform -translate-x-1/2 z-20 flex items-center justify-center backdrop-blur-xl transition-colors duration-500 hidden lg:flex ${
                      isActive ? "bg-accent-gold border-accent-gold shadow-[0_0_20px_var(--accent-gold-soft)]" : "bg-bg-secondary border-border-soft"
                    }`}
                  >
                    <span className={`text-xs font-black ${isActive ? "text-black" : "text-text-muted"}`}>{step.phase}</span>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-[45%] flex ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                    <motion.div
                      className={`group w-full max-w-xl p-8 lg:p-12 bg-bg-card backdrop-blur-xl rounded-3xl border relative transition-all duration-500 shadow-2xl overflow-hidden hover:shadow-accent-gold/10 ${
                        isActive ? "border-accent-gold/20" : "border-border-soft"
                      }`}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Status indicator */}
                      <div className="absolute top-8 right-8 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent-gold animate-pulse' : 'bg-text-primary/10'}`} />
                        <span className={`text-[8px] uppercase tracking-widest font-black ${isActive ? 'text-accent-gold' : 'text-text-muted'}`}>
                           {isActive ? 'Current Focus' : 'Scheduled'}
                        </span>
                      </div>

                      <div className="mb-8">
                        <span className="text-accent-gold text-xs font-mono tracking-[.3em] mb-3 block uppercase">{step.date}</span>
                        <h3 className="font-display text-2xl lg:text-3xl leading-tight group-hover:text-accent-gold transition-colors duration-300 text-text-primary">
                          {step.title}
                        </h3>
                      </div>

                      <ul className="space-y-4">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <motion.div 
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 0.5 + (i * 0.1) }}
                              className="w-1 h-1 rounded-full bg-accent-gold mt-2 flex-shrink-0" 
                            />
                            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300 font-light lowercase tracking-tight">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Decorative large number */}
                      <div className="absolute -bottom-6 -right-6 text-8xl font-display font-black text-text-primary/[0.02] select-none pointer-events-none group-hover:text-accent-gold/5 transition-all duration-700">
                        {step.phase}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacing for layout alignment */}
                  <div className="hidden lg:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1024px) {
          .roadmap-item:nth-child(even) { flex-direction: row-reverse; }
        }
      `}} />
>>>>>>> 17e96eb (first commit)
    </div>
  );
}
