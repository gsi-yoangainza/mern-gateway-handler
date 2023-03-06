import { intl } from './i18nHelper';

const required = (val: any) => {
  const noNumberValidation = typeof val !== 'number' && (!val || !val.toString().length);
  return noNumberValidation && intl('labelValidationsRequired');
};

export const Validators = {
  required,
};
