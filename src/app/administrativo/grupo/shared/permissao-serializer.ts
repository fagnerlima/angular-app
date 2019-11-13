import { PermissaoGrupoResponse } from './permissao-grupo-response.model';
import { PermissaoOptionResponse } from './permissao-option-response.model';

export class PermissaoSerializer {

  fromJsonToResponseGrupoModel(json: any): PermissaoGrupoResponse {
    return new PermissaoGrupoResponse(json.id, json.papel);
  }

  fromJsonToResponseOptionModel(json: any): PermissaoOptionResponse {
    return new PermissaoOptionResponse(json.id, json.papel);
  }
}
