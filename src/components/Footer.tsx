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
               </a>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
          <div className="flex flex-col gap-6">
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
            </div>
          </div>
        </div>
      </Container>
      
      <div className="text-center mt-32 border-t border-white/5 pt-12">
        <p className="text-[9px] tracking-[0.6em] text-white/20 uppercase">
          © 2026 NUSANTARA ETERNA • {t("footer.rights")}
        </p>
      </div>
      
      <div className="text-center mt-24 opacity-[0.02] translate-y-12 select-none pointer-events-none">
        <span className="text-[18vw] font-display font-black leading-none uppercase tracking-tighter">Nusantara</span>
      </div>
    </footer>
  );
}
