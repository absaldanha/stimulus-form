import { FieldController } from '../../../field_controller';
import { debounce } from '../../../helpers';

import type { StrategyObserver } from './types';

export class SubmitStrategyObserver implements StrategyObserver {
  readonly field: FieldController;
  private started: boolean;

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.field.inputTarget.addEventListener('input', this.inputListener);

      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.field.inputTarget.removeEventListener('input', this.inputListener);

      this.started = false;
    }
  }

  inputListener = <EventListener>debounce(((_event) => {
    if (this.form.submitted) {
      this.field.validate();
    }
  }))

  private get form() {
    return this.field.form;
  }
}
