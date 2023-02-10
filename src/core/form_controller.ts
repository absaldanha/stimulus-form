import { Application, Controller } from '@hotwired/stimulus';
import { FieldController } from './field_controller';
import { ValidationContext } from './validation_context';

import './validators';

export class FormController extends Controller<HTMLFormElement> {
  static outlets = ['field'];

  declare readonly fieldOutlets: FieldController[];

  readonly validationContext: ValidationContext = new ValidationContext(this);

  static afterLoad(_identifier: string, application: Application) {
    application.register('field', FieldController);
  }

  fieldOutletConnected(outlet: FieldController, _element: Element) {
    outlet.form = this;
  }

  submit(event: Event) {
    if (!this.isValid) {
      event.preventDefault();
    }
  }

  private get isValid() {
    return this.fieldOutlets.reduce(
      (result, outlet) => outlet.isValid && result,
      true
    );
  }
}
