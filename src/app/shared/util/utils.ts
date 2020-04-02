import * as moment from 'moment';

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function isObject(value: any): boolean {
  return !isNullOrUndefined(value) && typeof value === 'object';
}

export function isString(value: any): boolean {
  return !isNullOrUndefined(value) && typeof value === 'string';
}

export function isArray(value: any): boolean {
  return !isNullOrUndefined(value) && Array.isArray(value);
}

export function isDate(value: any): boolean {
  return !isNullOrUndefined(value) && moment.isDate(value);
}
