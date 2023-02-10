import { ValidatorRegistry } from './validator_registry';
import { ErrorMessages } from './error_messages';

export const validatorRegistry = new ValidatorRegistry();
export const errorMessages = ErrorMessages.loadWithDefaults();
