import { CredenciaisForm } from './credenciais.form';

describe('Security: CredenciaisForm', () => {
  it('deve criar uma instância do form', () => {
    expect(new CredenciaisForm()).toBeTruthy();
  });

  it('deve gerar um model', () => {
    const form = new CredenciaisForm();
    form.get('username').setValue('meuusername');
    form.get('senha').setValue('minhasenha');
    form.get('lembrarAcesso').setValue(true);

    const model = form.toModel();
    const expectedModel = {
      username: 'meuusername',
      senha: 'minhasenha'
    };

    expect(model).toEqual(jasmine.objectContaining(expectedModel));
  });
});
