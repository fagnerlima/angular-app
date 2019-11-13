import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Credencials } from './credentials.model';

export class CredencialsForm extends FormGroup {
  constructor() {
    super({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(false)
    });
  }

  toModel(): Credencials {
    return {
      username: this.get('username').value,
      password: this.get('password').value
    };
  }
}
