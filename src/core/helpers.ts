type FalsyValue = false | '' | null | undefined;

const BLANK_REGEX = /^\s*$/;

export function isFalsy(value: any): value is FalsyValue {
  return value !== 0 && !value;
}

export function isBlank(value: any) {
  if (isFalsy(value)) {
    return true;
  }

  if (typeof value === 'string') {
    return value.length === 0 || BLANK_REGEX.test(value);
  }

  return false;
}

export function isPresent(value: any) {
  return !isBlank(value);
}

export function isNumber(value: any): value is number {
  if (isFalsy(value)) {
    return false;
  }

  const stringValue = value.toString();

  if (stringValue === '') {
    return false;
  }

  return !isNaN(Number(stringValue));
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
