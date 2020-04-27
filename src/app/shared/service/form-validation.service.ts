import { isNullOrUndefined } from '@app/shared/util/utils';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormValidationType } from '@app/shared/enum/form-validation-type.enum';

interface Validation {
  type: FormValidationType | string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  getErrorMessages(control: AbstractControl, customMessages?: Validation[]): string[] {
    if (isNullOrUndefined(control.errors)) {
      return [];
    }

    const errors = Object.keys(control.errors);
    const messages = [];

    errors.forEach(error => {
      if (!isNullOrUndefined(customMessages) && customMessages.length) {
        customMessages.forEach(errorMessage => {
          if (error === errorMessage.type) {
            messages.push(errorMessage.message);
            return;
          }
        });
      }

      messages.push(this.getErrorMessage(control, error));
    });

    return messages;
  }

  getErrorMessage(control: AbstractControl, error: string): string {
    const messages: Map<string, string> = new Map();
    messages.set(FormValidationType.REQUIRED, 'Este campo é obrigatório');
    messages.set(FormValidationType.REQUIRED_TRUE, 'Este campo deve ser marcado');
    messages.set(FormValidationType.MIN, `Valor mínimo: ${this.getMinError(control)}`);
    messages.set(FormValidationType.MIN_LENGTH, `Tamanho mínimo: ${this.getMinLengthError(control)} caracteres`);
    messages.set(FormValidationType.MAX, `Valor máximo: ${this.getMaxError(control)}`);
    messages.set(FormValidationType.MAX_LENGTH, `Tamanho máximo: ${this.getMaxLengthError(control)} caracteres`);
    messages.set(FormValidationType.PATTERN, 'Formato inválido');
    messages.set(FormValidationType.EMAIL, 'E-mail inválido');

    return messages.has(error) ? messages.get(error) : 'Erro de validação';
  }

  private getMinError(control: AbstractControl): number {
    const error = control.errors[FormValidationType.MIN];

    return !error || error.min;
  }

  private getMinLengthError(control: AbstractControl): number {
    const error = control.errors[FormValidationType.MIN_LENGTH];

    return !error || error.requiredLength;
  }

  private getMaxError(control: AbstractControl): number {
    const error = control.errors[FormValidationType.MAX];

    return !error || error.max;
  }

  private getMaxLengthError(control: AbstractControl): number {
    const error = control.errors[FormValidationType.MAX_LENGTH];

    return !error || error.requiredLength;
  }
}
