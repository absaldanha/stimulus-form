import { jest, describe, test, expect } from '@jest/globals';
import { PresenceValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';

const FALSY_VALUES = [false, '', null, undefined];

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('PresenceValidator', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('validate', () => {
    test('adds error to field with falsy values', () => {
      FALSY_VALUES.forEach((falsyValue) => {
        fieldErrorsAdd.mockReset();

        const field = {
          value: falsyValue,
          errors: fieldErrors
        } as jest.Mocked<Partial<FieldController>> as FieldController;

        const validator = new PresenceValidator();

        validator.validate(field, validationContext);

        expect(fieldErrorsAdd).toHaveBeenCalledWith('blank');
      });
    });

    test('adds error to field with empty string', () => {
      const field = {
        value: '             ',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      const validator = new PresenceValidator();

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('blank');
    });

    test('does nothing whe field with not blank value', () => {
      const field = {
        value: 'abc',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      const validator = new PresenceValidator();

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });
  });
});
