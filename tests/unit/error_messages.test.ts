import { describe, test, expect } from '@jest/globals';
import { ErrorMessages } from '../../src/core/error_messages';
import { MissingDefaultLocaleError, MissingTranslationError } from '../../src/core/errors';

describe('ErrorMessages', () => {
  describe('loadWithDefaults', () => {
    test('loadWithDefaults constructs with default locales', () => {
      const errorMessages = ErrorMessages.loadWithDefaults();
  
      expect(errorMessages.locale).toEqual('en');
  
      expect(errorMessages.translate('confirmation')).toEqual("doesn't match");
      expect(errorMessages.translate('equal_to', { value: 1 })).toEqual('must be equal to 1');
      expect(errorMessages.translate('invalid')).toEqual('is invalid');
      expect(errorMessages.translate('greater_than_or_equal_to', { value: 1 })).toEqual('must be greater than or equal to 1');
      expect(errorMessages.translate('greater_than', { value: 1 })).toEqual('must be greater than 1');
      expect(errorMessages.translate('wrong_length', { value: 1 })).toEqual('is the wrong length (maximum is 1 character(s)');
      expect(errorMessages.translate('less_than_or_equal_to', { value: 1 })).toEqual('must be less than or equal to 1');
      expect(errorMessages.translate('less_than', { value: 1 })).toEqual('must be less than 1');
      expect(errorMessages.translate('too_long', { value: 1 })).toEqual('is too long (maximum is 1 character(s))');
      expect(errorMessages.translate('too_short', { value: 1 })).toEqual('is too short (minimum is 1 character(s))');
      expect(errorMessages.translate('not_equal', { value: 1 })).toEqual('must be other than 1');
      expect(errorMessages.translate('blank')).toEqual("can't be blank");
  
      errorMessages.locale = 'pt-BR';
  
      expect(errorMessages.translate('confirmation')).toEqual('não é igual');
      expect(errorMessages.translate('equal_to', { value: 1 })).toEqual('deve ser igual a 1');
      expect(errorMessages.translate('invalid')).toEqual('não é válido');
      expect(errorMessages.translate('greater_than_or_equal_to', { value: 1 })).toEqual('deve ser maior ou igual a 1');
      expect(errorMessages.translate('greater_than', { value: 1 })).toEqual('deve ser maior que 1');
      expect(errorMessages.translate('wrong_length', { value: 1 })).toEqual('não possui o tamanho esperado (máximo: 1 caracter(es))');
      expect(errorMessages.translate('less_than_or_equal_to', { value: 1 })).toEqual('deve ser menor ou igual a 1');
      expect(errorMessages.translate('less_than', { value: 1 })).toEqual('deve ser menor que 1');
      expect(errorMessages.translate('too_long', { value: 1 })).toEqual('é muito longo (máximo: 1 caracter(es))');
      expect(errorMessages.translate('too_short', { value: 1 })).toEqual('é muito curto (mínimo: 1 caracter(es))');
      expect(errorMessages.translate('not_equal', { value: 1 })).toEqual('deve ser diferente de 1');
      expect(errorMessages.translate('blank')).toEqual("não pode ficar em branco");
    });
  });

  describe('append', () => {
    test('adds the translation correctly to the given locale', () => {
      const errorMessages = new ErrorMessages('en');
  
      errorMessages.append({ foo: 'it is foo!' }, 'en');
  
      expect(errorMessages.translate('foo')).toEqual('it is foo!');
    });
  
    test('merges translations correctly', () => {
      const errorMessages = new ErrorMessages('en');
  
      errorMessages.append({ foo: 'it is foo!' }, 'en');
      errorMessages.append({ bar: 'it is bar!', foo: 'changed foo!' }, 'en');
  
      expect(errorMessages.translate('foo')).toEqual('changed foo!');
      expect(errorMessages.translate('bar')).toEqual('it is bar!');
    });

    test('adds the translation correctly to default locale if none is given', () => {
      const errorMessages = new ErrorMessages();

      errorMessages.locale = 'pt-BR';
      errorMessages.append({ foo: 'some foo' });

      expect(errorMessages.translate('foo')).toEqual('some foo');
    });

    test('throws error if no locale is given and no default locale is set', () => {
      const errorMessages = new ErrorMessages();

      expect(() => errorMessages.append({ foo: 'some foo' })).toThrow(MissingDefaultLocaleError);
    });
  });

  describe('translate', () => {
    test('throws when no translation for configured locale', () => {
      const errorMessages = new ErrorMessages('en');
  
      expect(() => errorMessages.translate('foo')).toThrow(MissingTranslationError);
    });
  
    test('throws when no translation found for given locale', () => {
      const errorMessages = new ErrorMessages('en');
  
      errorMessages.append({ foo: 'it is foo!' });
  
      expect(() => errorMessages.translate('foo', {}, 'pt-BR')).toThrow(MissingTranslationError);
    });

    test('throws when no given locale and no default locale is set', () => {
      const errorMessages = new ErrorMessages();

      expect(() => errorMessages.translate('foo')).toThrow(MissingDefaultLocaleError);
    });
  
    test('interpolates variables corretcly', () => {
      const errorMessages = new ErrorMessages('en');
  
      errorMessages.append({ foo: 'look, some %{thing}! Very %{other_thing}' });
  
      expect(errorMessages.translate('foo', { thing: 'bar', other_thing: 'foo' })).toEqual('look, some bar! Very foo');
    });
  });
});
