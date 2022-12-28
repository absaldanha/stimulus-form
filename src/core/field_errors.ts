import { ValidationError } from './validation_error';
import { capitalize } from './helpers';

import type { ValidationErrorExtras } from './validation_error';

export class FieldErrors {
  private errors: ValidationError[];

  constructor() {
    this.errors = [];
  }

  get isEmpty() {
    return this.errors.length === 0;
  }

  get message() {
    return this.errors[0]?.message || null;
  }

  get fullMessage() {
    return this.message ? capitalize(this.message) : null;
  }

  add(type: string, extras: ValidationErrorExtras = {}) {
    const error = new ValidationError(type, extras);

    this.errors.push(error);
  }

  clear() {
    this.errors = [];
  }
}
