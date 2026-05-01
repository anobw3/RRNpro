import { motion } from "motion/react";
import { ROADMAP } from "../constants.ts";

export default function Roadmap() {
  return (
    <div id="roadmap" className="py-32 relative overflow-hidden">
      <div className="w-full">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-6xl md:text-[100px] mb-8 tracking-tighter leading-none text-text-primary uppercase font-medium">
              Lineage<br/>
              <span className="text-gold italic">Ascension</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="h-px w-24 bg-gradient-to-r from-gold to-transparent" />
               <p className="text-text-muted tracking-[0.4em] text-[10px] uppercase font-black">EST. 2027 — ARCHIPELAGO ERA</p>
            </div>
          </div>
          <div className="max-w-sm text-left md:text-right">
            <p className="text-text-secondary text-[12px] uppercase tracking-[0.2em] font-light leading-relaxed">
              Our vision for a cross-chain heritage ecosystem begins in the first light of 2027.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block -translate-x-1/2" />
          
          <div className="space-y-24 lg:space-y-32 relative z-10">
            {ROADMAP.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = step.status === "active";
              
              return (
                <div key={step.phase} className="relative flex flex-col lg:flex-row items-center justify-between w-full">
                  {/* Phase Marker */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`absolute left-6 lg:left-1/2 w-16 h-16 rounded-full border transform -translate-x-1/2 z-20 flex items-center justify-center backdrop-blur-3xl transition-all duration-1000 hidden lg:flex ${
                      isActive ? "bg-gold border-gold text-black shadow-3xl shadow-gold/30" : "bg-bg-primary/80 border-border-soft text-text-muted"
                    }`}
                  >
                    <span className="text-xs font-black tracking-tighter">{step.phase}</span>
                  </motion.div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-[45%] flex ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className={`group w-full max-w-xl p-10 lg:p-14 bg-bg-card border rounded-[32px] relative transition-all duration-700 shadow-3xl hover:border-gold/20 ${
                        isActive ? "border-gold/30" : "border-border-soft"
                      }`}
                    >
                      {/* Status indicator */}
                      <div className="absolute top-10 right-10 flex items-center gap-3">
                         <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold animate-pulse' : 'bg-text-muted/30'}`} />
                         <span className={`text-[9px] uppercase tracking-[0.25em] font-black ${isActive ? 'text-gold' : 'text-text-muted'}`}>
                           {isActive ? 'Live Initiative' : 'Upcoming'}
                         </span>
                      </div>

                      <div className="mb-10">
                        <span className="text-gold text-[10px] font-bold tracking-[.3em] mb-4 block uppercase opacity-80 group-hover:opacity-100 transition-opacity">{step.date}</span>
                        <h3 className="font-display text-3xl lg:text-4xl leading-[1.1] text-text-primary uppercase group-hover:text-gold transition-colors duration-500">
                          {step.title}
                        </h3>
                      </div>

                      <ul className="space-y-6">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 group/item">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold/40 mt-1.5 group-hover/item:bg-gold transition-colors duration-500" />
                            <span className="text-[13px] text-text-secondary leading-relaxed font-light tracking-wide group-hover:text-text-primary transition-colors duration-500">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="absolute -bottom-10 -right-10 text-[120px] font-display font-medium text-white/[0.02] select-none pointer-events-none group-hover:text-gold/5 transition-all duration-1000">
                        {step.phase}
                      </div>
                    </motion.div>
                  </div>

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
    </div>
  );
}
