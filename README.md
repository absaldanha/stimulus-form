# StimulusForm

A simple form validation library for the `<form>` you already have.

## Getting Started

To install StimulusForm in your application, add the `stimulus_form` npm package to your JavaScript bundle.

`@hotwired/stimulus` version 3.2 or greater is required because of its dependency on the [Outlet API](https://stimulus.hotwired.dev/reference/outlets).


## Usage
### Controller Registration
Import and register `FormController` on your Stimulus application:

```javascript
import { Application } from  '@hotwired/stimulus';
import { FormController } from  'stimulus_form';

const  app = Application.start();

app.register('form', FormController);
```

This library is composed of two Stimulus controllers designed to work with your forms:

- `FormController`: is the "coordinator" controller, responsible for orchestrating the validation of all the form fields before an submission, preventing it if there are invalid fields. It's controller action is `submit`, usually added to the form submit button.
- `FieldController`: the individual field controller, responsible for the field validations. It is automatically registered with the `field` identifier when `FormController` is registered. It's controller action is `validate`, usually added as response to events related to the input, such as the blur event.

You can write your HTML forms as usual, adding your new controllers like you normally do with any Stimulus controller:

```html
<form data-controller="form" data-form-field-outlet=".field">
	<div
		class="field"
		data-controller="field"
		data-field-validations-value="required"
		data-field-error-class="field-error"
	>
		<input name="field_name" data-field-target="input" data-action="blur->field#validate">
		<div data-field-target="error"></div>
	</div>

	<button type="submit" data-action="form#submit">Send</button>
</form>
```
### Fields

`stimulus_form` uses Stimulus [Outlet API](https://stimulus.hotwired.dev/reference/outlets) to connect all your form fields (connected to an `FieldController`) to your form (connected to an `FormController`). Because of this, your `<form>` element must have an `data-form-field-outlet` attribute, and its value must be an valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) which you can to refer to your fields. In the example above, we used the `.field` CSS selector, indicating that our fields are identified by the `field` CSS class.

### Validations

Field validations are specified with the `data-field-validations-value` attribute. It is a space-separated list of validator identifiers. There are many [built-in](#built-in-validators) validators shipped with the library, and you can [build and register your own validators](#custom-validators).

### Targets

There are two `FieldController` targets, using the `data-field-target` attribute, that you must add to your HTML so your form validations work correctly:

- `input` : specifies the field *input element*, which can be an `<input>`, `<select>` or `<textarea>` element. This is where the controller will fetch the value and validate it against your list of validations.
- `error`: specifies the element where eventual errors will be displayed to your user in case the validation fails.

### Actions

There are two controller actions that you can use on your form in order to trigger its validation behavior:

- `FormController#submit`: its the action that will validate your entire form, preventing its submission in case any field validation fails.
- `FieldController#validate`: its the action that will validate an individual field against the specified validations. It will automatically mark the field as invalid and show any validation error to your user.

### Error Class

When an field is marked as invalid, you can configure which CSS classes will be added to the field element. You can configure it with the `data-field-error-class` attribute, and it accepts an space-separated list of classes that will be toggled when a field is valid or invalid.

## Validators

### Built-in Validators

`stimulus_form` ships with many validators ready to be used on your forms. Note that some validations require some options that must be specified with an semicolon separator e.g. `max-length:10`, `gt:5`, `eq:foo`

| Identifier | Description | Example |
|--|--|--|
| `required` | Verify if the value is not `null`, `false`, `undefined` or an empty string | `required` |
| `length` | Verify if the value character length is equal to the given number | `length:100` |
| `max-length` | Verify if the value character length does not exceed the given limit | `max-length:50` |
| `min-length` | Verify if the value character length is not under the given limit | `min-length:10` |
| `gt` | Verify if the value is greater than the given number | `gt:17` |
| `gteq` | Verify if the value is greater than or equal to the given number | `gteq:18` |
| `lt` | Verify if the value is less than the specified number | `lt:40` |
| `lteq` | Verify if the value is less than or equal to the given number | `lteq:50` |
| `eq` | Verify if the value is equal to the given value | `eq:foo` |
| `not-eq` | Verify if the value is different than the given value | `not-eq:bar` |
| `format` | Verify if the value conforms to the given format (as an Regex). An special option `email` can be given to validate against an email format | `format:^bar.*foo$` or `format:email` |
| `confirmation` | Verify if the value is equal to another field value with the given name | `confirmation:password` |

### Custom Validators

You can build your own validators and register them to be used on your forms. Custom validators must implement the `ValidatorConstructor` and `Validator` interfaces and be added to the `validatorRegistry` with an unique identifier to be used on your `data-field-validations-value` attribute. For example:

```typescript
import { validatorRegistry, ValidationContext } from 'stimulus_form';
import type { Validator, ValidatorConstructor } from 'stimulus_form';

// The Validator interface specifies only one method `validate` that has the signature:
// validate(field: FieldController, validationContext: ValidationContext)
class MinAgeValidator implements Validator {
	age: string;

	// The ValidatorConstructor interface specifies your custom validator interface,
	// which must receive a string as argument, the options you specify after the semicolon
	// e.g with a identifer `age:16`
	constructor(options: string) {
		this.age = Number(options);
	}
	
	// The validate method needs to add an error to the given field in order to
	// mark it as invalid. The `FieldController` has an `errors` attribute where
	// you can add a new error just like the example below.
	validate(field: FieldControler, _validationContext: ValidationContext) {
		const currentDateYear = new Date().getFullYear();
		const fieldDateYear = new Date(field.value).getFullYear();

		if ((currentDateYear - fieldDateYear) < this.age) {
			field.errors.add('invalid');
		}
	}
}

validatorRegistry.add('age', MinAgeValidator);
```
Now you can use `age:18` on your fields just like any other built-in validator.

## Error messages
`stimulus_form` ships with error messages for all built-in validators, in the `en` and `pt-BR` locales (defaults to `en`). You can change or add new messages or change the locale with the `errorMessages` object:

```typescript
import { errorMessages } from 'stimulus_form';

// Adds a new message to the `foo` key to the current configured locale (en by default).
errorMessages.append({ foo: 'this is foo' });

// Adds a new message to the `foo` key to the pt-BR locale.
errorMessages.append({ foo: 'isso é foo' }, 'pt-BR');

// Adds a new message to the `foo` key to the fr locale.
errorMessages.append({ foo: "c'est fou" }, 'fr');

// Sets the current locale to be used to fr
errorMessages.locale = 'fr';
```

For reference on the keys used by the built-in validators, please refer to the used [locale files]().

## Development
