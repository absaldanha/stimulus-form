import { FieldController } from '../../field_controller';

export class SubmitObserver {
  readonly field: FieldController;
  private started: boolean

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.form.element.addEventListener('submit', this.listener, { once: true });

      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.form.element.removeEventListener('submit', this.listener);

      this.started = false;
    }
  }

  listener = <EventListener>((_event) => {
    this.field.touch();
  });

  private get form() {
    return this.field.form;
  }
}
