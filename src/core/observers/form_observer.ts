import { FormController } from '../form_controller';

export class FormObserver {
  readonly form: FormController;
  private started: boolean

  constructor(form: FormController) {
    this.form = form;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.form.element.addEventListener('submit', this.submitListener);
      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.form.element.removeEventListener('submit', this.submitListener);
      this.started = false;
    }
  }

  submitListener = <EventListener>((event: SubmitEvent) => {
    if (!this.form.validate()) {
      event.preventDefault();
    }
  });
}
