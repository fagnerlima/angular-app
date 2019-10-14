import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './shared/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!this.authService.hasRole(expectedRole)) {
      this.router.navigate(['erro-401']);

      return false;
    }

    return true;
  }
}
