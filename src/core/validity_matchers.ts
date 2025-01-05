const VALIDITY_MATCHERS = [
  "badInput",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valueMissing"
] as const

export type ValidityMatcher = (validity: ValidityState, value: string, formData: FormData) => boolean
export type ValidityMatcherRegistry = Record<string, ValidityMatcher>

const validityMatchers = {
  ...VALIDITY_MATCHERS.reduce(
    (memo, matcher) => (
      { ...memo, [matcher]: (validity: ValidityState) => validity[matcher] }
    ),
    {} as ValidityMatcherRegistry
  )
}

export default validityMatchers
