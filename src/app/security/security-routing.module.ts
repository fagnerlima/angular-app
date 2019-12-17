import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: Route.LOGIN,
    component:  LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
