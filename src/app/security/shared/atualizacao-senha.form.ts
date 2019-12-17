import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

export class AtualizacaoSenhaForm extends FormGroup {

  constructor() {
    super({
      senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmacaoSenha: new FormControl(null, Validators.required)
    });

    this.setValidators(this.senhaConfirmada);
  }

  private senhaConfirmada(control: AbstractControl): { senhaConfirmada: { valid: boolean} } {
    const senha: string = control.get('senha').value;
    const confirmacaoSenha: string = control.get('confirmacaoSenha').value;

    return senha === confirmacaoSenha ? null : {
      senhaConfirmada: { valid: false }
    };
  }
}
