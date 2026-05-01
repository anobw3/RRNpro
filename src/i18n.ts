import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './lib/translations';

i18n
  .use(initReactI18next)
  .init({
    resources: Object.keys(translations).reduce((acc, lang) => {
      acc[lang] = { translation: translations[lang as keyof typeof translations] };
      return acc;
    }, {} as any),
    lng: localStorage.getItem('app-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
