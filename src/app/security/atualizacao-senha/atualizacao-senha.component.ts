import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { FormValidationService } from '@app/shared/service/form-validation.service';
import { ToastService } from '@app/shared/service/toast.service';
import { TitleService } from '@app/shared/service/title.service';
import { AtualizacaoSenhaForm } from '../shared/atualizacao-senha.form';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-atualizacao-senha',
  templateUrl: './atualizacao-senha.component.html'
})
export class AtualizacaoSenhaComponent implements OnInit {

  private _form = new AtualizacaoSenhaForm();
  private _loading = false;
  private token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private toastService: ToastService,
    private formValidationService: FormValidationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
    this.titleService.setTitle('Atualização de senha');
    this.formValidationService.customErrorsMessages = [
      { type: 'senhaConfirmada', message: 'As senhas não conferem' }
    ];
  }

  getErrorMessages(control: AbstractControl) {
    return this.formValidationService.getErrorMessages(control);
  }

  getLoginRouterLink(): string | any[] {
    return [`/${AppRoute.LOGIN}`];
  }

  atualizarSenha(): void {
    if (this._form.invalid) {
      return;
    }

    this._loading = true;

    const senha: string = this._form.get('senha').value;

    this.authService.updateSenha(this.token, senha).subscribe(
      () => this.toastService.open('Senha atualizada com sucesso.'),
      () => {
        this._loading = false;
        this._form.reset();
      },
      () => this.router.navigate([`/${AppRoute.LOGIN}`])
    );
  }

  get form(): AtualizacaoSenhaForm {
    return this._form;
  }

  get loading(): boolean {
    return this._loading;
  }
}
