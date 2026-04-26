import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { Language, LANGUAGES } from '../lib/translations';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 glass border border-white/5 rounded-full text-white/50 hover:text-white hover:border-white/20 transition-all group"
      >
        <Globe className="w-3.5 h-3.5 group-hover:text-luxury-gold transition-colors" />
        <span className="text-[10px] font-bold tracking-widest uppercase">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute top-full inset-inline-end-0 mt-4 w-56 glass border border-white/10 rounded-[1.5rem] overflow-hidden shadow-2xl z-[150] py-2"
          >
            <div className="px-4 py-2 mb-1 border-b border-white/5">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/20">{t("nav.select_language") || "Select Language"}</span>
            </div>
            <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as Language);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-start transition-all hover:bg-white/5 group ${
                    language === lang.code ? 'text-luxury-gold bg-white/[0.02]' : 'text-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <span className="font-bold tracking-widest text-[10px] uppercase">{lang.name}</span>
                  </div>
                  {language === lang.code && <Check className="w-3 h-3 text-luxury-gold" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
