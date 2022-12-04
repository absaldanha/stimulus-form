import config from './config';

import type { ValidationContext, Validator } from './types';

const { validatorRegistry } = config;

export default class ValidationSet {
  public validators: Validator[];

  static buildFromString(validatorsString: string) {
    const validatorsArray = validatorsString.split(' ');

    const validators = validatorsArray.map((validator) => {
      const [identifier, ...rest] = validator.split(':');
      const options = rest.join(':');
      const FetchedValidator = validatorRegistry.fetch(identifier);

      return new FetchedValidator(options);
    });

    return new ValidationSet(validators);
  }

  constructor(validators?: Validator[]) {
    this.validators = validators || [];
  }

  validate(value: unknown, context: ValidationContext) {
    return this.validators.map(
      (validator) => validator.validate(value, context)
    );
    // const validationErrorResults = results.filter(({ success }) => !success);
  }
}
