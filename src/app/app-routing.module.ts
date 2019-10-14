import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageException401Component } from './core/page-exception-401/page-exception-401.component';
import { PageException404Component } from './core/page-exception-404/page-exception-404.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'erro-401',
    component: PageException401Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'erro-404',
    component: PageException404Component,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'erro-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
