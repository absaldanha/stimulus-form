import { FormController } from './form_controller';

export class ValidationContext {
  private form: FormController;

  constructor(form: FormController) {
    this.form = form;
  }

  getFieldValueByName(name: string) {
    const field = this.findFieldByName(name);

    if (field) {
      return field.value;
    }
  }

  private findFieldByName(name: string) {
    return this.formFields.find((field) => field.name === name);
  }

  private get formFields() {
    return this.form.fieldOutlets;
  }
}
