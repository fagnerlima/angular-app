import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/shared/auth.guard';
import { AuthorityGuard } from '@app/security/shared/authority.guard';
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
            canActivate: [AuthorityGuard],
            data: { expectedAuthority: 'USUARIO_LISTAR' }
          },
          {
            path: 'novo',
            component: UsuarioRegistrationComponent,
            canActivate: [AuthorityGuard],
            data: { expectedAuthority: 'USUARIO_CADASTRAR' }
          },
          {
            path: ':id',
            component: UsuarioRegistrationComponent,
            canActivate: [AuthorityGuard],
            data: { expectedAuthority: 'GRUPO_CADASTRAR' }
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
