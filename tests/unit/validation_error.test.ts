import { describe, test, expect } from '@jest/globals';
import { ValidationError } from '../../src/core/validation_error';
import '../../src/core/config';

describe('ValidationError', () => {
  describe('message', () => {
    test('gets correct message based on given key', () => {
      const error = new ValidationError('equal_to', { variables: { value: 123 } });

      expect(error.message).toEqual('must be equal to 123');
    });
  });
});
