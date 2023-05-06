import { Application, Controller } from '@hotwired/stimulus';
import { FieldController } from './field_controller';
import { ValidationContext } from './validation_context';
import { FormSubmitObserver } from './observers';
import { ValidationStrategy } from './validation_strategy';

import './validators';

export class FormController extends Controller<HTMLFormElement> {
  static outlets = ['field'];
  static values = {
    validationStrategy: { type: String, default: ValidationStrategy.Submit }
  };

  declare readonly fieldOutlets: FieldController[];
  declare readonly validationStrategyValue: ValidationStrategy;

  readonly validationContext: ValidationContext = new ValidationContext(this);
  readonly formSubmitObserver: FormSubmitObserver = new FormSubmitObserver(this);

  static afterLoad(_identifier: string, application: Application) {
    application.register('field', FieldController);
  }

  connect() {
    this.formSubmitObserver.start();
  }

  disconnect() {
    this.formSubmitObserver.stop();
  }

  fieldOutletConnected(outlet: FieldController) {
    outlet.form = this;
  }

  validate() {
    return this.fieldOutlets.reduce(
      (result, outlet) => outlet.isValid && result,
      true
    );
  }
}
