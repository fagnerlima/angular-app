import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

import { SharedModule } from '@app/shared/shared.module';
import { TitleService } from '@app/shared/service/title.service';
import { AuthService } from '@app/security/shared/auth.service';
import { LoginComponent } from './login.component';
import { Credencials } from '../shared/credentials.model';

class MockAuthService {
  isValidAccessToken(): boolean {
    return false;
  }

  login(credencials: Credencials): Promise<void> {
    return Promise.resolve();
  }
}

describe('Security: LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CheckboxModule,
        SharedModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        TitleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
  });

  beforeEach(() => {
    spyOn(authService, 'login');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve impedir o login pelo não preenchimento dos campos Usuário e Senha', () => {
    const username = component.form.get('username');
    const password = component.form.get('password');

    const credencialsList = [
      { username: '', password: '' },
      { username: 'meuusername', password: '' },
      { username: '', password: 'minhasenha' }
    ];
    credencialsList.forEach(credencials => {
      component.form.patchValue(credencials);
      component.login();
    });

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('deve chamar o login', () => {
    component.form.patchValue({ username: 'meuusername', password: 'minhasenha' });
    component.login();

    expect(authService.login).toHaveBeenCalled();
  });
});
