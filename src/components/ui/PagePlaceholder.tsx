import { motion } from "motion/react";
import Container from "../../layout/Container";
import Footer from "../Footer";
import { useTranslation } from "../../context/LanguageContext";

export default function GenericPage({ title, description }: { title: string, description: string }) {
  const { t } = useTranslation();
  
  return (
    <div className="pt-32 min-h-screen">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 text-center"
        >
          <h1 className="font-display text-5xl md:text-8xl tracking-tight text-text-primary mb-8 border-b border-border-soft pb-8 uppercase">
            {title}
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg lowercase tracking-widest font-light leading-relaxed">
            {description} — {t("footer.description") || "Part of the Nusantara Royal Raccoon ecosystem. Detailed protocols are currently being etched onto the eternal chain."}
          </p>
          
          <div className="relative mt-24">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-gold-soft/10 blur-[120px] rounded-full pointer-events-none" />
             <div className="w-px h-64 bg-gradient-to-b from-accent-gold to-transparent mx-auto" />
          </div>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
}
