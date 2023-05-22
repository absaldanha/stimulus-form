import { FieldController } from '../field_controller';
import {
  DefaultObserver,
  BlurStrategyObserver,
  SubmitStrategyObserver,
  TouchStrategyObserver
} from './field';
import { ValidationStrategy } from '../validation_strategy';

import type { StrategyObserverConstructor, StrategyObserver } from './field/strategy_observers';

export class FieldObserver {
  readonly field: FieldController;
  readonly strategyObserver: StrategyObserver;
  readonly defaultObserver: DefaultObserver;

  constructor(field: FieldController) {
    this.field = field;

    this.defaultObserver = new DefaultObserver(this.field);
    this.strategyObserver = this.fetchStrategyObserver();
  }

  start() {
    this.defaultObserver.start();
    this.strategyObserver.start();
  }

  stop() {
    this.defaultObserver.stop();
    this.strategyObserver.stop();
  }

  private fetchStrategyObserver() {
    let StrategyObserver: StrategyObserverConstructor;

    if (this.validationStrategy === ValidationStrategy.Blur) {
      StrategyObserver = BlurStrategyObserver;
    } else if (this.validationStrategy === ValidationStrategy.Touch) {
      StrategyObserver = TouchStrategyObserver;
    } else {
      StrategyObserver = SubmitStrategyObserver;
    }

    return new StrategyObserver(this.field);
  }

  private get validationStrategy() {
    return this.field.validationStrategy;
  }
}
