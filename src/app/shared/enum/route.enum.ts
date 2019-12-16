export enum Route {
  LOGIN = 'login',
  HOME = 'home',
  ERRO_401 = 'erro-401',
  ERRO_404 = 'erro-404',

  GENERICO_CADASTRO = 'novo',
  GENERICO_EDICAO = ':id',

  ADMINISTRATIVO = 'administrativo',
  GRUPOS = 'grupos',
  USUARIOS = 'usuarios',
  PERFIL = 'perfil',
  RECUPERACAO_SENHA = 'recuperacao-senha',
  ADMINISTRATIVO_GRUPOS = 'administrativo/grupos',
  ADMINISTRATIVO_USUARIOS = 'administrativo/usuarios',
  ADMINISTRATIVO_PERFIL = 'administrativo/perfil',
  ADMINISTRATIVO_RECUPERACAO_SENHA = 'administrativo/recuperacao-senha'
}
