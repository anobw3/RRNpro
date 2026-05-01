<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../lib/translations';
=======
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Language, translations } from '../lib/translations';
>>>>>>> 17e96eb (first commit)

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
<<<<<<< HEAD
  t: (keyPath: string) => string;
=======
  t: (key: string, options?: any) => string;
>>>>>>> 17e96eb (first commit)
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
<<<<<<< HEAD
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    if (saved && (saved as Language) in translations) {
      return saved as Language;
    }
    const browserLang = navigator.language.split('-')[0] as Language;
    return (browserLang in translations) ? browserLang : 'en';
  });

  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    localStorage.setItem('app-language', language);
    setIsRTL(language === 'ar');
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let value: any = translations[language];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // Fallback to English
        let fallback: any = translations['en'];
        for (const fKey of keys) {
          if (fallback && typeof fallback === 'object' && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return keyPath; // Return key path if not found even in English
          }
        }
        return fallback;
      }
    }

    return typeof value === 'string' ? value : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
=======
  const { t } = useI18nTranslation();
  const language = i18n.language as Language;

  useEffect(() => {
    console.log("[i18n] Language changed to:", i18n.language);
    localStorage.setItem('app-language', i18n.language);
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  const value = React.useMemo(() => ({
    language,
    setLanguage,
    t,
    isRTL: language === 'ar'
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
>>>>>>> 17e96eb (first commit)
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
