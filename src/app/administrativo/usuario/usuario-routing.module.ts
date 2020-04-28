import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { AuthGuard } from '@app/security/shared/auth.guard';
import { Authority } from '@app/security/shared/authority.enum';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioListingComponent } from './usuario-listing/usuario-listing.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRegistrationComponent } from './usuario-registration/usuario-registration.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsuarioListingComponent,
        canActivate: [AuthGuard],
        data: { expectedAuthorities: Authority.ROLE_USUARIO_LISTAR }
      },
      {
        path: AppRoute.PERFIL,
        component: UsuarioPerfilComponent,
        canActivate: [AuthGuard]
      },
      {
        path: AppRoute.GENERICO_CADASTRAR,
        component: UsuarioRegistrationComponent,
        canActivate: [AuthGuard],
        data: { expectedAuthorities: Authority.ROLE_USUARIO_SALVAR }
      },
      {
        path: AppRoute.GENERICO_EDITAR,
        component: UsuarioRegistrationComponent,
        canActivate: [AuthGuard],
        data: { expectedAuthorities: Authority.ROLE_USUARIO_EDITAR }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
