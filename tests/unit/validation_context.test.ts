import { jest, describe, test, expect } from '@jest/globals';
import { ValidationContext } from '../../src/core/validation_context';
import { FormController } from '../../src/core/form_controller';
import { FieldController } from '../../src/core/field_controller';

const fooField = {
  name: 'foo',
  value: 'abc'
} as jest.Mocked<Partial<FieldController>> as FieldController;

const barField = {
  name: 'bar',
  value: '123'
} as jest.Mocked<Partial<FieldController>> as FieldController;

const fieldOutlets = [fooField, barField];

const form = {
  fieldOutlets
} as jest.Mocked<Partial<FormController>> as FormController;

describe('ValidationContext', () => {
  describe('getFieldValueByName', () => {
    test('fetches value for the given field name', () => {
      const validationContext = new ValidationContext(form);

      const value = validationContext.getFieldValueByName('foo');

      expect(value).toEqual('abc');
    });

    test('returns undefined for an unknown field name', () => {
      const validationContext = new ValidationContext(form);

      const value = validationContext.getFieldValueByName('zoo');

      expect(value).toBe(undefined);
    });
  });
});
