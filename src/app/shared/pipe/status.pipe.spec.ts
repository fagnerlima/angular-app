import { StatusPipe } from './status.pipe';

describe('Shared: Pipe: StatusPipe', () => {
  let pipe: StatusPipe;

  beforeEach(() => {
    pipe = new StatusPipe();
  });

  it('deve criar o Pipe', () => {
    expect(pipe).toBeTruthy();
  });
});
