import { Injectable } from '@angular/core';

import { GrupoSerializer } from '@app/administrativo/grupo/shared/grupo-serializer';
import { Serializer } from '@app/shared/interface/serializer';
import { UsuarioListResponse } from './usuario-list-response.model';
import { UsuarioPerfilInformacoesPessoaisRequest, UsuarioPerfilSenhaRequest } from './usuario-perfil-request.model';
import {
  UsuarioPerfilInformacoesPessoaisForm,
  UsuarioPerfilSenhaForm,
  UsuarioForm
} from './usuario.form';
import { UsuarioRequest } from './usuario-request.model';
import { UsuarioResponse } from './usuario-response.model';

@Injectable()
export class UsuarioSerializer implements Serializer<UsuarioRequest, UsuarioResponse, UsuarioListResponse> {

  constructor(private grupoSerializer: GrupoSerializer) { }

  fromJsonToResponseModel(json: any): UsuarioResponse {
    const grupos = (<any[]>json.grupos).map(grupo => this.grupoSerializer.fromJsonToResponseOptionModel(grupo));

    return new UsuarioResponse(json.id, json.nome, json.sobrenome, json.email, json.username, grupos, json.ativo);
  }

  fromJsonToResponseListModel(json: any): UsuarioListResponse {
    return new UsuarioListResponse(json.id, json.nome, json.sobrenome, json.email, json.username, json.grupos, json.ativo);
  }

  fromResponseModelToForm(model: UsuarioResponse): UsuarioForm {
    const form = new UsuarioForm();

    form.patchValue({
      nome: model.nome,
      sobrenome: model.sobrenome,
      email: model.email,
      username: model.username,
      grupos: model.grupos.map(grupo => grupo.id),
      ativo: model.ativo
    });

    return form;
  }

  fromFormToRequestModel(form: UsuarioForm): UsuarioRequest {
    return new UsuarioRequest(
      form.get('nome').value,
      form.get('sobrenome').value,
      form.get('email').value,
      form.get('username').value,
      form.get('senha').value,
      form.get('grupos').value,
      form.get('ativo').value
    );
  }

  fromResponseListModelToPerfilInformacoesPessoaisForm(
    model: UsuarioListResponse
  ): UsuarioPerfilInformacoesPessoaisForm {
    const form = new UsuarioPerfilInformacoesPessoaisForm();

    form.patchValue({
      nome: model.nome,
      sobrenome: model.sobrenome,
      email: model.email,
      username: model.username
    });

    return form;
  }

  fromPerfilInformacoesPessoaisFormToRequestModel(
    form: UsuarioPerfilInformacoesPessoaisForm
  ): UsuarioPerfilInformacoesPessoaisRequest {
    return new UsuarioPerfilInformacoesPessoaisRequest(
      form.get('nome').value,
      form.get('sobrenome').value,
      form.get('email').value,
      form.get('username').value
    );
  }

  fromPerfilSenhaFormToRequestModel(form: UsuarioPerfilSenhaForm): UsuarioPerfilSenhaRequest {
    return new UsuarioPerfilSenhaRequest(
      form.get('senhaAtual').value,
      form.get('senha').value
    );
  }
}
