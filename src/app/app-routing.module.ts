import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from './shared/enum/route.enum';
import { AuthGuard } from './security/shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: Route.HOME,
    pathMatch: 'full'
  },
  {
    path: Route.HOME,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
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
