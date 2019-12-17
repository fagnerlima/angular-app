import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { AuthGuard } from '@app/security/shared/auth.guard';
import { Authority } from '@app/security/shared/authority.enum';
import { AuthorityGuard } from '@app/security/shared/authority.guard';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioListingComponent } from './usuario-listing/usuario-listing.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRegistrationComponent } from './usuario-registration/usuario-registration.component';

const routes: Routes = [
  {
    path: Route.ADMINISTRATIVO_PERFIL,
    component: UsuarioPerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Route.ADMINISTRATIVO_USUARIOS,
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsuarioListingComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: Authority.ROLE_USUARIO_LISTAR }
      },
      {
        path: Route.GENERICO_CADASTRO,
        component: UsuarioRegistrationComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: Authority.ROLE_USUARIO_SALVAR }
      },
      {
        path: Route.GENERICO_EDICAO,
        component: UsuarioRegistrationComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: Authority.ROLE_USUARIO_EDITAR }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
