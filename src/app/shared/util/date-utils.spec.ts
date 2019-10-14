import { DateUtils } from './date-utils';

describe('Shared: Util: DateUtils', () => {
  it('deve serializar data', () => {
    const data = new Date();

    expect(DateUtils.serializeDate(data)).toEqual(data.toJSON().substring(0, 10));
    expect(DateUtils.serializeDate(null)).toBeNull();
  });

  it('deve deserializar data', () => {
    const data = new Date();
    const jsonData = DateUtils.serializeDate(data);

    expect(DateUtils.deserializeDate(jsonData).toJSON().substring(0, 10)).toEqual(data.toJSON().substring(0, 10));
    expect(DateUtils.deserializeDate(null)).toBeNull();
  });

  it('deve serializar data e hora', () => {
    const data = new Date();

    expect(DateUtils.serializeDateTime(data)).toEqual(data.toJSON().replace(/(.+)Z/, '$1'));
    expect(DateUtils.serializeDateTime(null)).toBeNull();
  });

  it('deve deserializar data e hora', () => {
    const data = new Date();
    const jsonData = DateUtils.serializeDateTime(data);

    expect(DateUtils.deserializeDateTime(jsonData)).toEqual(DateUtils.toUTCDateTime(data));
    expect(DateUtils.deserializeDateTime(jsonData + 'Z')).toEqual(DateUtils.toUTCDateTime(data));
    expect(DateUtils.deserializeDateTime(null)).toBeNull();
  });

  it('deve obter o time do Date', () => {
    const data = new Date('2018-01-01 08:30:00');

    expect(DateUtils.toTime(data)).toEqual('08:30:00');
  });

  it('deve verificar se as datas são do mesmo dia', () => {
    const data1 = new Date('2018-01-01 08:30:00');
    const data2 = new Date('2018-01-01 16:45:00');
    const data3 = new Date('2018-01-02 03:00:00');

    expect(DateUtils.isSameDay(data1, data2)).toBeTruthy();
    expect(DateUtils.isSameDay(data1, data3)).toBeFalsy();
  });

  it('deve verificar se a data é de hoje', () => {
    const data1 = new Date();
    const data2 = new Date('2015-01-01');

    expect(DateUtils.isToday(data1)).toBeTruthy();
    expect(DateUtils.isToday(data2)).toBeFalsy();
  });
});
