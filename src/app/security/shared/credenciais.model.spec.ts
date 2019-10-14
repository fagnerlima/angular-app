import { Credenciais } from './credenciais.model';

describe('Security: Credenciais', () => {
  it('deve criar uma instância do model', () => {
    const credenciais = new Credenciais();
    credenciais.username = 'meuusername';
    credenciais.senha = 'minhasenha';

    const expectedModel = {
      username: 'meuusername',
      senha: 'minhasenha'
    };

    expect(credenciais).toEqual(jasmine.objectContaining(expectedModel));
  });
});
