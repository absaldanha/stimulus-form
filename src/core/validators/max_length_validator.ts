import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';
import { isNumber } from '../helpers';
import { InvalidValidatorOptions } from '../errors';

import type { Validator } from './types';

const ERROR_KEY = 'too_long';
const REGISTRY_KEY = 'max-length';

export class MaxLengthValidator implements Validator {
  readonly maxValue: number;

  constructor(maxValue: string) {
    if (isNumber(maxValue)) {
      this.maxValue = Number(maxValue);
    } else {
      throw new InvalidValidatorOptions(`Option for \`${REGISTRY_KEY}\` validator must be an number, got \`${maxValue}\``);
    }
  }

  validate(field: FieldController, _context: ValidationContext) {
    const valueLength = field.value.length;

    if (valueLength > this.maxValue) {
      const variables = { value: this.maxValue };

      field.errors.add(ERROR_KEY, { variables });
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, MaxLengthValidator);
