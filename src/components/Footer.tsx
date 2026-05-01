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
    <footer className="py-32 border-t border-border-soft bg-bg-primary relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />
      
      <Container className="flex flex-col lg:flex-row justify-between items-start gap-20 relative z-10">
        <div className="flex flex-col items-start gap-10 max-w-sm">
          <div className="flex items-center gap-6 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-16 h-16 flex items-center justify-center relative p-1">
              <div className="absolute inset-0 bg-gold/5 blur-2xl rounded-full group-hover:bg-gold/10 transition-all duration-1000" />
              <SafeImage 
                 src="https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafkreig3ck347noh2ur3oi2amnfpubycc7mmdleexjld7ggwpp7paiwwtq" 
                 className="w-full h-full object-contain relative z-10 opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-medium tracking-tight text-text-primary leading-none mb-1 uppercase">Nusantara</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase opacity-80 group-hover:opacity-100 transition-opacity">Royal Archive</span>
            </div>
          </div>
          
          <p className="text-text-secondary text-[10px] tracking-[0.2em] font-light leading-relaxed uppercase">
            A sovereign digital realm where ancient heritage meets the eternal chain. Curated for the discerning collector.
          </p>

          <div className="flex gap-4">
             {socialLinks.map(({ Icon, href, label }, idx) => (
               <a 
                 key={idx} 
                 href={href} 
                 aria-label={label}
                 className="w-12 h-12 rounded-full bg-white/5 border border-border-soft flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-700"
               >
                 <Icon className="w-4 h-4 transition-colors" />
               </a>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 w-full lg:w-auto">
          <div className="space-y-8">
            <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-black">{t("footer.subtitle") || "Navigation"}</span>
            <div className="flex flex-col gap-5 text-[11px] font-bold tracking-[0.2em] uppercase text-text-secondary">
              <button onClick={() => navigate("/manifesto")} className="hover:text-gold transition-colors text-left">{t("nav.manifesto") || "Manifesto"}</button>
              <button onClick={() => navigate("/law")} className="hover:text-gold transition-colors text-left">The Constitution</button>
              <button onClick={() => navigate("/governance")} className="hover:text-gold transition-colors text-left">The Council</button>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-black">Collection</span>
            <div className="flex flex-col gap-5 text-[11px] font-bold tracking-[0.2em] uppercase text-text-secondary">
              <button onClick={() => navigate("/lineage")} className="hover:text-gold transition-colors text-left">Lineage Map</button>
              <button onClick={() => navigate("/code")} className="hover:text-gold transition-colors text-left">Beast Code</button>
              <button onClick={() => navigate("/archive")} className="hover:text-gold transition-colors text-left">Archive</button>
            </div>
          </div>
          <div className="space-y-8 col-span-2 lg:col-span-1">
            <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] font-black">Legal</span>
            <div className="flex flex-col gap-5 text-[11px] font-bold tracking-[0.2em] uppercase text-text-secondary">
              <button onClick={() => navigate("/security")} className="hover:text-gold transition-colors text-left">Architecture</button>
              <button onClick={() => navigate("/transparency")} className="hover:text-gold transition-colors text-left">Provenance</button>
              <button onClick={() => navigate("/kingdom")} className="hover:text-gold transition-colors text-left">Heritage</button>
            </div>
          </div>
        </div>
      </Container>
      
      <div className="mt-40 border-t border-border-soft pt-12 flex flex-col items-center gap-10">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-soft to-transparent opacity-50" />
        <p className="text-[8px] tracking-[0.6em] text-text-muted uppercase font-black">
          © 2026 NUSANTARA ROYAL • REGISTERED ON THE ETERNAL CHAIN
        </p>
      </div>
      
      <div className="mt-32 opacity-[0.02] dark:opacity-[0.015] translate-y-12 select-none pointer-events-none text-center">
        <span className="text-[20vw] font-display font-medium leading-none uppercase tracking-tight text-text-primary italic whitespace-nowrap">Nusantara Royal</span>
      </div>
    </footer>
  );
}
