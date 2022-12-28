import { describe, test, expect } from '@jest/globals';
import { ValidatorRegistry } from '../../src/core/validator_registry';
import { FieldController } from '../../src/core/field_controller';
import { ValidationContext } from '../../src/core/validation_context';
import { UnknownValidatorError } from '../../src/core/errors'

import type { Validator } from '../../src/core/validators';;


class FooValidator implements Validator {
  constructor(_options: string) {}

  validate(_field: FieldController, _context: ValidationContext) {}
}

class BarValidator implements Validator {
  constructor(_options: string) {}

  validate(_field: FieldController, _context: ValidationContext) {}
}

describe('ValidatorRegistry', () => {
  describe('add', () => {
    test('adds a new validator correctly', () => {
      const registry = new ValidatorRegistry();

      registry.add('foo', FooValidator);

      expect(registry.fetch('foo')).toEqual(FooValidator);
    });

    test('overwrites a given key', () => {
      const registry = new ValidatorRegistry();

      registry.add('foo', FooValidator);
      registry.add('foo', BarValidator);

      expect(registry.fetch('foo')).toEqual(BarValidator);
    });
  });

  describe('fetch', () => {
    test('gets correct validator when key exists', () => {
      const registry = new ValidatorRegistry();

      registry.add('foo', FooValidator);

      expect(registry.fetch('foo')).toEqual(FooValidator);
    });

    test('throws when key doesnt exist', () => {
      const registry = new ValidatorRegistry();

      expect(() => registry.fetch('bar')).toThrow(UnknownValidatorError);
    });
  });
});
