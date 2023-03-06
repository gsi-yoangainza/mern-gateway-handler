import { Locale } from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale/en_US';
import esES from 'antd/lib/locale/es_ES';

type localeOption = {
  [key: string]: Locale;
};

const locales: localeOption = {
  en: enUS,
  es: esES,
};

export default { locales };
