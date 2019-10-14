import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/auth.guard';
import { RoleGuard } from '@app/security/role.guard';
import { GrupoComponent } from './grupo.component';
import { GrupoListingComponent } from './grupo-listing/grupo-listing.component';
import { GrupoRegistrationComponent } from './grupo-registration/grupo-registration.component';

const routes: Routes = [
  {
    path: 'administrativo/grupos',
    component: GrupoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GrupoListingComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'GRUPO_LISTAR' }
      },
      {
        path: 'novo',
        component: GrupoRegistrationComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'GRUPO_CADASTRAR' }
      }
      ,
      {
        path: ':id',
        component: GrupoRegistrationComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'GRUPO_CADASTRAR' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
