import { Controller } from '@hotwired/stimulus';
import { FormController } from './form_controller';
import { ValidatorSet } from './validator_set';
import { FieldErrors } from './field_errors';
import { FieldObserver } from './observers';

export type InputTargetElement = HTMLInputElement |
  HTMLSelectElement |
  HTMLTextAreaElement;

export class FieldController extends Controller<HTMLElement> {
  static targets = ['input', 'error'];
  static values = { validations: String };
  static classes = ['error'];

  declare readonly inputTarget: InputTargetElement;
  declare readonly errorTarget: Element;
  declare readonly validationsValue: string;
  declare readonly errorClasses: string[];

  declare form: FormController;
  declare errors: FieldErrors;
  declare validatorSet: ValidatorSet;
  declare touched: boolean;

  readonly fieldObserver: FieldObserver = new FieldObserver(this);

  connect() {
    this.validatorSet = ValidatorSet.buildFromString(this.validationsValue);
    this.errors = new FieldErrors();
    this.touched = false;

    this.fieldObserver.start();
  }

  disconnect() {
    this.fieldObserver.stop();
  }

  get isValid() {
    this.validate();

    return !this.hasErrors;
  }

  get name() {
    return this.inputTarget.name;
  }

  get value() {
    return this.inputTarget.value;
  }

  get hasErrors() {
    return !this.errors.isEmpty;
  }

  get validationStrategy() {
    return this.form.validationStrategyValue;
  }

  validate() {
    this.application.logDebugActivity('field', 'validate');

    this.errors.clear();

    this.validatorSet.validate(this, this.form.validationContext);

    this.applyChanges();
  }

  touch() {
    this.touched = true;
  }

  private applyChanges() {
    this.hasErrors ? this.applyErrorChanges() : this.applySuccessChanges();
  }

  private applySuccessChanges() {
    this.element.classList.remove(...this.errorClasses);
    this.errorTarget.textContent = '';
  }

  private applyErrorChanges() {
    this.element.classList.add(...this.errorClasses);
    this.errorTarget.textContent = this.errors.fullMessage;
  }
}
