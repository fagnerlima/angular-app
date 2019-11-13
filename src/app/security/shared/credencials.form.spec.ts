import { CredencialsForm } from './credencials.form';

describe('Security: CredencialsForm', () => {
  it('deve criar uma instância do form', () => {
    expect(new CredencialsForm()).toBeTruthy();
  });

  it('deve gerar um model', () => {
    const form = new CredencialsForm();
    form.get('username').setValue('meuusername');
    form.get('password').setValue('minhasenha');
    form.get('remember').setValue(true);

    const model = form.toModel();
    const expectedModel = {
      username: 'meuusername',
      password: 'minhasenha'
    };

    expect(model).toEqual(jasmine.objectContaining(expectedModel));
  });
});
