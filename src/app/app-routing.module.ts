import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from './shared/enum/route.enum';
import { PageException401Component } from './core/page-exception-401/page-exception-401.component';
import { PageException404Component } from './core/page-exception-404/page-exception-404.component';
import { AuthGuard } from './security/shared/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: Route.HOME,
    pathMatch: 'full'
  },
  {
    path: Route.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Route.LOGIN,
    component: LoginComponent
  },
  {
    path: Route.ERRO_401,
    component: PageException401Component,
    canActivate: [AuthGuard]
  },
  {
    path: Route.ERRO_404,
    component: PageException404Component,
    canActivate: [AuthGuard]
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
