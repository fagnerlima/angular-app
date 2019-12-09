import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthorityGuard } from './authority.guard';
import { AuthService } from './auth.service';

class MockAuthService {
  hasAnyAuthority(authorities: string[] | string): boolean {
    return 'ROLE_ADMIN' === authorities;
  }
}

describe('Security: AuthorityGuard', () => {
  let guard: AuthorityGuard;

  let activatedRoute: ActivatedRouteSnapshot;
  let router: Router;
  let routerState: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthorityGuard,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
  });

  beforeEach(inject([AuthorityGuard], (authorityGuard: AuthorityGuard) => {
    guard = authorityGuard;

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
    activatedRoute.data = { expectedAuthority: 'ROLE_ADMIN' };

    expect(guard.canActivate(activatedRoute, routerState)).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('não deve ativar uma rota se o usuário não tiver uma permissão específica', () => {
    activatedRoute.data = { expectedAuthority: 'ROLE_COMUM' };

    expect(guard.canActivate(activatedRoute, routerState)).toBe(false);
    expect(router.navigate).toHaveBeenCalled();
  });
});
