import { isNullOrUndefined } from '@app/shared/util/utils';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, Route, Router, UrlSegment } from '@angular/router';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.checkLogin()) {
      return false;
    }

    return this.checkAuthority(route);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    if (!this.authService.isValidAccessToken()) {
      this.router.navigate([`/${AppRoute.LOGIN}`]);

      return false;
    }

    return true;
  }

  private checkAuthority(route: ActivatedRouteSnapshot): boolean {
    const expectedAuthorities = route.data.expectedAuthorities;

    if (isNullOrUndefined(expectedAuthorities) || this.authService.hasAnyAuthorityOrAdmin(expectedAuthorities)) {
      return true;
    }

    this.router.navigate([`/${AppRoute.ERRO_401}`]);

    return false;
  }
}
