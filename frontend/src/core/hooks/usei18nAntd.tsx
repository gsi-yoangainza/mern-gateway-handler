import { Locale } from 'antd/lib/locale-provider';
import i18nAntMappingHelper from '../helpers/i18nAntdMappingHelper';
import { LocaleOption } from '../types/LocaleOption';

// implementar q cambie automaticamente cuando se cambie el lenguaje del store.
export const usei18nAntd = (scope: LocaleOption = 'en'): { locale: Locale } => {
  const locale = i18nAntMappingHelper.locales[scope];
  return { locale };
};
