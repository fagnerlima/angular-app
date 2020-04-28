import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '@app/shared/enum/route.enum';
import { LoginComponent } from './login/login.component';
import { RecuperacaoSenhaComponent } from './recuperacao-senha/recuperacao-senha.component';
import { AtualizacaoSenhaComponent } from './atualizacao-senha/atualizacao-senha.component';

const routes: Routes = [
  {
    path: Route.LOGIN,
    component: LoginComponent
  },
  {
    path: Route.RECUPERACAO_SENHA,
    component: RecuperacaoSenhaComponent
  },
  {
    path: Route.ATUALIZACAO_SENHA,
    component: AtualizacaoSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
