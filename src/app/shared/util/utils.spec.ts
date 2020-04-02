import { isNullOrUndefined, isObject, isString, isArray, isDate } from './utils';

describe('Shared: Util: utils', () => {
  it('deve checar se o valor é null ou undefined', async () => {
    expect(isNullOrUndefined(null)).toBeTruthy();
    expect(isNullOrUndefined(undefined)).toBeTruthy();
    expect(isNullOrUndefined('undefined')).toBeFalsy();
    expect(isNullOrUndefined('')).toBeFalsy();
  });

  it('deve checar se o valor é do tipo object', async () => {
    expect(isObject(null)).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
    expect(isObject('a')).toBeFalsy();
    expect(isObject({ value: 1 })).toBeTruthy();
    expect(isObject(new Array())).toBeTruthy();
  });

  it('deve checar se o valor é do tipo string', async () => {
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString({ value: 1 })).toBeFalsy();
    expect(isString('')).toBeTruthy();
    expect(isString('a')).toBeTruthy();
  });

  it('deve checar se o valor é array', async () => {
    expect(isArray(null)).toBeFalsy();
    expect(isArray(undefined)).toBeFalsy();
    expect(isArray('a')).toBeFalsy();
    expect(isArray({ value: 1 })).toBeFalsy();
    expect(isArray(new Array())).toBeTruthy();
  });

  it('deve checar se o valor é Date', async () => {
    expect(isDate(null)).toBeFalsy();
    expect(isDate(undefined)).toBeFalsy();
    expect(isDate('a')).toBeFalsy();
    expect(isDate({ value: 1 })).toBeFalsy();
    expect(isDate(new Date())).toBeTruthy();
  });
});
