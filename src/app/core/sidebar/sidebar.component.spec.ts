import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '@app/security/shared/auth.service';
import { SharedModule } from '@app/shared/shared.module';
import { UsuarioModule } from '@app/administrativo/usuario/usuario.module';
import { SidebarComponent } from './sidebar.component';
import { MenuBuilder } from '../shared/menu-builder';

class MockAuthService {
  getUsername(): string {
    return 'admin';
  }

  hasRole(role: string): boolean {
    const roles: string[] = ['GRUPO_LISTAR', 'GRUPO_CADASTRAR'];

    return roles.some(value => role === value);
  }
}

describe('Core: SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        UsuarioModule
      ],
      declarations: [SidebarComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        MenuBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component.itemClick, 'emit');
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o item de menu Grupo com dois itens', () => {
    expect(component.menuItems[1].label).toEqual('Administrativo');
    expect(component.menuItems[1].items.length).toBe(2);
  });
});
