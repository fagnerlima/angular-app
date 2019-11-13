import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { isString } from 'util';

import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from '@app/shared/service/storage.service';
import { environment } from '@env/environment';
import { Credencials } from './credentials.model';
import { OAuth2HttpResponse } from './oauth2-http-response';

@Injectable()
export class AuthService {

  readonly authorizeUrl = environment.apiAuthUrl + '/oauth/token';

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
        this.router.navigate(['/home']);
        Promise.resolve();
      })
      .catch((error: any) => {});
  }

  async refreshToken(): Promise<void> {
    const headers = this.getHeadersOAuthToken();
    const body = new URLSearchParams();

    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', this.getRefreshToken());

    return this.httpClient.post<OAuth2HttpResponse>(this.authorizeUrl, body.toString(), { headers }).toPromise()
      .then(response => {
        this.putData(response);
        Promise.resolve();
      })
      .catch((error: any) => this.logout());
  }

  logout(): void {
    this.removeData();
    this.router.navigate(['/login']);
  }

  getAccessToken(): string {
    return this.storageService.getItem('access_token');
  }

  getRefreshToken(): string {
    return this.storageService.getItem('refresh_token');
  }

  getName(): string {
    return this.storageService.getItem('name');
  }

  getUsername(): string {
    return this.storageService.getItem('username');
  }

  getRoles(): string[] {
    return this.storageService.getArray('roles');
  }

  isValidAccessToken(): boolean {
    return this.getAccessToken() && !this.jwtHelperService.isTokenExpired(this.getAccessToken());
  }

  isValidRefreshToken(): boolean {
    return this.getRefreshToken() && !this.jwtHelperService.isTokenExpired(this.getRefreshToken());
  }

  hasValidTokens(): boolean {
    return this.isValidAccessToken() || this.isValidRefreshToken();
  }

  hasRole(roles: string[] | string): boolean {
    if (isString(roles)) {
      return this.getRoles().includes(`ROLE_${roles}`);
    }

    for (const role of roles) {
      if (this.getRoles().includes(`ROLE_${role}`)) {
        return true;
      }
    }

    return false;
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
    this.storageService.setItem('refresh_token', oauth2Response.refresh_token);

    const payload = this.jwtHelperService.decodeToken(oauth2Response.access_token);
    this.storageService.setItem('name', payload['name']);
    this.storageService.setItem('username', payload['user_name']);
    this.storageService.setArray('roles', payload['authorities']);
  }

  private removeData(): void {
    this.storageService.clear();
  }
}
