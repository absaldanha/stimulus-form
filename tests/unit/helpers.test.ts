import { describe, test, expect } from '@jest/globals';
import { isFalsy, isBlank, isNumber, capitalize } from '../../src/core/helpers';

describe('Helpers', () => {
  describe('isFalsy', () => {
    test('is true for falsy values (null, undefined, false and empty string)', () => {
      expect(isFalsy(null)).toBe(true);
      expect(isFalsy(undefined)).toBe(true);
      expect(isFalsy(false)).toBe(true);
      expect(isFalsy('')).toBe(true);
    });

    test('is false for truthy values', () => {
      expect(isFalsy('abc')).toBe(false);
      expect(isFalsy(123)).toBe(false);
      expect(isFalsy(0)).toBe(false);
    });
  });

  describe('isBlank', () => {
    test('is true for falsy values', () => {
      expect(isBlank(null)).toBe(true);
      expect(isBlank(undefined)).toBe(true);
      expect(isBlank(false)).toBe(true);
      expect(isBlank('')).toBe(true);
    });

    test('is true for blank strings', () => {
      expect(isBlank('            ')).toBe(true);
    });

    test('is false for everything else', () => {
      expect(isBlank('abc')).toBe(false);
      expect(isBlank(123)).toBe(false);
      expect(isBlank(0)).toBe(false);
      expect(isBlank({})).toBe(false);
      expect(isBlank([])).toBe(false);
    });
  });

  describe('isNumber', () => {
    test('is true for numbers', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber('45.1')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('0.0')).toBe(true);
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(42.5)).toBe(true);
      expect(isNumber(0.0)).toBe(true);
    });

    test('is false for everything else', () => {
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('')).toBe(false);
      expect(isNumber(false)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber([])).toBe(false);
    });
  });

  describe('capitalize', () => {
    test('capitalizes string correctly', () => {
      expect(capitalize('not capitalized')).toEqual('Not capitalized');
    });
  });
});
