import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/shared/auth.guard';
import { AuthorityGuard } from '@app/security/shared/authority.guard';
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
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: 'GRUPO_LISTAR' }
      },
      {
        path: 'novo',
        component: GrupoRegistrationComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: 'GRUPO_CADASTRAR' }
      }
      ,
      {
        path: ':id',
        component: GrupoRegistrationComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: 'GRUPO_CADASTRAR' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
