import { jest, describe, test, expect } from '@jest/globals';
import { ValidatorSet } from '../../src/core/validator_set';
import {
  PresenceValidator,
  MaxLengthValidator,
  NotEqualValidator,
  FormatValidator
} from '../../src/core/validators';
import { FieldController } from '../../src/core/field_controller';
import { ValidationContext } from '../../src/core/validation_context';

describe('ValidatorSet', () => {
  describe('buildFromString', () => {
    test('build a validator set correctly with the given validators', () => {
      const validatorString = 'required max-length:30 not-eq:foo';

      const validatorSet = ValidatorSet.buildFromString(validatorString);

      expect(validatorSet.validators.length).toEqual(3);

      const [firstValidator, secondValidator, thirdValidator] = validatorSet.validators;

      expect(firstValidator).toBeInstanceOf(PresenceValidator);

      expect(secondValidator).toBeInstanceOf(MaxLengthValidator);
      expect((secondValidator as MaxLengthValidator).maxValue).toEqual(30);

      expect(thirdValidator).toBeInstanceOf(NotEqualValidator);
      expect((thirdValidator as NotEqualValidator).value).toEqual('foo');
    });

    test('build a validator set correctly even with semi-colon options', () => {
      const validatorString = 'format:^:.*$';

      const validatorSet = ValidatorSet.buildFromString(validatorString);

      const [validator] = validatorSet.validators;

      expect(validator).toBeInstanceOf(FormatValidator);
      expect((validator as FormatValidator).regExp).toEqual(/^:.*$/);
    });

    test('build an empty validator set when given an blank string', () => {
      const validatorSet = ValidatorSet.buildFromString('');

      expect(validatorSet.validators.length).toEqual(0);
    });

    test('build a validator set correctly when given malformed string', () => {
      const validatorString = '  required        max-length:30 not-eq:foo  ';

      const validatorSet = ValidatorSet.buildFromString(validatorString);

      expect(validatorSet.validators.length).toEqual(3);

      const [firstValidator, secondValidator, thirdValidator] = validatorSet.validators;

      expect(firstValidator).toBeInstanceOf(PresenceValidator);

      expect(secondValidator).toBeInstanceOf(MaxLengthValidator);
      expect((secondValidator as MaxLengthValidator).maxValue).toEqual(30);

      expect(thirdValidator).toBeInstanceOf(NotEqualValidator);
      expect((thirdValidator as NotEqualValidator).value).toEqual('foo');
    });
  });

  describe('validate', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    const field = {} as jest.Mocked<Partial<FieldController>> as FieldController;
    const validationContext = {} as jest.Mocked<Partial<ValidationContext>> as ValidationContext;

    const presenceValidate = jest.fn();
    const maxLengthValidate = jest.fn();
    const notEqualValidate = jest.fn();

    const presenceValidator = {
      validate: presenceValidate
    } as jest.Mocked<Partial<PresenceValidator>> as PresenceValidator;

    const maxLengthValidator = {
      validate: maxLengthValidate
    } as jest.Mocked<Partial<MaxLengthValidator>> as MaxLengthValidator;

    const notEqualValidator = {
      validate: notEqualValidate
    } as jest.Mocked<Partial<NotEqualValidator>> as NotEqualValidator;

    test('validates with each validator', () => {
      const validatorSet = new ValidatorSet([
        presenceValidator,
        maxLengthValidator,
        notEqualValidator
      ]);

      validatorSet.validate(field, validationContext);

      expect(presenceValidate).toHaveBeenCalledTimes(1);
      expect(presenceValidate).toHaveBeenCalledWith(field, validationContext);

      expect(maxLengthValidate).toHaveBeenCalledTimes(1);
      expect(maxLengthValidate).toHaveBeenCalledWith(field, validationContext);

      expect(notEqualValidate).toHaveBeenCalledTimes(1);
      expect(notEqualValidate).toHaveBeenCalledWith(field, validationContext);
    });
  });
});
