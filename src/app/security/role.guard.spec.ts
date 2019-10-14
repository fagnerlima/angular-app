import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { RoleGuard } from './role.guard';
import { AuthService } from './shared/auth.service';

class MockAuthService {
  hasRole(role: string): boolean {
    return 'ROLE_ADMIN' === role;
  }
}

describe('Security: RoleGuard', () => {
  let guard: RoleGuard;

  let activatedRoute: ActivatedRouteSnapshot;
  let router: Router;
  let routerState: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
  });

  beforeEach(inject([RoleGuard], (roleGuard: RoleGuard) => {
    guard = roleGuard;

    activatedRoute = jasmine.createSpyObj<ActivatedRouteSnapshot>('ActivatedRouteSnapshot', ['toString']);
    routerState = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    spyOn(router, 'navigate');
  });

  it('deve criar e injetar o guard', () => {
    expect(guard).toBeTruthy();
  });

  it('deve ativar uma rota se o usuário tiver uma permissão específica', () => {
    activatedRoute.data = { expectedRole: 'ROLE_ADMIN' };

    expect(guard.canActivate(activatedRoute, routerState)).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('não deve ativar uma rota se o usuário não tiver uma permissão específica', () => {
    activatedRoute.data = { expectedRole: 'ROLE_COMUM' };

    expect(guard.canActivate(activatedRoute, routerState)).toBe(false);
    expect(router.navigate).toHaveBeenCalled();
  });
});
