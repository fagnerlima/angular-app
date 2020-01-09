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
    const difference = pipe.transform(endValueTest, startValueTest);

    expect(difference).toEqual('03:55:10');
  });

  it('deve calcular a diferença entre dois momentos com o formato HH:mm:ss.SSS', () => {
    const difference = pipe.transform(endValueTest, startValueTest, 'HH:mm:ss.SSS');

    expect(difference).toEqual('03:55:10.475');
  });

  it('deve calcular a diferença entre dois momentos com o formato HH:mm', () => {
    const difference = pipe.transform(endValueTest, startValueTest, 'HH:mm');

    expect(difference).toEqual('03:55');
  });

  it('deve calcular a diferença entre dois momentos com o formato mm:ss', () => {
    const difference = pipe.transform(endValueTest, startValueTest, 'mm:ss');

    expect(difference).toEqual('235:10');
  });

  it('deve calcular a diferença entre dois momentos com o formato ss.SSS', () => {
    const difference = pipe.transform(endValueTest, startValueTest, 'ss.SSS');

    expect(difference).toEqual('14110.475');
  });
});
