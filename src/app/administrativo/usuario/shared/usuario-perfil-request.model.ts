export class UsuarioPerfilInformacoesPessoaisRequest {

  constructor(
    public nome: string,
    public sobrenome: string,
    public email: string,
    public username: string
  ) { }
}

export class UsuarioPerfilSenhaRequest {

  constructor(
    public senhaAtual: string,
    public senhaNova: string
  ) { }
}
