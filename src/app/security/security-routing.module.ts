import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { LoginComponent } from './login/login.component';
import { RecuperacaoSenhaComponent } from './recuperacao-senha/recuperacao-senha.component';
import { AtualizacaoSenhaComponent } from './atualizacao-senha/atualizacao-senha.component';

const routes: Routes = [
  {
    path: AppRoute.LOGIN,
    component: LoginComponent
  },
  {
    path: AppRoute.RECUPERACAO_SENHA,
    component: RecuperacaoSenhaComponent
  },
  {
    path: AppRoute.ATUALIZACAO_SENHA,
    component: AtualizacaoSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
