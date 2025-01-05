import { Controller } from "@hotwired/stimulus"
import validityMatchers, { type ValidityMatcherRegistry } from "./validity_matchers"

export class MessageController extends Controller<HTMLElement> {
  static validityMatchers: ValidityMatcherRegistry = validityMatchers

  static values = { show: Boolean, match: String }
  static classes = ["show"]

  declare showValue: boolean
  declare readonly matchValue: string
  declare readonly showClasses: string[]

  showValueChanged(newValue: boolean) {
    if (newValue) {
      this.element.classList.add(...this.showClasses)
      this.element.style.display = "block"
    } else {
      this.element.classList.remove(...this.showClasses)
      this.element.style.display = "none"
    }
  }

  match(validity: ValidityState, value: string, formData: FormData) {
    const matcher = MessageController.validityMatchers[this.matchValue]

    return matcher(validity, value, formData)
  }

  show() {
    this.showValue = true
  }

  hide() {
    this.showValue = false
  }
}
