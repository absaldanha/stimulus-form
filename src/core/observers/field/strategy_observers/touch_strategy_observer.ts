import { FieldController } from '../../../field_controller';
import { debounce } from '../../../helpers';

import type { StrategyObserver } from './types';

export class TouchStrategyObserver implements StrategyObserver {
  readonly field: FieldController;
  private started: boolean;

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.field.inputTarget.addEventListener('blur', this.blurListener, { once: true });
      this.field.inputTarget.addEventListener('input', this.inputListener);

      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.field.inputTarget.removeEventListener('blur', this.blurListener);
      this.field.inputTarget.removeEventListener('input', this.inputListener);

      this.started = false;
    }
  }

  blurListener = <EventListener>((_event) => {
    this.field.validate();
  });

  inputListener = <EventListener>debounce(((_event) => {
    if (this.field.touched) {
      this.field.validate();
    }
  }))
}
