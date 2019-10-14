import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { from , Observable } from 'rxjs';
import { tap, map,  mergeMap } from 'rxjs/operators';

import { ErrorHandlerService } from '@app/core/shared/error-handler.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);

    if (this.authService.isValidAccessToken()) {
      return this.doRequestWithAuthentication(request, next);
    }

    if (this.authService.isValidRefreshToken() && !this.isRefreshTokenRequest(request)) {
      return from(this.authService.refreshToken()).pipe(map(response => response))
        .pipe(mergeMap((response: any) => this.doRequestWithAuthentication(request, next)));
    }

    return this.doRequest(request, next);
  }

  private doRequestWithAuthentication(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      }
    });

    return this.doRequest(request, next);
  }

  private doRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {},
      (error: HttpErrorResponse) => this.errorHandlerService.handleHttpErrorResponse(error)
    ));
  }

  private isRefreshTokenRequest(request: HttpRequest<any>): boolean {
    return request.body && request.body.toString().includes('grant_type=refresh_token');
  }
}
