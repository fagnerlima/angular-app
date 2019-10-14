import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectItem } from 'primeng/components/common/selectitem';

import { GrupoService } from '@app/administrativo/grupo/shared/grupo.service';
import { CrudRegistration } from '@app/shared/component/crud/crud-registration/crud-registration';
import { ValidationMessage } from '@app/shared/component/validation-message/validation-message.model';
import { BreadcrumbService } from '@app/shared/service/breadcrumb.service';
import { TitleService } from '@app/shared/service/title.service';
import { ToastService } from '@app/shared/service/toast.service';
import { UsuarioListResponse } from '../shared/usuario-list-response.model';
import { UsuarioForm } from '../shared/usuario.form';
import { UsuarioRequest } from '../shared/usuario-request.model';
import { UsuarioResponse } from '../shared/usuario-response.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuario-registration',
  templateUrl: './usuario-registration.component.html',
  providers: [GrupoService]
})
export class UsuarioRegistrationComponent extends CrudRegistration<UsuarioRequest, UsuarioResponse, UsuarioListResponse> {

  protected _form = new UsuarioForm();

  private _grupoOptions: SelectItem[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected service: UsuarioService,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
    private grupoService: GrupoService
  ) {
    super(activatedRoute, changeDetectorRef, router, service, titleService, toastService, breadcrumbService);
  }

  get editionTitle(): string {
    return 'Edição de Usuário';
  }

  get grupoOptions(): SelectItem[] {
    return this._grupoOptions;
  }

  get registrationTitle(): string {
    return 'Cadastro de Usuário';
  }

  get validationMessages(): ValidationMessage[] {
    return [
      { type: 'emailConfirmado', message: 'E-mail confirmado incorretamente' },
      { type: 'senhaConfirmada', message: 'Senha confirmada incorretamente' }
    ];
  }

  protected async loadAdditionalData(): Promise<void> {
    await this.loadGrupoOptions();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Usuários', ['/administrativo/usuarios']);
    this.isEditionMode()
      ? this.breadcrumbService.add('Edição de Usuário', ['/administrativo/usuarios', this.model.id])
      : this.breadcrumbService.add('Cadastro de Usuário', ['/administrativo/usuarios/novo']);
  }

  protected redirectToListing(): void {
    this.router.navigate(['/administrativo/usuarios']);
  }

  private async loadGrupoOptions(): Promise<void> {
    return this.grupoService.findOptions().toPromise().then(grupos => {
      this._grupoOptions = [];
      grupos.forEach(grupo => {
        this._grupoOptions.push({
          label: grupo.nome,
          value: grupo.id
        });
      });
    });
  }
}
