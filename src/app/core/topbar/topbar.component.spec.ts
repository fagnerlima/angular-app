import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuModule } from 'primeng/components/menu/menu';

import { AuthService } from '@app/security/auth.service';
import { TopbarComponent } from './topbar.component';

class MockAuthService {
  logout(): void { }
}

describe('Core: TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MenuModule
      ],
      declarations: [TopbarComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
  });

  beforeEach(() => {
    spyOn(component.toggleMenu, 'emit');
    spyOn(authService, 'logout');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o item de menu Perfil de Usuário', () => {
    expect(component.menuItemsUsuario[0].label).toEqual('Perfil de Usuário');
  });

  it('deve criar o item de menu Logout', () => {
    expect(component.menuItemsUsuario[component.menuItemsUsuario.length - 1].label).toEqual('Logout');
  });

  it('deve emitir o evento toggleMenu', () => {
    component.onToggleMenu();

    expect(component.toggleMenu.emit).toHaveBeenCalled();
  });

  it('deve chamar o logout no comando do item de menu Logout', () => {
    component.menuItemsUsuario[component.menuItemsUsuario.length - 1].command();

    expect(authService.logout).toHaveBeenCalled();
  });
});