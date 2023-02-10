import { jest, describe, test, expect } from '@jest/globals';
import { ConfirmationValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';

const validationContext = {
  getFieldValueByName: () => 'right@mail.com'
} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('ConfirmationValidator', () => {
  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with value different from validator field', () => {
      const validator = new ConfirmationValidator('foo');

      const field = {
        value: 'wrong@mail.com',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('confirmation');
    });

    test('does nothing to field with value equal to validator field', () => {
      const validator = new ConfirmationValidator('foo');

      const field = {
        value: 'right@mail.com',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
