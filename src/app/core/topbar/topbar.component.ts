import { Component, Output, EventEmitter } from '@angular/core';

import { MenuItem } from 'primeng/components/common/menuitem';

import { AuthService } from '@app/security/shared/auth.service';
import { applicationName } from '@app/shared/service/title.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  private _menuItemsUsuario: MenuItem[];

  @Output() readonly toggleMenu = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    this.initMenuUsuario();
  }

  get menuItemsUsuario(): MenuItem[] {
    return this._menuItemsUsuario;
  }

  get applicationName(): string {
    return applicationName;
  }

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  logout(): void {
    this.authService.logout();
  }

  private initMenuUsuario(): void {
    this._menuItemsUsuario = [
      {
        label: 'Perfil de Usuário',
        icon: 'fa fa-user-o',
        routerLink: ['/administrativo/usuarios/perfil']
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'fa fa-sign-out',
        command: () => this.logout()
      }
    ];
  }
}
