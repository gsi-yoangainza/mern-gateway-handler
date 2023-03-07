import { RuleObject } from 'antd/lib/form';
import { intl } from '../helpers/i18nHelper';

export const validateNames = (rule: RuleObject, value: string, name: string) => {
  const valid = new RegExp(/^[A-Za-zÀ-ÿ\u00f1\u00d1]+([-\s_']{1}[A-Za-zÀ-ÿ\u00f1\u00d1]+)*$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('nameLastnameRequired', { options: { context: name } })));
    } else if (!valid.test(value) || value.length >= 50) {
      reject(new Error(intl('gateway.onlyNameLastName')));
    } else {
      resolve();
    }
  });
};

export const validateFieldName = (rule: RuleObject, value: string) => {
  const valid = new RegExp(/^[A-Za-zÀ-ÿ\u00f1\u00d1]+([-\s_']{1}[A-Za-zÀ-ÿ\u00f1\u00d1]+)*$/);

  return new Promise<void>((resolve, reject) => {
    if (value && !valid.test(value)) {
      reject(new Error(intl('gateway.onlyNameLastName')));
    } else {
      resolve();
    }
  });
};

export const validateIPv4Address = (rule: RuleObject, value: string) => {
  const validRule = new RegExp(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  );

  return new Promise<void>((resolve, reject) => {
    if (value && !validRule.test(value)) {
      reject(new Error(intl('gateway.ipv4AddressValidation')));
    } else {
      resolve();
    }
  });
};

export const validatePassword = (rule: RuleObject, value: string, isediting: any) => {
  const valid = new RegExp(/^(?=.*?[a-zA-Z])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])((?=.*?[^\w\s])|(?=.*?[_])).{10,64}$/);

  return new Promise<void>((resolve, reject) => {
    if (!value && !isediting) {
      reject(new Error(intl('passwordRequired')));
    } else if ((!valid.test(value) || value.length < 10 || value.length > 64) && !isediting) {
      reject(new Error(intl('passwordAdmitCharacter')));
    } else {
      resolve();
    }
  });
};

export const confirmPassword = (rule: RuleObject, value: string, password: string, isediting: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!value && !isediting) {
      reject(new Error(intl('passwordRequired')));
    } else if (value !== password && !isediting) {
      reject(new Error(intl('passwordMatch')));
    } else {
      resolve();
    }
  });
};

export const confirmNewPassword = (rule: RuleObject, value: string, password: string): Promise<void> => {
  const valid = new RegExp(/^(?=.*?[a-zA-Z])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])((?=.*?[^\w\s])|(?=.*?[_])).{10,64}$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('passwordRequired')));
    } else if (!valid.test(value) || value.length < 10 || value.length > 64) {
      reject(new Error(intl('passwordAdmitCharacter')));
    } else if (value === password) {
      reject(new Error(intl('passwordCantMatch')));
    } else {
      resolve();
    }
  });
};
