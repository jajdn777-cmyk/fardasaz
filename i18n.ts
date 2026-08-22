import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fa from './fa.json';
import en from './en.json';
import ps from './ps.json';
import uz from './uz.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      en: { translation: en },
      ps: { translation: ps },
      uz: { translation: uz }
    },
    lng: 'fa', // force default to fa, detector will still work if user changes it and we save it, but maybe better to configure detector
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
