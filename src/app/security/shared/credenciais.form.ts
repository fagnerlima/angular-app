import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Credenciais } from './credenciais';

export class CredenciaisForm extends FormGroup {
  constructor() {
    super({
      username: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
      lembrarAcesso: new FormControl(false)
    });
  }

  toModel(): Credenciais {
    return {
      username: this.get('username').value,
      senha: this.get('senha').value
    };
  }
}
