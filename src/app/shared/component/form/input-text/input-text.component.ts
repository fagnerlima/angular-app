import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

export enum Type {
  EMAIL = 'email',
  TEXT = 'text'
}

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html'
})
export class InputTextComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() blockCopyPaste = false;
  @Input() keyFilter: RegExp | string = /.*/;
  @Input() type = Type.TEXT;

  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
}
