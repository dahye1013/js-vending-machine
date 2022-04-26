import { ValidationError } from './errorValidation';
import { ERROR } from './message';

export const setItem = (key: string, value: Object): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getItem = <Obj extends Object>(key: string): Obj => {
  try {
    const json = localStorage.getItem(key);
    if (json === null) throw new ValidationError(ERROR.NO_STORAGE_ITEM);
    return JSON.parse(json);
  } catch (err) {
    throw err;
  }
};
