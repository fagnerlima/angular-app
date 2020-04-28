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

  customErrorsMessages: Validation[];

  getErrorMessages(control: AbstractControl): string[] {
    if (isNullOrUndefined(control.errors)) {
      return [];
    }

    const errors = Object.keys(control.errors);
    const messages = [];

    errors.forEach(error => {
      if (!isNullOrUndefined(this.customErrorsMessages) && this.customErrorsMessages.length) {
        const customErrorMessage = this.customErrorsMessages.find(errorMessage => errorMessage.type === error);

        if (customErrorMessage) {
          messages.push(customErrorMessage.message);
          return;
        }
      }

      messages.push(this.getErrorMessage(control, error));
    });

    return messages;
  }

  getErrorMessage(control: AbstractControl, error: string): string {
    const messages = new Map<string, string>([
      [FormValidationType.REQUIRED, 'Este campo é obrigatório'],
      [FormValidationType.REQUIRED_TRUE, 'Este campo deve ser marcado'],
      [FormValidationType.MIN, `Valor mínimo: ${this.getMinError(control)}`],
      [FormValidationType.MIN_LENGTH, `Tamanho mínimo: ${this.getMinLengthError(control)} caracteres`],
      [FormValidationType.MAX, `Valor máximo: ${this.getMaxError(control)}`],
      [FormValidationType.MAX_LENGTH, `Tamanho máximo: ${this.getMaxLengthError(control)} caracteres`],
      [FormValidationType.PATTERN, 'Formato inválido'],
      [FormValidationType.EMAIL, 'E-mail inválido'],
    ]);

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
