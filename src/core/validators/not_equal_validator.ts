import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';

import type { Validator } from './types';

const ERROR_KEY = 'not_equal';
const REGISTRY_KEY = 'not-eq';

export class NotEqualValidator implements Validator {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  validate(field: FieldController, _context: ValidationContext) {
    if (field.value == this.value) {
      const variables = { value: this.value };

      field.errors.add(ERROR_KEY, { variables });
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, NotEqualValidator)
