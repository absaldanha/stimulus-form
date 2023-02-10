import { UnknownValidatorError } from './errors';

import type { ValidatorConstructor } from './validators';

export class ValidatorRegistry {
  private map: Map<string, ValidatorConstructor>;

  constructor() {
    this.map = new Map();
  }

  add(identifier: string, klass: ValidatorConstructor): void {
    this.map.set(identifier, klass);
  }

  fetch(identifier: string): ValidatorConstructor {
    const Validator = this.map.get(identifier);

    if (!Validator) {
      throw new UnknownValidatorError(identifier);
    }

    return Validator;
  }
}
