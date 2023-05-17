import { jest, describe, test, expect } from '@jest/globals';
import { FormatValidator } from '../../../src/core/validators';
import { FieldController } from '../../../src/core/field_controller';
import { ValidationContext } from '../../../src/core/validation_context';
import { FieldErrors } from '../../../src/core/field_errors';

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

const fieldErrorsAdd = jest.fn();

const fieldErrors = {
  add: fieldErrorsAdd
} as jest.Mocked<Partial<FieldErrors>> as FieldErrors;

describe('FormatValidator', () => {
  describe('constructor', () => {
    test("builds a validator with email regex when given value is 'email'", () => {
      const validator = new FormatValidator('email');

      expect(validator.regExp).toEqual(EMAIL_REGEXP);
    });

    test('builds a validator with given regex', () => {
      const validator = new FormatValidator('^foo$');

      expect(validator.regExp).toEqual(/^foo$/);
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('adds error to field with value that doesnt match validator format', () => {
      const validator = new FormatValidator('^foo$');

      const field = {
        value: 'bar_foo',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('invalid');
    });

    test('does nothing to field with value that matches validator format', () => {
      const validator = new FormatValidator('^foo.*$');

      const field = {
        value: 'foo_bar',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });

    test('email regex matches correctly', () => {
      const validator = new FormatValidator('email');

      const field = {
        value: 'test.mail@mail.com',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).not.toHaveBeenCalled();
    });

    test('email regex adds error correctly', () => {
      const validator = new FormatValidator('email');

      const field = {
        value: 'something.iswrong@',
        errors: fieldErrors
      } as jest.Mocked<Partial<FieldController>> as FieldController;

      validator.validate(field, validationContext);

      expect(fieldErrorsAdd).toHaveBeenCalledTimes(1);
      expect(fieldErrorsAdd).toHaveBeenCalledWith('invalid');
    });
  });
});
