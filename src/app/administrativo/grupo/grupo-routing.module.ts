import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { Authority } from '@app/security/shared/authority.enum';
import { AuthGuard } from '@app/security/shared/auth.guard';
import { AuthorityGuard } from '@app/security/shared/authority.guard';
import { GrupoComponent } from './grupo.component';
import { GrupoListingComponent } from './grupo-listing/grupo-listing.component';
import { GrupoRegistrationComponent } from './grupo-registration/grupo-registration.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GrupoListingComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: Authority.ROLE_GRUPO_LISTAR }
      },
      {
        path: AppRoute.GENERICO_CADASTRAR,
        component: GrupoRegistrationComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: Authority.ROLE_GRUPO_SALVAR }
      },
      {
        path: AppRoute.GENERICO_EDITAR,
        component: GrupoRegistrationComponent,
        canActivate: [AuthorityGuard],
        data: { expectedAuthority: Authority.ROLE_GRUPO_EDITAR }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
