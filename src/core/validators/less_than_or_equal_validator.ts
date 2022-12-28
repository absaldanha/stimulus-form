import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';
import { isNumber } from '../helpers';
import { InvalidValidatorOptions } from '../errors';

import type { Validator } from './types';

const ERROR_KEY = 'less_than_or_equal_to';
const REGISTRY_KEY = 'lteq';

export class LessThanOrEqualValidator implements Validator {
  readonly maxValue: number;

  constructor(maxValue: string) {
    if (isNumber(maxValue)) {
      this.maxValue = Number(maxValue);
    } else {
      throw new InvalidValidatorOptions(`Option for \`${REGISTRY_KEY}\` validator must be an number, got \`${maxValue}\``);
    }
  }

  validate(field: FieldController, _context: ValidationContext) {
    const value = Number(field.value);

    if (value > this.maxValue) {
      const variables = { value: this.maxValue };

      field.errors.add(ERROR_KEY, { variables });
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, LessThanOrEqualValidator);
