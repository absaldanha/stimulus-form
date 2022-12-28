export class BaseError extends Error {}

export class UnknownValidatorError extends BaseError {
  constructor(identifier: string) {
    super(`No known validator identified by '${identifier}'. Register a new validator with \`validatorRegistry.add\``);
  }
}

export class MissingDefaultLocaleError extends BaseError {
  constructor() {
    super(`Missing default locale for error messages. Set a default locale with \`errorMessages.locale=\``);
  }
}

export class MissingTranslationError extends BaseError {
  constructor(locale: string, key: string) {
    super(`Missing translation for key '${key}' with locale '${locale}'. Append a new translation with \`errorMessages.append\``);
  }
}

export class InvalidValidatorOptions extends BaseError {}
