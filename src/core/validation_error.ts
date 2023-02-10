import { errorMessages } from './config';

export interface ValidationErrorExtras {
  variables?: Record<string, unknown>
}

export class ValidationError {
  readonly type: string;
  readonly extras: ValidationErrorExtras;

  constructor(type: string = 'invalid', extras: ValidationErrorExtras = {}) {
    this.type = type;
    this.extras = extras;
  }

  get message() {
    return errorMessages.translate(this.type, this.extras.variables);
  }
}
