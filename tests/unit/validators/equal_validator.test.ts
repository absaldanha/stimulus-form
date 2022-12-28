import { jest, describe, test, expect } from '@jest/globals';
import { EqualValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('EqualValidator', () => {
  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with value different from validation value', () => {
      const validator = new EqualValidator('abc');

      const field = {
        value: 'xyz',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith(
        'equal_to',
        { variables: { value: 'abc' } }
      );
    });

    test('does nothing to field with value equal to validation value', () => {
      const validator = new EqualValidator('abc');

      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
