import { GrupoOptionResponse } from '@app/administrativo/grupo/shared/grupo-option-response.model';
import { ResponseModel } from '@app/shared/interface/response-model';

export class UsuarioResponse implements ResponseModel {

  constructor(
    public id: number,
    public nome: string,
    public sobrenome: string,
    public email: string,
    public username: string,
    public grupos: GrupoOptionResponse[],
    public ativo: boolean
  ) { }
}
