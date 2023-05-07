import { FieldController } from '../field_controller';
import { ValidationStrategy } from '../validation_strategy';
import { BlurObserver, InputObserver, SubmitObserver } from './field';

export class FieldObserver {
  readonly field: FieldController;
  readonly blurObserver: BlurObserver;
  readonly inputObserver: InputObserver;
  readonly submitObserver: SubmitObserver;

  private started: boolean

  constructor(field: FieldController) {
    this.field = field;
    this.started = false;

    this.blurObserver = new BlurObserver(field);
    this.inputObserver = new InputObserver(field);
    this.submitObserver = new SubmitObserver(field);
  }

  start() {
    if (!this.started) {
      if (this.field.validationStrategy === ValidationStrategy.Touch) {
        this.blurObserver.start();
        this.inputObserver.start();
      }

      this.submitObserver.start();

      this.started = true;
    }
  }

  stop() {
    if (this.started) {
      this.blurObserver.stop();
      this.inputObserver.stop();
      this.submitObserver.stop();

      this.started = false;
    }
  }
}
