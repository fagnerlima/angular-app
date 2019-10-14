import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '@app/core/shared/error-handler.service';
import { ToastService } from '@app/shared/service/toast.service';
import { TokenInterceptor } from './token-interceptor';

describe('Security: TokenInterceptor', () => {
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        MessageService,
        TokenInterceptor,
        ErrorHandlerService,
        ToastService
      ]
    });
  });

  beforeEach(inject([TokenInterceptor], (tokenInterceptor: TokenInterceptor) => {
    interceptor = tokenInterceptor;
  }));

  it('deve criar e injetar o interceptor', () => {
    expect(interceptor).toBeTruthy();
  });
});
