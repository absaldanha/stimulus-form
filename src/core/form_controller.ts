import { Controller } from '@hotwired/stimulus';
import FieldController from './field_controller';
import config from './config';
import { ValidationContext } from './types';

export default class FormController extends Controller {
  static outlets: ['field'];

  declare readonly fieldOutlets: FieldController[];

  static get config() {
    return config;
  }

  fieldOutletConnected(outlet: FieldController, _element: Element) {
    outlet.formController = this;
  }

  get validationContext() {
    return {} as ValidationContext;
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
