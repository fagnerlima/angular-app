import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuItem } from 'primeng/api';

import { AuthService } from '@app/security/shared/auth.service';
import { SecurityModule } from '@app/security/security.module';
import { CoreModule } from '../core.module';
import { MenuBuilder } from './menu-builder';

@Injectable()
class MockAuthService extends AuthService {
  hasAnyAuthorityOrAdmin(authority: string): boolean {
    return ['ROLE_ADMIN', 'ROLE_COMUM'].includes(authority);
  }
}

describe('Core: MenuBuilder', () => {
  let builder: MenuBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SecurityModule,
        CoreModule
      ],
      providers: [
        MenuBuilder,
        { provide: AuthService, useClass: MockAuthService }
      ]
    });

    builder = TestBed.inject(MenuBuilder);
  });

  it('deve criar uma instância do builder', () => {
    expect(builder).toBeTruthy();
  });

  it('deve criar um menu', () => {
    const menuItems = builder
      .add({ label: 'Menu 0', routerLink: ['/'] })
      .getMenuItems();

    expect(menuItems.length).toBe(1);
  });

  it('deve criar um menu com dois submenus', () => {
    const menuItems = builder
      .add({ label: 'Menu 0' })
        .add({ label: 'Submenu 0.0', routerLink: ['/'] }, 1)
        .add({ label: 'Submenu 0.1', routerLink: ['/'] }, 1)
      .getMenuItems();

    expect(menuItems.length).toBe(1);
    expect(menuItems[0].items.length).toBe(2);
  });

  it('deve criar dois menus com dois submenus de nível 1 cada e um submenu de nível 2', () => {
    const menuItems = builder
      .add({ label: 'Menu 0' })
        .add({ label: 'Submenu 0.0'}, 1)
        .add({ label: 'Submenu 0.1'}, 1)
          .add({ label: 'Submenu 0.1.0' }, 2)
      .add({ label: 'Menu 1' })
        .add({ label: 'Submenu 1.0'}, 1)
        .add({ label: 'Submenu 1.1'}, 1)
      .getMenuItems();

    expect(menuItems.length).toBe(2);

    expect(menuItems[0].label).toBe('Menu 0');
    expect(menuItems[0].items.length).toBe(2);
    expect((menuItems[0].items as MenuItem[])[0].label).toBe('Submenu 0.0');
    expect((menuItems[0].items as MenuItem[])[1].label).toBe('Submenu 0.1');

    expect((menuItems[0].items as MenuItem[])[1].items.length).toBe(1);
    expect(((menuItems[0].items as MenuItem[])[1].items as MenuItem[])[0].label).toBe('Submenu 0.1.0');

    expect(menuItems[1].label).toBe('Menu 1');
    expect(menuItems[1].items.length).toBe(2);
    expect((menuItems[1].items as MenuItem[])[0].label).toBe('Submenu 1.0');
    expect((menuItems[1].items as MenuItem[])[1].label).toBe('Submenu 1.1');
  });

  it('não deve criar menus', () => {
    const menuItems = builder
      .add({ label: 'Menu 0' })
        .addMenuIfHasAnyAuthority({ label: 'Submenu 0.0', routerLink: ['/'] }, 'ROLE_CADASTRAR', 1)
        .addMenuIfHasAnyAuthority({ label: 'Submenu 0.1', routerLink: ['/'] }, 'ROLE_CADASTRAR', 1)
      .getMenuItems();

    expect(menuItems.length).toBe(0);
  });

  it('deve criar dois menus, sendo o primeiro com dois submenus', () => {
    const menuItems = builder
      .add({ label: 'Menu 0' })
        .addMenuIfHasAnyAuthority({ label: 'Submenu 0.0', routerLink: ['/'] }, 'ROLE_COMUM', 1)
        .addMenuIfHasAnyAuthority({ label: 'Submenu 0.1', routerLink: ['/'] }, 'ROLE_ADMIN', 1)
      .add({ label: 'Menu 1', routerLink: ['/'] })
      .getMenuItems();

    expect(menuItems.length).toBe(2);
    expect(menuItems[0].items.length).toBe(2);
    expect(menuItems[1].items).toBeUndefined();
  });
});
