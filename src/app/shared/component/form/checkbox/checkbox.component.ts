import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends FormInput {

  @Input() binary = true;

  @Output() onChange: EventEmitter<any> = new EventEmitter();
}
