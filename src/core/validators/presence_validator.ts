import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { isBlank } from '../helpers';
import { validatorRegistry } from '../config';

import type { Validator } from './types';

const ERROR_TYPE = 'blank';
const REGISTRY_KEY = 'required';

export class PresenceValidator implements Validator {
  validate(field: FieldController, _context: ValidationContext) {
    if (isBlank(field.value)) {
      field.errors.add(ERROR_TYPE);
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, PresenceValidator);
