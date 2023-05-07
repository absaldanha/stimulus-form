import { FieldController } from '../../field_controller';
import { debounce } from '../../helpers';

export class InputObserver {
  readonly field: FieldController;
  private started: boolean

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.field.inputTarget.addEventListener('input', this.listener);

      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.field.inputTarget.removeEventListener('input', this.listener);

      this.started = false;
    }
  }

  listener = debounce(<EventListener>((_event) => {
    if (this.field.touched) {
      this.field.validate();
    }
  }));
}
