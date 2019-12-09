import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { Authority } from './shared/authority.enum';

@Injectable()
export class AuthorityGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedAuthority = route.data.expectedAuthority;

    if (!this.authService.hasAnyAuthority([expectedAuthority, Authority.ROLE_ADMIN])) {
      this.router.navigate(['erro-401']);

      return false;
    }

    return true;
  }
}
