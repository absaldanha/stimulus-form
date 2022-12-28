import { jest, describe, test, expect } from '@jest/globals';
import { NotEqualValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('NotEqualValidator', () => {
  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with value equal to validation value', () => {
      const validator = new NotEqualValidator('abc');

      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith(
        'not_equal',
        { variables: { value: 'abc' } }
      );
    });

    test('does nothing to field with value different from validation value', () => {
      const validator = new NotEqualValidator('abc');

      const field = {
        value: 'zxy',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
