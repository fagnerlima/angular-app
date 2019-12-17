import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { AdministrativoComponent } from './administrativo.component';

const routes: Routes = [
  {
    path: Route.ADMINISTRATIVO,
    component: AdministrativoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
