import { Application, Controller } from '@hotwired/stimulus';
import { FieldController } from './field_controller';
import { ValidationContext } from './validation_context';
import { FormObserver } from './observers';
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
  readonly formObserver: FormObserver = new FormObserver(this);

  static afterLoad(_identifier: string, application: Application) {
    application.register('field', FieldController);
  }

  connect() {
    this.formObserver.start();
  }

  disconnect() {
    this.formObserver.stop();
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
