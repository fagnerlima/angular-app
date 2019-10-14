import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() options: SelectItem[];

  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
}
