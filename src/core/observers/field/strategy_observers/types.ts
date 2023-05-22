import { FieldController } from '../../../field_controller';

export interface StrategyObserverConstructor {
  new(field: FieldController): StrategyObserver;
}

export interface StrategyObserver {
  start(): void;
  stop(): void;
}
