import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

class MockAuthService {

  validAccessToken: boolean;

  isValidAccessToken(): boolean {
    return this.validAccessToken;
  }
}

describe('Security: AuthGuard', () => {
  let guard: AuthGuard;
  let activatedRoute: ActivatedRouteSnapshot;
  let authService: MockAuthService;
  let router: Router;
  let routerState: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
  });

  beforeEach(inject([AuthGuard], (authGuard: AuthGuard) => {
    guard = authGuard;
    activatedRoute = jasmine.createSpyObj<ActivatedRouteSnapshot>('ActivatedRouteSnapshot', ['toString']);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    routerState = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  }));

  beforeEach(() => {
    spyOn(router, 'navigate');
  });

  it('deve criar e injetar o guard', () => {
    expect(guard).toBeTruthy();
  });

  it('deve ativar uma rota se o usuário estiver autenticado', () => {
    authService.validAccessToken = true;

    expect(guard.canActivate(activatedRoute, routerState)).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('não deve ativar uma rota se o usuário não estiver autenticado', () => {
    authService.validAccessToken = false;

    expect(guard.canActivate(activatedRoute, routerState)).toBe(false);
    expect(router.navigate).toHaveBeenCalled();
  });
});
