import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from './shared/enum/route.enum';
import { AuthGuard } from './security/shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: Route.LOGIN, /** @todo checar viabilidade */
    pathMatch: 'full'
  },
  {
    path: Route.HOME,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard] /** @todo checar canActivateChild */
  },
  {
    path: '**',
    redirectTo: Route.ERRO_404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
