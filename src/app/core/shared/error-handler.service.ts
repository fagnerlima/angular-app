import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { ToastService } from '@app/shared/service/toast.service';
import { environment } from '@env/environment';
import { HttpStatus } from '@app/shared/enum/http-status.enum';
import { isObject } from '@app/shared/util/utils';
import { OAuth2Error } from '@app/shared/enum/oauth2-error.enum';

@Injectable()
export class ErrorHandlerService {

  private readonly oauth2ErrorMessages = new Map([
    [OAuth2Error.INVALID_REQUEST, 'Requisição inválida'],
    [OAuth2Error.INVALID_CLIENT, 'Cliente inválido'],
    [OAuth2Error.INVALID_GRANT, 'Credenciais inválidas'],
    [OAuth2Error.INVALID_SCOPE, 'Escopo inválido'],
    [OAuth2Error.INVALID_TOKEN, 'Token inválido'],
    [OAuth2Error.INSUFFICIENT_SCOPE, 'Escopo insuficiente'],
    [OAuth2Error.UNAUTHORIZED, 'Acesso não autorizado'],
    [OAuth2Error.UNAUTHORIZED_CLIENT, 'Cliente não autorizado'],
    [OAuth2Error.UNSUPPORTED_GRANT_TYPE, 'Tipo de credenciais não suportado'],
    [OAuth2Error.UNSUPPORTED_RESPONSE_TYPE, 'Tipo de resposta não suportado'],
    [OAuth2Error.ACCESS_DENIED, 'Acesso negado'],
  ]);

  constructor(
    private toastService: ToastService,
    private router: Router
  ) { }

  handleHttpErrorResponse(httpErrorResponse: HttpErrorResponse): void {
    if (HttpStatus.UNAUTHORIZED === httpErrorResponse.status && this.router.url !== `/${AppRoute.LOGIN}`) {
      this.router.navigate([`/${AppRoute.LOGIN}`]);
    }

    if (!environment.production) {
      console.error(`Error ${httpErrorResponse.status} - ${httpErrorResponse.message}`, httpErrorResponse);
    }

    this.printMessages(httpErrorResponse);
  }

  private printMessages(httpErrorResponse: HttpErrorResponse): void {
    const error: any = httpErrorResponse.error;

    if (!error) {
      this.printGenericMessage();
      return;
    }

    if (this.isOAuth2Error(error)) {
      this.toastService.open(this.oauth2ErrorMessages.get(error['error']), 'Erro');
      return;
    }

    this.toastService.open(error, 'Erro');
  }

  private printGenericMessage(): void {
    this.toastService.open('Ocorreu um erro durante a solicitação', 'Erro');
  }

  private isOAuth2Error(error: any): boolean {
    return isObject(error)
      && Object.keys(error).includes('error')
      && Object.values(OAuth2Error).includes(error['error']);
  }
}
