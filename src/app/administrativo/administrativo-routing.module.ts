import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/shared/auth.guard';
import { Route } from '@app/shared/enum/route.enum';
import { AdministrativoComponent } from './administrativo.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: Route.GRUPOS,
        loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule),
        canLoad: [AuthGuard]
      },
      {
        path: Route.USUARIOS,
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        canLoad: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
