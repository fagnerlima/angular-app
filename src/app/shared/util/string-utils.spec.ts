import { StringUtils } from './string-utils';

describe('Shared: Util: StringUtils', () => {
  it('deve converter uma string para o formato spinal-case', () => {
    expect(StringUtils.toSpinalCase('spinalCase')).toBe('spinal-case');
    expect(StringUtils.toSpinalCase('Spinal Case')).toBe('spinal-case');
  });
});
