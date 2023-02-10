import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';
import { isNumber } from '../helpers';
import { InvalidValidatorOptions } from '../errors';

import type { Validator } from './types';

const ERROR_KEY = 'greater_than';
const REGISTRY_KEY = 'gt';

export class GreaterThanValidator implements Validator {
  readonly minValue: number;

  constructor(minValue: string) {
    if (isNumber(minValue)) {
      this.minValue = Number(minValue);
    } else {
      throw new InvalidValidatorOptions(`Option for \`${REGISTRY_KEY}\` validator must be an number, got \`${minValue}\``);
    }
  }

  validate(field: FieldController, _context: ValidationContext) {
    const value = Number(field.value);

    if (value <= this.minValue) {
      const variables = { value: this.minValue };

      field.errors.add(ERROR_KEY, { variables });
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, GreaterThanValidator);
