import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, Route, Router, UrlSegment } from '@angular/router';

import { Route as RouteEnum } from '@app/shared/enum/route.enum';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    if (!this.authService.isValidAccessToken()) {
      this.router.navigate([`/${RouteEnum.LOGIN}`]);

      return false;
    }

    return true;
  }
}
