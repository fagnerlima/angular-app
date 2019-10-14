import { ResponseListModel } from '@app/shared/interface/response-list-model';

export class UsuarioListResponse implements ResponseListModel {

  constructor(
    public id: number,
    public nome: string,
    public sobrenome: string,
    public email: string,
    public username: string,
    public grupos: string[],
    public ativo: boolean
  ) { }

  get nomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`;
  }
}
