import { motion } from "motion/react";
import { Shield, Globe, Cpu, Gem, Gift, Users } from "lucide-react";
import { NFT_IMAGES } from "../assets/images";
import { NFTImage } from "./nft/NFTCard";

export default function WhySection() {
  const values = [
    {
      icon: Gem,
      title: "Exclusive Alpha Access",
      desc: "Join an elite circle of Web3 builders and investors. Holders gain entry to private networking events and high-tier investment insights."
    },
    {
      icon: Gift,
      title: "Physical Heritage Drops",
      desc: "Unlock access to premium physical collectibles, from hand-woven traditional silk scarves to high-fidelity artisan masks delivered to your door."
    },
    {
      icon: Users,
      title: "Metaverse Sovereignty",
      desc: "Your Raccoon is your digital identity in the upcoming Nusantara RPG. Govern exclusive lands and influence the project's evolution."
    }
  ];

  return (
    <div className="py-32 relative">
      <div className="w-full grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gold text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">The Manifesto</span>
          <h2 className="font-display text-6xl md:text-8xl mb-10 leading-[1.1] tracking-tighter text-text-primary uppercase font-medium">Sacred<br/>Preservation</h2>
          <p className="text-text-secondary text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-light mb-16 leading-relaxed max-w-xl opacity-70">
            Nusantara Royal Raccoon is more than an NFT project. It's a bridge between a rich historical tapestry and the boundless possibilities of Web3. We believe culture is the most valuable asset in the digital age.
          </p>
          
          <div className="flex flex-col gap-12">
            {values.map((v, idx) => (
              <motion.div 
                key={idx} 
                className="flex gap-10 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              >
                <div className="w-20 h-20 rounded-[28px] bg-bg-card border border-border-soft flex-shrink-0 flex items-center justify-center group-hover:border-gold/40 transition-all duration-700 shadow-3xl">
                  <v.icon className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h4 className="font-display text-2xl group-hover:text-gold transition-colors duration-500 text-text-primary uppercase tracking-tight">{v.title}</h4>
                    <div className="h-px flex-1 bg-gold/10 hidden md:block" />
                  </div>
                  <p className="text-[12px] text-text-muted leading-relaxed max-w-sm font-light uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="relative aspect-square max-w-[550px] mx-auto lg:max-w-none w-full group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gold/5 blur-[120px] animate-pulse-slow active:animate-none" />
          <div className="relative z-10 w-full h-full bg-bg-card rounded-[60px] overflow-hidden border border-border-soft shadow-3xl">
             <NFTImage 
                src={NFT_IMAGES.VISION_ART} 
                alt="Digital Art Vision" 
                className="w-full h-full object-cover opacity-40 transition-all duration-[2000ms] group-hover:opacity-80 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />
             <div className="absolute bottom-20 left-20 right-20">
                <div className="text-[10px] font-black tracking-[0.5em] text-gold uppercase mb-4 opacity-70">Fundamental Truth</div>
                <h3 className="text-5xl font-display text-text-primary mb-4 tracking-tighter uppercase font-medium">Eternal Unity</h3>
                <div className="h-px w-20 bg-gold/30 mb-4" />
                <p className="text-[9px] text-text-muted tracking-[0.4em] font-medium leading-relaxed uppercase">Authenticity — Sovereignty — Heritage</p>
             </div>
          </div>
          
          {/* Decorative Float */}
          <motion.div 
            className="absolute -top-10 -right-10 w-40 h-40 bg-bg-card border border-gold/20 rounded-[32px] flex items-center justify-center p-8 shadow-3xl hidden md:flex z-20"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-full h-full text-gold/30 group-hover:text-gold/50 transition-colors duration-1000" />
            <div className="absolute inset-0 bg-gold/5 animate-pulse rounded-[32px]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
