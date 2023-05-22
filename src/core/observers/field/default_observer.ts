import { FieldController } from '../../field_controller';

export class DefaultObserver {
  readonly field: FieldController;
  private started: boolean;

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.field.inputTarget.addEventListener('blur', this.blurListener, { once: true });
      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.field.inputTarget.removeEventListener('blur', this.blurListener);
      this.started = false;
    }
  }

  blurListener = <EventListener>((_event) => {
    this.field.touch();
  });
}
