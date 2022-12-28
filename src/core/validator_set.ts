import { FieldController }  from './field_controller';
import { ValidationContext } from './validation_context';
import { validatorRegistry } from './config';
import { isPresent } from './helpers';

import type { Validator } from './validators';

export class ValidatorSet {
  readonly validators: Validator[];

  static buildFromString(validatorsString: string) {
    const validatorsArray = validatorsString.split(' ').filter(isPresent);

    const validators = validatorsArray.map((validator) => {
      const [identifier, ...rest] = validator.split(':');
      const options = rest.join(':');
      const FetchedValidator = validatorRegistry.fetch(identifier);

      return new FetchedValidator(options);
    });

    return new ValidatorSet(validators);
  }

  constructor(validators?: Validator[]) {
    this.validators = validators || [];
  }

  validate(field: FieldController, context: ValidationContext) {
    this.validators.forEach((validator) => validator.validate(field, context));
  }
}
