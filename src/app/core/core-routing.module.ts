import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/security/shared/auth.guard';
import { AppRoute } from '@app/shared/enum/app-route.enum';
import { PageException401Component } from './page-exception-401/page-exception-401.component';
import { PageException404Component } from './page-exception-404/page-exception-404.component';

const routes: Routes = [
  {
    path: AppRoute.ERRO_401,
    component: PageException401Component,
    canActivate: [AuthGuard]
  },
  {
    path: AppRoute.ERRO_404,
    component: PageException404Component,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
