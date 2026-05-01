import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Language, translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
