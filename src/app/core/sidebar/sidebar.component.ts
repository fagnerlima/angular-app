import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { Subscription } from 'rxjs';

import { MenuItem } from 'primeng/components/common/menuitem';

import { UsuarioListResponse } from '@app/administrativo/usuario/shared/usuario-list-response.model';
import { UsuarioService } from '@app/administrativo/usuario/shared/usuario.service';
import { MenuBuilder } from '../shared/menu-builder';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [MenuBuilder]
})
export class SidebarComponent implements OnInit {

  private _menuItems: MenuItem[];
  private _usuario: UsuarioListResponse;
  private currentUrl = '';
  private routerEventsSubscription: Subscription;

  @Input() active = false;
  @Output() readonly itemClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private menuBuilder: MenuBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.loadUsuario();
    this.initMenuItems();
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.currentUrl = event.urlAfterRedirects;
        this.menuBuilder.clear();
        this.initMenuItems();
        this.routerEventsSubscription.unsubscribe();
      }
    });
  }

  initMenuItems(): void {
    this._menuItems = this.menuBuilder
      // Home
      .addMenu(this.menu('Home', 'fa fa-home', 'menu-dashboard', ['/home']))
      // Administrativo
      .addMenu(this.expandedMenu('Administrativo', 'menu-administrativo', this.isExpandedMenu('/administrativo')))
        .addMenu(this.expandedMenu('Grupo', 'submenu-grupo', this.isExpandedMenu('/administrativo/grupos')), 1)
          .addMenu(this.listingMenu(['/administrativo/grupos']), 2)
          .addMenu(this.registrationMenu(['/administrativo/grupos/novo']), 2)
        .addMenu(this.expandedMenu('Usuário', 'submenu-usuario', this.isExpandedMenu('/administrativo/usuarios')), 1)
          .addMenu(this.listingMenu(['/administrativo/usuarios']), 2)
          .addMenu(this.registrationMenu(['/administrativo/usuarios/novo']), 2)
      .getMenuItems();
  }

  onItemClick(): void {
    window.scrollTo(0, 0);
    this.itemClick.emit();
  }

  isExpandedMenu(route: string): boolean {
    return this.currentUrl.startsWith(route);
  }

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  get usuario(): UsuarioListResponse {
    return this._usuario;
  }

  private loadUsuario(): void {
    this.usuarioService.findPerfil().subscribe(usuario => this._usuario = usuario);
  }

  private menu(label: string, icon: string, styleClass: string, routerLink: any): MenuItem {
    return {
      label,
      icon,
      styleClass,
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  private expandedMenu(label: string, styleClass: string, expanded: boolean): MenuItem {
    return {
      label,
      styleClass,
      expanded
    };
  }

  private listingMenu(routerLink: any): MenuItem {
    return {
      label: 'Listagem',
      icon: 'fa fa-table',
      styleClass: 'submenu-listagem',
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }

  private registrationMenu(routerLink: any): MenuItem {
    return {
      label: 'Cadastro',
      icon: 'fa fa-plus',
      styleClass: 'submenu-cadastro',
      routerLink,
      routerLinkActiveOptions: { exact: true },
      command: () => this.onItemClick()
    };
  }
}
