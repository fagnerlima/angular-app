import { ValidationType } from './validation-type.enum';

export class ValidationMessage {
  type: ValidationType | string;
  message: string;
}
