import { jest, describe, test, expect } from '@jest/globals';
import { MinLengthValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';
import { InvalidValidatorOptions } from '../../../src/core/errors';

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('MinLengthValidator', () => {
  describe('constructor', () => {
    test('throws when given option is not a number', () => {
      expect(() => new MinLengthValidator('abc')).toThrowError(InvalidValidatorOptions);
    });

    test('constructs a new instance correctly when given a number', () => {
      expect(() => new MinLengthValidator('42')).not.toThrowError();
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with a value length lower than validator value', () => {
      const validator = new MinLengthValidator('30');

      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('too_short', { variables: { value: 30 } });
    });

    test('does nothing to field with a value length higher than validator value', () => {
      const validator = new MinLengthValidator('2');

      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });

    test('does nothing to field with a value length equal to validator value', () => {
      const validator = new MinLengthValidator('3');

      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
