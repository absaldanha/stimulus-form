import { FieldController } from '../../field_controller';

export class BlurObserver {
  readonly field: FieldController;
  private started: boolean

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.field.inputTarget.addEventListener('blur', this.listener);

      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.field.inputTarget.removeEventListener('blur', this.listener);

      this.started = false;
    }
  }

  listener = <EventListener>((_event) => {
    if (!this.field.touched) {
      this.field.touch();
      this.field.validate();
    }
  });
}
