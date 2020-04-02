import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/shared/auth.guard';
import { Route } from '@app/shared/enum/route.enum';
import { PageException401Component } from './page-exception-401/page-exception-401.component';
import { PageException404Component } from './page-exception-404/page-exception-404.component';

const routes: Routes = [
  {
    path: Route.ERRO_401,
    component: PageException401Component,
    canActivate: [AuthGuard]
  },
  {
    path: Route.ERRO_404,
    component: PageException404Component,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
