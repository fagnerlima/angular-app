import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { Route } from '@app/shared/enum/route.enum';
import { FormValidationService } from '@app/shared/service/form-validation.service';
import { ToastService } from '@app/shared/service/toast.service';
import { TitleService } from '@app/shared/service/title.service';
import { RecuperacaoSenhaForm } from '../shared/recuperacao-senha.form';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html'
})
export class RecuperacaoSenhaComponent implements OnInit {

  private _form = new RecuperacaoSenhaForm();
  private _loading = false;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private toastService: ToastService,
    private formValidationService: FormValidationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Recuperação de senha');
  }

  getErrorMessages(control: AbstractControl) {
    return this.formValidationService.getErrorMessages(control);
  }

  getLoginRouterLink(): string | any[] {
    return [`/${Route.LOGIN}`];
  }

  recuperarSenha(): void {
    if (this._form.invalid) {
      return;
    }

    this._loading = true;

    const email: string = this._form.get('email').value;

    this.authService.recoverySenha(email).subscribe(
      () => this.toastService.open('Um link para recuperação da senha foi enviado para o e-mail informado.'),
      () => {
        this._loading = false;
        this._form.reset();
      },
      () => this.router.navigate([`/${Route.LOGIN}`])
    );
  }

  get form(): RecuperacaoSenhaForm {
    return this._form;
  }

  get loading(): boolean {
    return this._loading;
  }
}
