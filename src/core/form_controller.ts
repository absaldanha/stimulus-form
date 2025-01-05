import { Controller } from "@hotwired/stimulus"
import { FieldController } from "./field_controller"

export class FormController extends Controller<HTMLFormElement> {
  static outlets = ["field"]

  declare readonly fieldOutlets: FieldController[]

  submit(event: SubmitEvent) {
    if (!this.validate()) {
      event.preventDefault()
    }
  }

  validate() {
    return this.fieldOutlets.reduce(
      (result, field) => field.validate() && result,
      true
    )
  }
}
