import { Options18N } from '../types/Options18N';
import { TFunction, TOptions } from 'i18next';

export const { intl, initTranslation } = (() => {
  let a = {} as TFunction;
  return {
    intl: (key: string, options?: Options18N) => a(key, options?.defaultValue ?? '', options?.options),
    initTranslation: (operator: any) => {
      a = operator?.('app').t;
    },
  };
})();
