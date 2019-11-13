import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import { PasswordModule } from 'primeng/components/password/password';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { AutoFocusDirective } from '../../../directive/auto-focus.directive';
import { BlockCopyPasteDirective } from '../../../directive/block-copy-paste.directive';
import { ValidationMessageComponent } from '../../validation-message/validation-message.component';
import { PasswordComponent } from './password.component';

describe('Shared: Component: PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        PasswordModule,
        TooltipModule,
      ],
      declarations: [
        AutoFocusDirective,
        BlockCopyPasteDirective,
        PasswordComponent,
        ValidationMessageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;

    component.control = new FormControl();
    component.inputId = 'senha';
    component.label = 'Senha';

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});