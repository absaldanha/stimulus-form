import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';
import { isNumber } from '../helpers';
import { InvalidValidatorOptions } from '../errors';

import type { Validator } from './types';

const ERROR_KEY = 'wrong_length';
const REGISTRY_KEY = 'length';

export class LengthValidator implements Validator {
  readonly value: number;

  constructor(value: string) {
    if (isNumber(value)) {
      this.value = Number(value);
    } else {
      throw new InvalidValidatorOptions(`Option for \`${REGISTRY_KEY}\` validator must be an number, got \`${value}\``);
    }
  }

  validate(field: FieldController, _context: ValidationContext) {
    const valueLength = field.value.length;

    if (valueLength !== this.value) {
      const variables = { value: this.value };

      field.errors.add(ERROR_KEY, { variables });
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, LengthValidator);
