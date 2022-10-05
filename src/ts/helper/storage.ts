import { NoDataError } from '../utils/errorValidation';
import { ERROR } from '../config/message';

export const setItem = <T extends keyof State, U extends State[T]>(key: T, value: U) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw new Error('Fail to set Item in LocalStorage.');
  }
};

export const getItem = <T extends keyof State, U extends State[T]>(key: T): U => {
  const json = localStorage.getItem(key);
  if (json === null) throw new NoDataError(ERROR.NO_STORAGE_ITEM);
  return JSON.parse(json);
};
