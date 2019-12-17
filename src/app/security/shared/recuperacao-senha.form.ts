import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RecuperacaoSenhaForm extends FormGroup {

  constructor() {
    super({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }
}
