import { FieldController }  from '../field_controller';
import { ValidationContext } from '../validation_context';
import { validatorRegistry } from '../config';

import type { Validator } from './types';

const ERROR_KEY = 'confirmation';
const REGISTRY_KEY = 'confirmation';

export class ConfirmationValidator implements Validator {
  readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(field: FieldController, context: ValidationContext) {
    const confirmationValue = context.getFieldValueByName(this.fieldName);

    if (field.value != confirmationValue) {
      field.errors.add(ERROR_KEY);
    }
  }
}

validatorRegistry.add(REGISTRY_KEY, ConfirmationValidator);
