import { expect, fixture, html, nextFrame } from "@open-wc/testing"

import { Application } from "@hotwired/stimulus"
import { FormController, FieldController, MessageController } from "../"

const fixtureHtml = html`
  <form data-controller="form" data-action="submit->form#submit" data-form-field-outlet="[data-controller='field']">
    <div data-controller="field" data-field-message-outlet="[data-controller='message']">
      <input type="number" id="badInput" data-field-target="input" />
      <span data-controller="message" data-message-match-value="badInput" id="badInputMessage">
        Bad Input Detected
      </span>
    </div>

    <button type="submit">
      Submit
    </button>
  </form>
`

describe("validity matchers", async () => {
  const node = await fixture(fixtureHtml)
  const application = Application.start()
  application.register("form", FormController)
  application.register("field", FieldController)
  application.register("message", MessageController)
  await nextFrame()
  const submit = node.querySelector("button")
  const badInput = node.querySelector("#badInput")
  const badInputMessage = node.querySelector("#badInputMessage")

  expect(badInputMessage).to.be.displayed

  badInput.value = "text"

  submit.click()

  await nextFrame()

  expect(badInputMessage).to.be.displayed
})
