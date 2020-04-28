import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { Route } from '@app/shared/enum/route.enum';
import { FormValidationService } from '@app/shared/service/form-validation.service';
import { ToastService } from '@app/shared/service/toast.service';
import { TitleService } from '@app/shared/service/title.service';
import { RecuperacaoSenhaForm } from '../shared/recuperacao-senha.form';
import { AtualizacaoSenhaForm } from '../shared/atualizacao-senha.form';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html'
})
export class RecuperacaoSenhaComponent implements OnInit {

  private _recuperacaoSenhaForm = new RecuperacaoSenhaForm();
  private _atualizacaoSenhaForm = new AtualizacaoSenhaForm();
  private _formSubmitted = false;
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
    this.titleService.setTitle(this.token ? 'Atualização de senha' : 'Recuperação de senha');
    this.formValidationService.customErrorsMessages = [
      { type: 'senhaConfirmada', message: 'As senhas não conferem' }
    ];
  }

  isModoAtualizacaoSenha(): boolean {
    return Boolean(this.token);
  }

  getErrorMessages(control: AbstractControl) {
    return this.formValidationService.getErrorMessages(control);
  }

  getLoginRouterLink(): string | any[] {
    return [`/${Route.LOGIN}`];
  }

  recuperarSenha(): void {
    this._formSubmitted = true;

    if (this._recuperacaoSenhaForm.invalid) {
      return;
    }

    this._loading = true;

    const email: string = this._recuperacaoSenhaForm.get('email').value;

    this.authService.recoverySenha(email).subscribe(
      () => this.toastService.addSuccess('', 'Um link para recuperação da senha foi enviado para o e-mail informado.'),
      () => this._loading = false,
      () => this.router.navigate([`/${Route.LOGIN}`])
    );
  }

  atualizarSenha(): void {
    this._formSubmitted = true;

    if (this._atualizacaoSenhaForm.invalid) {
      return;
    }

    this._loading = true;

    const senha: string = this._atualizacaoSenhaForm.get('senha').value;

    this.authService.updateSenha(this.token, senha).subscribe(
      () => this.toastService.addSuccess('', 'Senha atualizada com sucesso.'),
      () => this._loading = false,
      () => this.router.navigate([`/${Route.LOGIN}`])
    );
  }

  get recuperacaoSenhaForm(): RecuperacaoSenhaForm {
    return this._recuperacaoSenhaForm;
  }

  get atualizacaoSenhaForm(): AtualizacaoSenhaForm {
    return this._atualizacaoSenhaForm;
  }

  get formSubmitted(): boolean {
    return this._formSubmitted;
  }

  get loading(): boolean {
    return this._loading;
  }
}
