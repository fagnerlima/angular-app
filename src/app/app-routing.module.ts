import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoute } from './shared/enum/app-route.enum';
import { AuthGuard } from './security/shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoute.HOME,
    pathMatch: 'full'
  },
  {
    path: AppRoute.HOME,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: AppRoute.ADMINISTRATIVO,
    loadChildren: () => import('./administrativo/administrativo.module').then(m => m.AdministrativoModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: AppRoute.ERRO_404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
