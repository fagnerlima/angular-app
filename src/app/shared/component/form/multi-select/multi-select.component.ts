import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';

import { FormInput } from '../form-input';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html'
})
export class MultiSelectComponent extends FormInput {

  @Input() autoFocus = false;
  @Input() options: SelectItem[];

  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
  @Output() onPanelHide: EventEmitter<any> = new EventEmitter();
  @Output() onPanelShow: EventEmitter<any> = new EventEmitter();
}
