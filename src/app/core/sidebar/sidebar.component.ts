import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { Subscription } from 'rxjs';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { AuthService } from '@app/security/shared/auth.service';
import { UsuarioListResponse } from '@app/administrativo/usuario/shared/usuario-list-response.model';
import { UsuarioService } from '@app/administrativo/usuario/shared/usuario.service';
import { MenuBuilder } from '../shared/menu-builder';
import { MenuItem } from '../shared/menu-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [MenuBuilder]
})
export class SidebarComponent implements OnInit, OnDestroy {

  private _menuItems: MenuItem[];
  private _today: Date;
  private _usuario: UsuarioListResponse;
  private clockTimer: any;
  private currentUrl = '';
  private routerEventsSubscription: Subscription;

  @Input() active = false;
  @Output() readonly itemClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private menuBuilder: MenuBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsuario();
    this.clockTimer = setInterval(() => this._today = new Date(), 1000);
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

  ngOnDestroy(): void {
    clearInterval(this.clockTimer);
  }

  initMenuItems(): void {
    this._menuItems = this.menuBuilder
      // Home
      .add({ label: 'Home', icon: 'home', routerLink: `/${AppRoute.HOME}` })
      // Administrativo
      .add({ label: 'Administrativo' })
        .add({ label: 'Grupos', routerLink: `/${AppRoute.ADMINISTRATIVO_GRUPOS}` }, 1)
        .add({ label: 'Usuários', routerLink: `/${AppRoute.ADMINISTRATIVO_USUARIOS}` }, 1)
      .getMenuItems();
  }

  onItemClick(): void {
    window.scrollTo(0, 0);
    this.itemClick.emit();
  }

  isExpandedMenu(route: string): boolean {
    return this.currentUrl.startsWith(route);
  }

  get loggedSince(): Date {
    return this.authService.getLoggedSince();
  }

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  get today(): Date {
    return this._today;
  }

  get usuario(): UsuarioListResponse {
    return this._usuario;
  }

  private loadUsuario(): void {
    this.usuarioService.findPerfil().subscribe(usuario => this._usuario = usuario);
  }
}
