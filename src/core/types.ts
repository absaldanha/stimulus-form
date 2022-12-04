export type FalsyValue = false | '' | 0 | null | undefined;
export type Countable<T = unknown> = string | Array<T>;
export type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
// export interface ValidationResult {
//   success: boolean
//   error?: ValidationError
// }

export interface ValidationContext {
  fields: Record<string, string | number>
}

export interface ValidatorConstructor {
  new(options: string): Validator;
}

export interface Validator {
  validate(value: unknown, context: ValidationContext): any
}
