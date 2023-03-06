import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import app_en from '../../../translations/en/en.json';

const resources = {
  en: {
    app: app_en,
  },
};

i18n.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en-US',
  ns: ['app'],
  resources,
});

export default i18n;
