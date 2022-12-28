import { describe, test, expect } from '@jest/globals';
import { FieldErrors } from '../../src/core/field_errors';
import '../../src/core/config';

describe('FieldErrors', () => {
  test('initialize with no errors', () => {
    const fieldErrors = new FieldErrors();

    expect(fieldErrors.isEmpty).toBe(true);
  });

  describe('add', () => {
    test('stores new error correctly', () => {
      const fieldErrors = new FieldErrors();

      fieldErrors.add('invalid');

      expect(fieldErrors.isEmpty).toBe(false);
    });
  });

  describe('message', () => {
    test('fetchs message from first error', () => {
      const fieldErrors = new FieldErrors();

      fieldErrors.add('invalid');
      fieldErrors.add('blank');

      expect(fieldErrors.message).toEqual('is invalid');
    });

    test('returns undefined when empty', () => {
      const fieldErrors = new FieldErrors();

      expect(fieldErrors.message).toBe(null);
    });
  });

  describe('fullMessage', () => {
    test('builds full message with first error', () => {
      const fieldErrors = new FieldErrors();

      fieldErrors.add('invalid');
      fieldErrors.add('blank');

      expect(fieldErrors.fullMessage).toEqual('Is invalid');
    });

    test('returns undefined when empty', () => {
      const fieldErrors = new FieldErrors();

      expect(fieldErrors.fullMessage).toBe(null);
    });
  });

  describe('clear', () => {
    test('clear errors', () => {
      const fieldErrors = new FieldErrors();

      fieldErrors.add('invalid');
      fieldErrors.add('blank');

      fieldErrors.clear();

      expect(fieldErrors.isEmpty).toBe(true);
    });
  });
});
