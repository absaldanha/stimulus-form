type FalsyValue = false | '' | null | undefined;

const BLANK_REGEX = /^\s*$/;

export function isFalsy(value: unknown): value is FalsyValue {
  return value !== 0 && !value;
}

export function isBlank(value: unknown) {
  if (isFalsy(value)) {
    return true;
  }

  if (typeof value === 'string') {
    return value.length === 0 || BLANK_REGEX.test(value);
  }

  return false;
}

export function isPresent(value: unknown) {
  return !isBlank(value);
}

export function isNumber(value: unknown): value is number {
  if (isFalsy(value)) {
    return false;
  }

  const stringValue = String(value);

  if (stringValue === '') {
    return false;
  }

  return !isNaN(Number(stringValue));
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
