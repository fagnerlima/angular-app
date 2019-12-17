import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { isString, isNullOrUndefined } from 'util';

import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@env/environment';
import { Route } from '@app/shared/enum/route.enum';
import { StorageService } from '@app/shared/service/storage.service';
import { Authority } from './authority.enum';
import { Credencials } from './credentials.model';
import { OAuth2HttpResponse } from './oauth2-http-response';

@Injectable()
export class AuthService {

  private readonly authorizeUrl = environment.apiAuthUrl + '/oauth/token';
  private readonly usuariosUrl = environment.apiAuthUrl + '/usuarios';

  private jwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) { }

  async login(credencials: Credencials, remember = false): Promise<void> {
    const headers = this.getHeadersOAuthToken();
    const body = new URLSearchParams();

    body.set('grant_type', 'password');
    body.set('username', credencials.username);
    body.set('password', credencials.password);

    return this.httpClient.post<OAuth2HttpResponse>(this.authorizeUrl, body.toString(), { headers }).toPromise()
      .then(response => {
        this.selectStorage(remember);
        this.putData(response);
        this.router.navigate([`/${Route.HOME}`]);
        Promise.resolve();
      })
      .catch((error: any) => {});
  }

  async refreshToken(): Promise<void> {
    const headers = this.getHeadersOAuthToken();
    const body = new URLSearchParams();

    body.set('grant_type', 'refresh_token');

    return this.httpClient.post<OAuth2HttpResponse>(this.authorizeUrl, body.toString(), { headers }).toPromise()
      .then(response => {
        this.putData(response);
        Promise.resolve();
      })
      .catch((error: any) => this.logout());
  }

  recoverySenha(email: string): Observable<any> {
    return this.httpClient.patch(`${this.usuariosUrl}/recuperar-senha`, { email });
  }

  updateSenha(token: string, senha: string): Observable<any> {
    return this.httpClient.patch(`${this.usuariosUrl}/atualizar-senha`, { token, senha });
  }

  logout(): void {
    this.removeData();
    this.router.navigate([`/${Route.LOGIN}`]);
  }

  getAccessToken(): string {
    return this.storageService.getItem('access_token');
  }

  getName(): string {
    return this.storageService.getItem('name');
  }

  getUsername(): string {
    return this.storageService.getItem('username');
  }

  getAuthorities(): string[] {
    return this.storageService.getArray('authorities');
  }

  isValidAccessToken(): boolean {
    return !isNullOrUndefined(this.getAccessToken()) && !this.jwtHelperService.isTokenExpired(this.getAccessToken());
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (isString(authorities)) {
      return this.getAuthorities().includes(authorities as string);
    }

    for (const authority of (authorities as string[])) {
      if (this.getAuthorities().includes(authority)) {
        return true;
      }
    }

    return false;
  }

  hasAnyAuthorityOrAdmin(authorities: string[] | string): boolean {
    if (this.getAuthorities().includes(Authority.ROLE_ADMIN)) {
      return true;
    }

    return this.hasAnyAuthority(authorities);
  }

  private getHeadersOAuthToken(): HttpHeaders {
    return new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', environment.oauth2.headers.authorization);
  }

  private selectStorage(remember: boolean) {
    localStorage.setItem('remember', String(remember));

    if (remember) {
      this.storageService.selectLocalStorage();
    } else {
      this.storageService.selectSessionStorage();
    }
  }

  private putData(oauth2Response: OAuth2HttpResponse): void {
    this.storageService.setItem('access_token', oauth2Response.access_token);

    const payload = this.jwtHelperService.decodeToken(oauth2Response.access_token);
    this.storageService.setItem('name', payload['name']);
    this.storageService.setItem('username', payload['user_name']);
    this.storageService.setArray('authorities', payload['authorities']);
  }

  private removeData(): void {
    this.storageService.clear();
  }
}
