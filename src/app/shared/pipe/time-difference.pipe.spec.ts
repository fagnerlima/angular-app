import { TimeDifferencePipe } from './time-difference.pipe';

describe('Shared: Pipe: TimeDifferencePipe', () => {
  let pipe: TimeDifferencePipe;

  beforeEach(() => {
    pipe = new TimeDifferencePipe();
  });

  it('deve criar o Pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve calcular a diferença entre dois momentos', () => {
    const end = new Date('2017-01-01 13:25:10.525');
    const start = new Date('2017-01-01 09:30:00.050');
    const difference = pipe.transform(end, start);

    expect(difference).toEqual('03:55:10.475');
  });
});
