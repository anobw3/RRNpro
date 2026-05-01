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
        className="flex items-center gap-3 px-5 py-2.5 bg-bg-primary/50 backdrop-blur-xl border border-border-soft rounded-full text-text-muted hover:text-text-primary hover:border-gold/30 transition-all group"
      >
        <Globe className="w-3.5 h-3.5 group-hover:text-gold transition-colors" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="absolute top-full right-0 lg:left-0 mt-4 w-60 bg-bg-card border border-border-soft rounded-[28px] overflow-hidden shadow-2xl z-150 p-2"
          >
            <div className="px-5 py-3 mb-2 border-b border-border-soft/50">
              <span className="text-[9px] font-black tracking-[0.4em] uppercase text-text-muted block">{t("nav.select_language") || "Vernacular"}</span>
            </div>
            <div className="space-y-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as Language);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-start transition-all rounded-xl ${
                    language === lang.code ? 'bg-gold text-black' : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl leading-none">{lang.flag}</span>
                    <span className="font-bold tracking-[0.1em] text-[10px] uppercase">{lang.name}</span>
                  </div>
                  {language === lang.code && <Check className="w-4 h-4 text-black" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
