import { RequestModel } from '@app/shared/interface/request-model';

export class UsuarioRequest implements RequestModel {

  constructor(
    public nome: string,
    public sobrenome: string,
    public email: string,
    public username: string,
    public senha: string,
    public grupos: number[],
    public ativo: boolean
  ) { }
}
