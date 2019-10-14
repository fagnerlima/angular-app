import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import ptBR from '@angular/common/locales/pt';

import { BytePipe } from './byte.pipe';

registerLocaleData(ptBR);

describe('Shared: Pipe: BytePipe', () => {
  let pipe: BytePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCALE_ID, useValue: 'pt-PT' },
        DecimalPipe
      ]
    });
  });

  beforeEach(() => {
    pipe = new BytePipe(TestBed.get(DecimalPipe));
  });

  it('deve criar uma instância do pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve converter bytes para bytes', () => {
    const bytes = 85.5;

    expect(pipe.transform(bytes)).toEqual('85,5 B');
  });

  it('deve converter bytes para kilobytes', () => {
    const bytes = 1 * Math.pow(10, 4);

    expect(pipe.transform(bytes)).toEqual('9,77 KB');
  });

  it('deve converter bytes para megabytes', () => {
    const bytes = 1 * Math.pow(10, 7);

    expect(pipe.transform(bytes)).toEqual('9,54 MB');
  });

  it('deve converter bytes para gigabytes', () => {
    const bytes = 1 * Math.pow(10, 10);

    expect(pipe.transform(bytes)).toEqual('9,31 GB');
  });
});
