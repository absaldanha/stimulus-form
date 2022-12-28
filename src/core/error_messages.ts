import enDictionary from './locales/en.json';
import pt_BRDictionary from './locales/pt-BR.json';
import { MissingDefaultLocaleError, MissingTranslationError } from './errors';

type LocaleDictionary = Record<string, string>;
type Dictionary = {
  [key: string]: LocaleDictionary
};

export class ErrorMessages {
  locale?: string;
  private dictionary: Dictionary;

  static loadWithDefaults() {
    const errorMessages = new ErrorMessages('en');

    errorMessages.append(enDictionary, 'en');
    errorMessages.append(pt_BRDictionary, 'pt-BR');

    return errorMessages;
  }

  constructor(locale?: string) {
    this.locale = locale;
    this.dictionary = {};
  }

  append(dictionary: LocaleDictionary, locale?: string) {
    const dictLocale = locale || this.locale;

    if (!dictLocale) {
      throw new MissingDefaultLocaleError();
    }

    this.dictionary[dictLocale] = { ...this.dictionary[dictLocale], ...dictionary };
  }

  translate(key: string, variables: Record<string, unknown> = {}, locale?: string) {
    const dictLocale = locale || this.locale;

    if (!dictLocale) {
      throw new MissingDefaultLocaleError();
    }

    const localeDictionary = this.dictionary[dictLocale] || {};
    const translationString = localeDictionary[key];

    if (!translationString) {
      throw new MissingTranslationError(dictLocale, key);
    }

    return Object.entries(variables).reduce(
      (result, [variableName, variableValue]) => (
        result.replace(`%{${variableName}}`, String(variableValue))
      ),
      translationString
    )
  }
}
