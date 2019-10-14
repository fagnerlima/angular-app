import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TitleService } from '@app/shared/service/title.service';
import { AuthService } from '../shared/auth.service';
import { CredenciaisForm } from '../shared/credenciais.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private _form = new CredenciaisForm();
  private _formSubmitted = false;
  private _loading = false;

  constructor(
    private authService: AuthService,
    private titleService: TitleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login');

    if (this.authService.hasValidTokens()) {
      this.router.navigate(['home']);
    }
  }

  get form(): CredenciaisForm {
    return this._form;
  }

  get formSubmitted(): boolean {
    return this._formSubmitted;
  }

  get loading(): boolean {
    return this._loading;
  }

  async login(): Promise<void> {
    this._loading = true;
    this._formSubmitted = true;

    if (this._form.valid) {
      await this.authService.login(this._form.toModel(), this._form.get('lembrarAcesso').value);
    }

    this._loading = false;
    this.limparSenha();
  }

  private limparSenha(): void {
    this._form.get('senha').setValue(null);
  }
}
