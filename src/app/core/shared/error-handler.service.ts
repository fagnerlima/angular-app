import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Route } from '@app/shared/enum/route.enum';
import { ToastService } from '@app/shared/service/toast.service';
import { environment } from '@env/environment';
import { HttpStatus } from '@app/shared/enum/http-status.enum';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastService: ToastService,
    private router: Router
  ) { }

  handleHttpErrorResponse(httpErrorResponse: HttpErrorResponse): void {
    if (HttpStatus.UNAUTHORIZED === httpErrorResponse.status && this.router.url !== `/${Route.LOGIN}`) {
      this.router.navigate([`/${Route.LOGIN}`]);
    }

    if (!environment.production) {
      console.error(`Error ${httpErrorResponse.status} - ${httpErrorResponse.message}`, httpErrorResponse);
    }

    this.printMessages(httpErrorResponse);
  }

  private printMessages(httpErrorResponse: HttpErrorResponse): void {
    const errors: string[] = httpErrorResponse.error.errors;

    if (!errors) {
      this.printGenericMessage();
      return;
    }

    errors.forEach(error => this.toastService.open(error, 'Erro'));
  }

  private printGenericMessage(): void {
    this.toastService.open('Ocorreu um erro durante a solicitação', 'Erro');
  }
}
