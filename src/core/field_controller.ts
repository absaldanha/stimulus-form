import { Controller } from "@hotwired/stimulus"
import { MessageController } from "./message_controller"

type FieldInputTargetElement = HTMLInputElement |
  HTMLSelectElement |
  HTMLTextAreaElement

export class FieldController extends Controller {
  static targets = ["input"]
  static outlets = ["message"]

  declare readonly inputTarget: FieldInputTargetElement
  declare readonly messageOutlets: MessageController[]

  validate() {
    this.showMessages()
    this.#updateInputValidAttribute()

    return this.isValid
  }

  showMessages() {
    const formData = this.inputTarget.form ? new FormData(this.inputTarget.form) : new FormData()

    this.messageOutlets.forEach((message) => {
      if (message.match(this.validity, this.inputTarget.value, formData)) {
        message.show()
      } else {
        message.hide()
      }
    })
  }

  get validity() {
    return this.inputTarget.validity
  }

  get isValid() {
    return this.validity.valid
  }

  #updateInputValidAttribute() {
    if (this.isValid) {
      this.inputTarget.dataset.valid = ""
      delete this.inputTarget.dataset.invalid
    } else {
      this.inputTarget.dataset.invalid = ""
      delete this.inputTarget.dataset.valid
    }
  }
}
