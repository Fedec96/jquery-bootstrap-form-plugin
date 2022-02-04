[&#8592; Callbacks](CALLBACKS.md) &nbsp; | &nbsp; [Usage example &#8594;](EXAMPLE.md)

# Utilities

[:link: Back to the main document](../../../)

Take advantage of some handful public methods that will interact with the form's element and values.

See also: [:link: Instance @ BootstrapForm](../../../#instance)

# Table of contents

1. [emptyForm](#emptyform)
2. [getFields](#getfields)
3. [getInstance](#getinstance)
4. [resetForm](#resetform)
5. [resetValidation](#resetvalidation)
6. [trimFields](#trimfields)

# emptyForm

Remove all the form's children element, allowing to start from scratch.

> :warning: This will also delete the element's instance of this plugin.

### Example

```html
<form id="form">
  <div class="mb-3">
    <input type="text" id="example-field" class="form-control" aria-label="example-field">
  </div>
</form>
```

```js
$('#form').bootstrapForm('emptyForm');
```

### Result

```html
<form id="form"></form>
```

<div align="right"><a href="#utilities">&#8593; Back to top</a></div>

# getFields

| Type(s)              | Output  |
| -------------------- | ------- |
| `checkbox`, `switch` | Boolean |
| `file`               | String  |
| `number`, `range`    | Number  |
| `radio`              | Array   |
| All the others       | String  |

Retrieve a JSON of all the inputs' values, paired with their respective ID.

### Example

```js
$('#form').bootstrapForm('getFields');
```

Example output cheatsheet:

```json
{
  "checkbox-checked": true,
  "checkbox-indeterminate": false,
  "checkbox-unchecked": false,
  "color-novalue": "#000000",
  "color-value": "#ff0000",
  "email-novalue": "",
  "email-value": "admin@localhost",
  "file-novalue": "",
  "file-value": "file.ext",
  "file-multiple-novalue": [],
  "file-multiple-value": ["file1.ext", "file2.ext",],
  "list-novalue": "",
  "list-value": "Option #1",
  "number-novalue": 0,
  "number-value": 3,
  "password-novalue": "",
  "password-value": "root",
  "radio-unchecked": ["1", false,],
  "radio-checked": ["2", true,],
  "range": 50,
  "select-novalue": "",
  "select-value": "0",
  "switch-checked": true,
  "switch-unchecked": false,
  "text-novalue": "",
  "text-value": "text",
  "textarea-novalue": "",
  "textarea-value": "Lorem ipsum",
}
```

<div align="right"><a href="#utilities">&#8593; Back to top</a></div>

# getInstance

Return a single element's plugin parameters, that can be freely manipulated later.

### Example

```js
$('#form').bootstrapForm('getInstance');
```

```js
{
  preventDefault: true,
  fields: {/* ... */},
  buttons: {/* ... */},
}
```

<div align="right"><a href="#utilities">&#8593; Back to top</a></div>

# resetForm

Reset all the inputs' values according to their type.

> :warning: For the `number` and `range` types, if a `min` property was specified, the value will be reset according to that attribute.

### Example

```js
$('#form').bootstrapForm('resetForm');
```

Example output cheatsheet:

```json
{
  "checkbox-checked": false,
  "checkbox-indeterminate": false,
  "checkbox-unchecked": false,
  "color-novalue": "#000000",
  "color-value": "#000000",
  "email-novalue": "",
  "email-value": "",
  "file-novalue": "",
  "file-value": "",
  "file-multiple-novalue": [],
  "file-multiple-value": [],
  "list-novalue": "",
  "list-value": "",
  "number-novalue": 0,
  "number-value": 0,
  "password-novalue": "",
  "password-value": "",
  "radio-unchecked": ["1", false,],
  "radio-checked": ["2", false,],
  "range": 50,
  "select-novalue": "",
  "select-value": "0",
  "switch-checked": false,
  "switch-unchecked": false,
  "text-novalue": "",
  "text-value": "",
  "textarea-novalue": "",
  "textarea-value": "",
}
```

<div align="right"><a href="#utilities">&#8593; Back to top</a></div>

# resetValidation

Remove all the validation-related classes from each single input, along with any feedback text. Works for both valid and invalid scenarios.

Classes removed from the input fields: `is-valid`, `is-invalid`.

Cleared containers: `valid-feedback`, `invalid-feedback`.

### Example

```html
<form id="form">
  <div class="mb-3">
    <input type="text" id="example-field" class="form-control is-invalid" aria-label="example-field">
    <div class="valid-feedback"></div>
    <div class="invalid-feedback">This field cannot be empty.</div>
  </div>
</form>
```

```js
$('#form').bootstrapForm('resetValidation');
```

### Result

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control" aria-label="example-field">
  <div class="valid-feedback"></div>
  <div class="invalid-feedback"></div>
</div>
```

<div align="right"><a href="#utilities">&#8593; Back to top</a></div>

# trimFields

Trim all the input values that are of the string type.

### Example

```js
$('#form').bootstrapForm('trimFields');
```

<div align="right"><a href="#utilities">&#8593; Back to top</a></div>
