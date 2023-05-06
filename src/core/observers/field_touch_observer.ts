import { FieldController } from '../field_controller';
import { ValidationStrategy } from '../validation_strategy';

export class FieldTouchObserver {
  readonly field: FieldController;
  private started: boolean

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (this.field.validationStrategy !== ValidationStrategy.Touch) {
      return;
    }

    if (!this.started) {
      this.field.inputTarget.addEventListener('blur', this.blurListener, { once: true });
      this.field.inputTarget.addEventListener('input', this.inputListener);
      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.field.inputTarget.removeEventListener('input', this.inputListener);
      this.field.inputTarget.removeEventListener('blur', this.blurListener);
      this.started = false;
    }
  }

  blurListener = <EventListener>((_event) => {
    if (!this.field.touched) {
      this.field.touch();
      this.field.validate();
    }
  });

  inputListener = <EventListener>((_event) => {
    if (this.field.touched) {
      this.field.validate();
    }
  });
}
