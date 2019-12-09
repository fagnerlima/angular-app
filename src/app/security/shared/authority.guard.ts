import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorityGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedAuthority = route.data.expectedAuthority;

    if (!this.authService.hasAnyAuthorityOrAdmin(expectedAuthority)) {
      this.router.navigate([`/${Route.ERRO_401}`]);

      return false;
    }

    return true;
  }
}
