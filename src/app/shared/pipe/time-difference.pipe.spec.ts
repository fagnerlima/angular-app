import { TimeDifferencePipe } from './time-difference.pipe';

describe('Shared: Pipe: TimeDifferencePipe', () => {
  const endValueTest = new Date('2017-01-01 13:25:10.525');
  const startValueTest = new Date('2017-01-01 09:30:00.050');

  let pipe: TimeDifferencePipe;

  beforeEach(() => {
    pipe = new TimeDifferencePipe();
  });

  it('deve criar o Pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve calcular a diferença entre dois momentos com o formato padrão (HH:mm:ss)', () => {
    expect(pipe.transform(endValueTest, startValueTest)).toEqual('03:55:10');
  });

  it('deve calcular a diferença entre dois momentos com o formato HH:mm:ss.SSS', () => {
    expect(pipe.transform(endValueTest, startValueTest, 'HH:mm:ss.SSS')).toEqual('03:55:10.475');
  });

  it('deve calcular a diferença entre dois momentos com o formato HH:mm', () => {
    expect(pipe.transform(endValueTest, startValueTest, 'HH:mm')).toEqual('03:55');
    expect(pipe.transform(endValueTest, startValueTest, 'H:m')).toEqual('3:55');
  });

  it('deve calcular a diferença entre dois momentos com o formato mm:ss', () => {
    expect(pipe.transform(endValueTest, startValueTest, 'mm:ss', 'm')).toEqual('235:10');
  });

  it('deve calcular a diferença entre dois momentos com o formato ss.SSS', () => {
    expect(pipe.transform(endValueTest, startValueTest, 'ss.SSS', 's')).toEqual('14110.475');
  });

  it('deve calcular a diferença entre dois momentos, em datas distintas, com o formato HH:mm:ss.SSS', () => {
    const end = new Date('2018-03-02 00:00:00.000');
    const start = new Date('2017-01-01 00:00:00.000');

    expect(pipe.transform(end, start, 'y', 'y')).toEqual('1');
    expect(pipe.transform(end, start, 'M', 'M')).toEqual('14');
    expect(pipe.transform(end, start, 'd', 'd')).toEqual('425');
    expect(pipe.transform(end, start, 'H:m:s.SSS', 'h')).toEqual('10200:0:0.0');
  });
});
