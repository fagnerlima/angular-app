import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent extends FormInput {

  showPassword = false;

  @Input() autoFocus = false;
  @Input() blockCopyPaste = false;
  @Input() feedback = true;
  @Input() promptLabel: string;
  @Input() showViewButton = false;

  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
}
