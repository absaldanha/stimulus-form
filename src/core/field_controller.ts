import { Controller } from '@hotwired/stimulus';
import FormController from './form_controller';
import ValidatorSet from './validator_set';
import ValidationError from './validation_error';

import type { InputElement } from './types';

export default class FieldController extends Controller {
  static targets = ['input', 'error'];

  declare formController: FormController;
  declare errors: ValidationError[];
  declare validatorSet: ValidatorSet
  declare readonly hasInputTarget: boolean;
  declare readonly inputTarget: InputElement;
  declare readonly errorTarget: Element;

  connected() {
    // this.validators = ValidatorBuilder.buildFromString(this.inputValidations);
    this.validatorSet = ValidatorSet.buildFromString(this.inputValidations);
    this.errors = []
  }

  get isValid() {
    this.validate();

    return !this.hasErrors;
  }

  get value() {
    return this.inputTarget.value;
  }

  get hasErrors() {
    return this.errors.length === 0;
  }

  validate() {
    this.clearErrors();

    const results = this.validatorSet.validate(this.value, this.validationContext);
    const errorResults = results.filter(({ success }) => !success);

    this.errors = errorResults.map(({ error }) => error);

    this.applyDocumentChanges();
  }

  private get inputValidations() {
    return this.inputTarget.dataset.validations || '';
  }

  private applyDocumentChanges() {
    this.hasErrors ? this.applyErrorChanges() : this.applySuccessChanges();
  }

  private applySuccessChanges() {
    this.element.classList.remove('validation-error');
    this.errorTarget.textContent = '';
  }

  private applyErrorChanges() {
    this.element.classList.add('validation-error');
    this.errorTarget.textContent = this.errors[0].message;
  }

  private clearErrors() {
    this.errors = [];
  }

  private get validationContext() {
    return this.formController.validationContext;
  }
}
