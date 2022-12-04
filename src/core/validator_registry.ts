// import { UnknownIdentifierError } from './errors';

import type { ValidatorConstructor } from './types';

export default class ValidatorRegistry {
  private map: Map<string, ValidatorConstructor>;

  constructor() {
    this.map = new Map();
  }

  add(identifier: string, klass: ValidatorConstructor): void {
    this.map.set(identifier, klass);
  }

  fetch(identifier: string): ValidatorConstructor {
    if (this.map.has(identifier)) {
      return this.map.get(identifier)!;
    }

    // throw new UnknownIdentifierError(identifier);
    throw new Error();
  }
}
