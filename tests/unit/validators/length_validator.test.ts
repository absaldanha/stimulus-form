import { jest, describe, test, expect } from '@jest/globals';
import { LengthValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';
import { InvalidValidatorOptions } from '../../../src/core/errors';

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('LengthValidator', () => {
  describe('constructor', () => {
    test('throws when given option is not a number', () => {
      expect(() => new LengthValidator('abc')).toThrowError(InvalidValidatorOptions);
    });

    test('constructs a new instance correctly when given a number', () => {
      expect(() => new LengthValidator('42')).not.toThrowError();
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with a value length different than validator value', () => {
      const validator = new LengthValidator('3');

      const field = {
        value: 'abcd',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('wrong_length', { variables: { value: 3 } });
    });

    test('does nothing to field with a value length equal to validator value', () => {
      const validator = new LengthValidator('3');

      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
