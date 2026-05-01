import { motion } from "motion/react";
<<<<<<< HEAD
import { Shield, Globe, Cpu } from "lucide-react";
=======
import { Shield, Globe, Cpu, Gem, Gift, Users } from "lucide-react";
>>>>>>> 17e96eb (first commit)
import { NFT_IMAGES } from "../assets/images";
import { NFTImage } from "./nft/NFTCard";

export default function WhySection() {
  const values = [
    {
<<<<<<< HEAD
      icon: Globe,
      title: "Cultural Preservation",
      desc: "Digitizing and immortalizing Indonesian heritage for the decentralized generation through high-fidelity virtual artifacts."
    },
    {
      icon: Shield,
      title: "Sovereign Governance",
      desc: "Each raccoon represents a piece of historical narrative, granting holders governance in the upcoming Archipelago Metaverse."
    },
    {
      icon: Cpu,
      title: "Engine of Utility",
      desc: "Leveraging smart-contract architecture to turn mythology into interactive, cross-metaverse digital assets."
=======
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
>>>>>>> 17e96eb (first commit)
    }
  ];

  return (
    <div className="py-24 relative">
      <div className="w-full grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
<<<<<<< HEAD
          <span className="text-luxury-purple text-xs font-bold uppercase tracking-[0.6em] mb-4 block">The Vision</span>
          <h2 className="font-display text-5xl md:text-7xl mb-8 leading-tight tracking-tight text-white">PRESERVING<br/>THE LEGACY</h2>
          <p className="text-white/60 text-base md:text-lg font-light mb-12 leading-relaxed max-w-xl">
            Royal Raccoon Nusantara is more than an NFT project. It's a bridge between a rich historical tapestry and the boundless possibilities of Web3. We believe culture is the most valuable asset in the digital age.
=======
          <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.6em] mb-4 block drop-shadow-sm">The Vision</span>
          <h2 className="font-display text-5xl md:text-7xl mb-8 leading-tight tracking-tight text-text-primary">PRESERVING<br/>THE LEGACY</h2>
          <p className="text-text-secondary text-base md:text-lg font-light mb-12 leading-relaxed max-w-xl">
            Nusantara Royal Raccoon is more than an NFT project. It's a bridge between a rich historical tapestry and the boundless possibilities of Web3. We believe culture is the most valuable asset in the digital age.
>>>>>>> 17e96eb (first commit)
          </p>
          
          <div className="flex flex-col gap-10">
            {values.map((v, idx) => (
              <motion.div 
                key={idx} 
                className="flex gap-8 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
<<<<<<< HEAD
                <div className="w-16 h-16 rounded-2xl glass flex-shrink-0 flex items-center justify-center group-hover:border-luxury-gold/50 transition-all duration-300">
                  <v.icon className="w-7 h-7 text-luxury-gold group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-display text-2xl mb-2 group-hover:text-luxury-gold transition-colors duration-300 text-white">{v.title}</h4>
                  <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-sm font-light">{v.desc}</p>
=======
                <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border-soft flex-shrink-0 flex items-center justify-center group-hover:border-accent-gold transition-all duration-300">
                  <v.icon className="w-7 h-7 text-accent-gold group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-display text-2xl mb-2 group-hover:text-accent-gold transition-colors duration-300 text-text-primary">{v.title}</h4>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-sm font-light">{v.desc}</p>
>>>>>>> 17e96eb (first commit)
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
<<<<<<< HEAD
          className="relative aspect-square max-w-[500px] mx-auto lg:max-w-none w-full"
=======
          className="relative aspect-square max-w-[500px] mx-auto lg:max-w-none w-full group"
>>>>>>> 17e96eb (first commit)
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
<<<<<<< HEAD
          <div className="absolute inset-0 bg-luxury-purple/20 rounded-[4rem] blur-[100px] animate-pulse" />
          <div className="relative z-10 w-full h-full glass rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
=======
          <div className="absolute inset-0 bg-accent-gold-soft blur-[100px] animate-pulse opacity-20" />
          <div className="relative z-10 w-full h-full bg-bg-card backdrop-blur-xl rounded-[4rem] overflow-hidden border border-border-soft shadow-2xl">
>>>>>>> 17e96eb (first commit)
             <NFTImage 
                src={NFT_IMAGES.VISION_ART} 
                alt="Digital Art Vision" 
                className="w-full h-full object-cover opacity-60 transition-opacity duration-1000 group-hover:opacity-100"
             />
<<<<<<< HEAD
             <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
             <div className="absolute bottom-16 left-16 right-16">
                <div className="text-[10px] font-bold tracking-[0.5em] text-luxury-gold uppercase mb-2">Fundamental Truth</div>
                <h3 className="text-4xl font-display text-white mb-2 tracking-tight uppercase">Eternal Unity</h3>
                <p className="text-[9px] text-white/40 tracking-[0.3em] font-mono leading-relaxed uppercase">Authenticity — Sovereignty — Heritage</p>
=======
             <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
             <div className="absolute bottom-16 left-16 right-16">
                <div className="text-[10px] font-bold tracking-[0.5em] text-accent-gold uppercase mb-2">Fundamental Truth</div>
                <h3 className="text-4xl font-display text-text-primary mb-2 tracking-tight uppercase">Eternal Unity</h3>
                <p className="text-[9px] text-text-muted tracking-[0.3em] font-mono leading-relaxed uppercase">Authenticity — Sovereignty — Heritage</p>
>>>>>>> 17e96eb (first commit)
             </div>
          </div>
          
          {/* Decorative Float */}
          <motion.div 
<<<<<<< HEAD
            className="absolute -top-8 -right-8 w-32 h-32 glass border-luxury-gold/20 rounded-3xl flex items-center justify-center p-6 shadow-2xl hidden md:flex"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-full h-full text-luxury-gold/30" />
=======
            className="absolute -top-8 -right-8 w-32 h-32 bg-bg-card backdrop-blur-xl border border-accent-gold/20 rounded-3xl flex items-center justify-center p-6 shadow-2xl hidden md:flex"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-full h-full text-accent-gold/30" />
>>>>>>> 17e96eb (first commit)
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
