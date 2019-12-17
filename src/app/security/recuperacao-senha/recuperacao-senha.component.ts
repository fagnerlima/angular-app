import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '@app/administrativo/usuario/shared/usuario.service';
import { Route } from '@app/shared/enum/route.enum';
import { ToastService } from '@app/shared/service/toast.service';
import { TitleService } from '@app/shared/service/title.service';
import { RecuperacaoSenhaForm } from '../shared/recuperacao-senha.form';
import { AtualizacaoSenhaForm } from '../shared/atualizacao-senha.form';

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html'
})
export class RecuperacaoSenhaComponent implements OnInit {

  private _form: RecuperacaoSenhaForm | AtualizacaoSenhaForm;
  private _formSubmitted = false;
  private _loading = false;
  private token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private toastService: ToastService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
    this._form = this.token ? new AtualizacaoSenhaForm() : new RecuperacaoSenhaForm();
    this.titleService.setTitle(this.token ? 'Atualização de senha' : 'Recuperação de senha');
  }

  get form(): RecuperacaoSenhaForm | AtualizacaoSenhaForm {
    return this._form;
  }

  get formSubmitted(): boolean {
    return this._formSubmitted;
  }

  get loading(): boolean {
    return this._loading;
  }

  isModoAtualizacaoSenha(): boolean {
    return Boolean(this.token);
  }

  recuperarSenha(): void {
    this._formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    this._loading = true;

    const email: string = this._form.get('email').value;

    this.usuarioService.recoverySenha(email).subscribe(
      () => this.toastService.addSuccess('', 'Um link para recuperação da senha foi enviado para o e-mail informado.'),
      () => this._loading = false,
      () => this.router.navigate([`/${Route.LOGIN}`])
    );
  }

  atualizarSenha(): void {
    this._formSubmitted = true;

    if (this._form.invalid) {
      return;
    }

    this._loading = true;

    const senha: string = this._form.get('senha').value;

    this.usuarioService.updateSenha(this.token, senha).subscribe(
      () => this.toastService.addSuccess('', 'Senha atualizada com sucesso.'),
      () => this._loading = false,
      () => this.router.navigate([`/${Route.LOGIN}`])
    );
  }
}
