import { FieldController } from '../field_controller';
import { ValidationContext } from '../validation_context';

export interface ValidatorConstructor {
  new(options: string): Validator
}

export interface Validator {
  validate(field: FieldController, context: ValidationContext): void
}
