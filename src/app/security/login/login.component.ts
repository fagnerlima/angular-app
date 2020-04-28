import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { AppRoute } from '@app/shared/enum/app-route.enum';
import { FormValidationService } from '@app/shared/service/form-validation.service';
import { TitleService } from '@app/shared/service/title.service';
import { AuthService } from '../shared/auth.service';
import { CredencialsForm } from '../shared/credencials.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private _form = new CredencialsForm();
  private _loading = false;

  constructor(
    private authService: AuthService,
    private formValidationService: FormValidationService,
    private titleService: TitleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login');

    if (this.authService.isValidAccessToken()) {
      this.router.navigate([`/${AppRoute.HOME}`]);
    }
  }

  getErrorMessages(control: AbstractControl) {
    return this.formValidationService.getErrorMessages(control);
  }

  getRecuperacaoSenhaRouterLink(): string | any[] {
    return [`/${AppRoute.RECUPERACAO_SENHA}`];
  }

  get form(): CredencialsForm {
    return this._form;
  }

  get loading(): boolean {
    return this._loading;
  }

  async login(): Promise<void> {
    this._loading = true;

    if (this._form.valid) {
      await this.authService.login(this._form.toModel(), this._form.get('remember').value);
    }

    this._loading = false;
    this.clearPassword();
  }

  private clearPassword(): void {
    this._form.get('password').setValue(null);
  }
}
