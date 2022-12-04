import ValidatorRegistry from './validator_registry';

class Config {
  private _errorElementClass: string = '.error-message';
  public validatorRegistry = new ValidatorRegistry();

  get errorElementClass() {
    return this._errorElementClass;
  }

  set errorElementClass(newValue: string) {
    this._errorElementClass = newValue
  }
}

const config = new Config();

export default config;
