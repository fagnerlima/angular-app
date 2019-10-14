import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckboxModule } from 'primeng/components/checkbox/checkbox';

import { SharedModule } from '@app/shared/shared.module';
import { TitleService } from '@app/shared/service/title.service';
import { AuthService } from '@app/security/auth.service';
import { LoginComponent } from './login.component';
import { Credenciais } from '../credenciais.model';

class MockAuthService {
  hasValidTokens(): boolean {
    return false;
  }

  login(credenciais: Credenciais): Promise<void> {
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
    const senha = component.form.get('senha');

    const credenciaisList = [
      { username: '', senha: '' },
      { username: 'meuusername', senha: '' },
      { username: '', senha: 'minhasenha' }
    ];
    credenciaisList.forEach(credenciais => {
      component.form.patchValue(credenciais);
      component.login();
    });

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('deve chamar o login', () => {
    component.form.patchValue({ username: 'meuusername', senha: 'minhasenha' });
    component.login();

    expect(authService.login).toHaveBeenCalled();
  });
});
