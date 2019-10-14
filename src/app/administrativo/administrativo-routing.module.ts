import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativoComponent } from './administrativo.component';

const routes: Routes = [
  {
    path: 'administrativo',
    component:  AdministrativoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
