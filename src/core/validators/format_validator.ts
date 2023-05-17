import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';

import type { Validator } from './types';

const ERROR_KEY = 'invalid';
const REGISTRY_KEY = 'format';
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export class FormatValidator implements Validator {
  readonly regExp: RegExp;

  constructor(regExp: string) {
    if (regExp === 'email') {
      this.regExp = EMAIL_REGEXP;
    } else {
      this.regExp = RegExp(regExp);
    }
  }

  validate(field: FieldController, _context: ValidationContext) {
    if (!this.regExp.test(field.value)) {
      field.errors.add(ERROR_KEY);
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, FormatValidator);
