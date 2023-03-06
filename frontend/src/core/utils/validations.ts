import { RuleObject } from 'antd/lib/form';
import { intl } from '../helpers/i18nHelper';

export const validateNames = (rule: RuleObject, value: string, name: string) => {
  const valid = new RegExp(/^[A-Za-zÀ-ÿ\u00f1\u00d1]+([-\s_']{1}[A-Za-zÀ-ÿ\u00f1\u00d1]+)*$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('nameLastnameRequired', { options: { context: name } })));
    } else if (!valid.test(value) || value.length >= 50) {
      reject(new Error(intl('onlyNameLastName')));
    } else {
      resolve();
    }
  });
};

export const validateUsername = (rule: RuleObject, value: string, recordNumber: string) => {
  const valid = new RegExp(/^[A-Za-z0-9]+([-._]{1}[A-Za-z0-9]+)*$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('usernameRequired')));
    } else if (!valid.test(value) || value.length > 32) {
      reject(new Error(intl('userAdmitCharacter')));
    } else if (recordNumber !== '' && value === recordNumber) {
      reject(new Error(intl('userNotRecordNumber')));
    } else {
      resolve();
    }
  });
};

export const validateFieldName = (rule: RuleObject, value: string, name: string) => {
  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('nameRequired')));
    } else {
      resolve();
    }
  });
};

export const validatenickName = (rule: RuleObject, value: string, name: string) => {
  const valid = new RegExp(/^[A-Za-zÀ-ÿ\u00f1\u00d1]+(([\s]|(.\s)){1}[A-Za-zÀ-ÿ\u00f1\u00d1]+)*$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('nameLastnameRequired', { options: { context: name } })));
    } else if (!valid.test(value) || value.length >= 50) {
      reject(new Error(intl('nameValidationMsg')));
    } else {
      resolve();
    }
  });
};

export const validateSpecialty = (rule: RuleObject, value: string, name: string) => {
  const valid = new RegExp(/^[A-Za-zÀ-ÿ\u00f1\u00d1]+([-\s]{1}[A-Za-zÀ-ÿ\u00f1\u00d1]+)*$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('nameLastnameRequired', { options: { context: name } })));
    } else if (!valid.test(value) || value.length > 250) {
      reject(new Error(intl('onlySpecialtyInstitution')));
    } else {
      resolve();
    }
  });
};

export const validateNoRegister = (rule: RuleObject, value: string) => {
  const validRule = new RegExp(/^\d+$/);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject(new Error(intl('registerNumberRequired')));
    } else if (!validRule.test(value) || value.length <= 3 || value.length > 10) {
      reject(new Error(intl('onlyNumberCharacter')));
    } else {
      resolve();
    }
  });
};

export const validateAge = (rule: RuleObject, value: string) => {
  const validRule = new RegExp(/^\d+$/);

  return new Promise<void>((resolve, reject) => {
    if (value == undefined || '') {
      reject(new Error(intl('ageRequired')));
    } else if (!validRule.test(value) || value.length > 3 || Number(value) > 120) {
      reject(new Error(intl('ageOnlyNumberCharacter')));
    } else {
      resolve();
    }
  });
};

export const validatePhone = (rule: RuleObject, value: string) => {
  const validRule = new RegExp(/^\d+$/);

  return new Promise<void>((resolve, reject) => {
    if (value && (!validRule.test(value) || value.length !== 8)) {
      reject(new Error(intl('phoneNumberCharacter')));
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
