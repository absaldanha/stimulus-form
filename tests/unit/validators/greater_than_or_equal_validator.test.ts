import { jest, describe, test, expect } from '@jest/globals';
import { GreaterThanOrEqualValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';
import { InvalidValidatorOptions } from '../../../src/core/errors';

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('GreaterThanOrEqualValidator', () => {
  describe('constructor', () => {
    test('throws when given option is not a number', () => {
      expect(() => new GreaterThanOrEqualValidator('abc')).toThrowError(InvalidValidatorOptions);
    });

    test('constructs a new instance correctly when given a number', () => {
      expect(() => new GreaterThanOrEqualValidator('42')).not.toThrowError();
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with value lower than validator value', () => {
      const validator = new GreaterThanOrEqualValidator('10');

      const field = {
        value: '5',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('greater_than_or_equal_to', { variables: { value: 10 } });
    });

    test('does nothing to field with value equal to validator value', () => {
      const validator = new GreaterThanOrEqualValidator('10');

      const field = {
        value: '10',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });

    test('does nothing to field with value higher than validator value', () => {
      const validator = new GreaterThanOrEqualValidator('5');

      const field = {
        value: '10',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
