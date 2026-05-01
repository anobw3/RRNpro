<<<<<<< HEAD
import { Crown, Twitter, Github, MessageCircle } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import Container from "../layout/Container";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-24 border-t border-white/5 bg-luxury-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-purple/5 to-transparent pointer-events-none" />
      
      <Container className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16 relative z-10">
        <div className="flex flex-col items-center lg:items-start gap-8 max-w-sm">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 border border-luxury-gold rotate-45 flex items-center justify-center bg-luxury-gold transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
               <Crown className="w-6 h-6 text-black -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-3xl font-bold tracking-[0.2em] text-white uppercase leading-none">Nusantara</span>
              <span className="text-[10px] tracking-[0.6em] text-luxury-gold font-bold uppercase mt-1">{t("footer.subtitle")}</span>
            </div>
          </div>
          <p className="text-white/30 text-[11px] tracking-[0.2em] font-light leading-relaxed text-center lg:text-start balance">
            {t("footer.description")}
          </p>
          <div className="flex gap-4">
             {[Twitter, Github, MessageCircle].map((Icon, idx) => (
               <a key={idx} href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-luxury-gold transition-all duration-500 hover:-translate-y-2 group">
                 <Icon className="w-5 h-5 text-white/40 group-hover:text-luxury-gold transition-colors" />
=======
import { Crown, Twitter, Github, MessageCircle, Instagram } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import SafeImage from "./ui/SafeImage";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const socialLinks = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: MessageCircle, href: "#", label: "Discord" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Github, href: "#", label: "Github" }
  ];

  return (
    <footer className="py-24 border-t border-border-soft bg-bg-primary relative overflow-hidden z-10 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-gold-soft/10 to-transparent pointer-events-none" />
      
      <Container className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16 relative z-10">
        <div className="flex flex-col items-center lg:items-start gap-8 max-w-sm">
          <div className="flex items-center gap-5 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-4 group">
               <div className="w-16 h-16 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-accent-gold-soft blur-[15px] rounded-full group-hover:opacity-80 transition-all duration-700" />
                  <SafeImage 
                    src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                    className="w-full h-full object-contain relative z-10"
                  />
               </div>
               <div className="flex flex-col">
                 <span className="text-[22px] font-black tracking-[0.25em] text-text-primary leading-none font-display mb-1 italic">NUSANTARA</span>
                 <span className="text-[12px] font-bold tracking-[0.5em] text-accent-gold leading-none opacity-80 group-hover:opacity-100 transition-opacity">ROYAL RACCOON</span>
               </div>
            </div>
          </div>
          <p className="text-text-secondary text-[11px] tracking-[0.2em] font-light leading-relaxed text-center lg:text-start balance">
            {t("footer.description") || "A sovereign digital realm where ancient heritage meets the eternal chain."}
          </p>
          <div className="flex gap-4">
             {socialLinks.map(({ Icon, href, label }, idx) => (
               <a 
                 key={idx} 
                 href={href} 
                 aria-label={label}
                 className="w-12 h-12 rounded-full bg-bg-card border border-border-soft flex items-center justify-center hover:border-accent-gold transition-all duration-500 hover:-translate-y-2 group shadow-sm shadow-accent-gold/5"
               >
                 <Icon className="w-5 h-5 text-text-muted group-hover:text-accent-gold transition-colors" />
>>>>>>> 17e96eb (first commit)
               </a>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6">
<<<<<<< HEAD
            <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">{t("footer.protocols")}</span>
            <div className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("nav.manifesto")}</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.digital_laws")}</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.governance")}</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">{t("footer.archives")}</span>
            <div className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.lineage_map")}</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.beast_code")}</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.royal_vault")}</a>
            </div>
          </div>
          <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
            <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">{t("footer.integrity")}</span>
            <div className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.security_audit")}</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">{t("footer.transparency")}</a>
=======
            <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-bold">{t("footer.subtitle") || "The Throne"}</span>
            <div className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary">
              <button onClick={() => navigate("/manifesto")} className="hover:text-accent-gold transition-colors text-start">{t("nav.manifesto") || "Manifesto"}</button>
              <button onClick={() => navigate("/law")} className="hover:text-accent-gold transition-colors text-start">{t("footer.digital_laws") || "The Law"}</button>
              <button onClick={() => navigate("/governance")} className="hover:text-accent-gold transition-colors text-start">{t("footer.governance") || "Governance"}</button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-bold">{t("footer.archives") || "Archives"}</span>
            <div className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary">
              <button onClick={() => navigate("/lineage")} className="hover:text-accent-gold transition-colors text-start">{t("footer.lineage_map") || "Lineage Map"}</button>
              <button onClick={() => navigate("/code")} className="hover:text-accent-gold transition-colors text-start">{t("footer.beast_code") || "Beast Code"}</button>
              <button onClick={() => navigate("/archive")} className="hover:text-accent-gold transition-colors text-start">{t("nav.collection") || "Royal Archive"}</button>
            </div>
          </div>
          <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
            <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-bold">{t("footer.integrity") || "Integrity"}</span>
            <div className="flex flex-col gap-4 text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary">
              <button onClick={() => navigate("/security")} className="hover:text-accent-gold transition-colors text-start">{t("footer.security_audit") || "Security Audit"}</button>
              <button onClick={() => navigate("/transparency")} className="hover:text-accent-gold transition-colors text-start">{t("footer.transparency") || "Transparency"}</button>
              <button onClick={() => navigate("/kingdom")} className="hover:text-accent-gold transition-colors text-start">{t("footer.royal_vault") || "The Kingdom"}</button>
>>>>>>> 17e96eb (first commit)
            </div>
          </div>
        </div>
      </Container>
      
<<<<<<< HEAD
      <div className="text-center mt-32 border-t border-white/5 pt-12">
        <p className="text-[9px] tracking-[0.6em] text-white/20 uppercase">
          © 2026 NUSANTARA ETERNA • {t("footer.rights")}
        </p>
      </div>
      
      <div className="text-center mt-24 opacity-[0.02] translate-y-12 select-none pointer-events-none">
        <span className="text-[18vw] font-display font-black leading-none uppercase tracking-tighter">Nusantara</span>
=======
      <div className="text-center mt-32 border-t border-border-soft pt-12">
        <p className="text-[9px] tracking-[0.6em] text-text-muted uppercase">
          © 2026 NUSANTARA ROYAL RACCOON • {t("footer.rights") || "Part of the Eternal Chain"}
        </p>
      </div>
      
      <div className="text-center mt-24 opacity-[0.03] dark:opacity-[0.02] translate-y-12 select-none pointer-events-none">
        <span className="text-[18vw] font-display font-black leading-none uppercase tracking-tighter text-text-primary italic">Nusantara Royal Raccoon</span>
>>>>>>> 17e96eb (first commit)
      </div>
    </footer>
  );
}
