import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { LoginComponent } from './login/login.component';
import { RecuperacaoSenhaComponent } from './recuperacao-senha/recuperacao-senha.component';

const routes: Routes = [
  {
    path: Route.LOGIN,
    component: LoginComponent
  },
  {
    path: Route.RECUPERACAO_SENHA,
    component: RecuperacaoSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
