import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/auth.guard';
import { RoleGuard } from '@app/security/role.guard';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioListingComponent } from './usuario-listing/usuario-listing.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRegistrationComponent } from './usuario-registration/usuario-registration.component';
import { RecuperacaoSenhaComponent } from './recuperacao-senha/recuperacao-senha.component';

const routes: Routes = [
  {
    path: 'administrativo',
    children: [
      {
        path: 'recuperacao-senha',
        component: RecuperacaoSenhaComponent
      },
      {
        path: 'perfil',
        component: UsuarioPerfilComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: UsuarioListingComponent,
            canActivate: [RoleGuard],
            data: { expectedRole: 'USUARIO_LISTAR' }
          },
          {
            path: 'novo',
            component: UsuarioRegistrationComponent,
            canActivate: [RoleGuard],
            data: { expectedRole: 'USUARIO_CADASTRAR' }
          },
          {
            path: ':id',
            component: UsuarioRegistrationComponent,
            canActivate: [RoleGuard],
            data: { expectedRole: 'GRUPO_CADASTRAR' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
