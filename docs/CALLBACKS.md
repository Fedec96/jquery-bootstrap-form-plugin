[&#8592; Buttons](BUTTONS.md) &nbsp; | &nbsp; [Utilities &#8594;](UTILS.md)

# Callbacks

[:link: Back to the main document](../../../)

Intercept specific form events.

# Table of contents

1. [Fundamentals](#fundamentals)
2. [beforeSubmit](#beforesubmit)
    - [output](#beforesubmit-output)
3. [onSubmit](#onsubmit)
    - [output](#onsubmit-output)

# Fundamentals

Whenever the data is submitted, all the values of the string type will be trimmed.

On top of that, the validation elements, such as CSS classes and feedback texts, will be wiped.

Learn more: [:link: resetValidation @ Utilities](UTILS.md#resetvalidation) [:link: trimFields @ Utilities](UTILS.md#trimfields)

<div align="right"><a href="#callbacks">&#8593; Back to top</a></div>

# beforeSubmit

| Output              | Required |
| ------------------- | -------- |
| `event`, `formData` | :x:      |

Give instructions right before the submit event.

This callback is not affected by [:link: preventDefault](SETTINGS.md#preventdefault).

```js
beforeSubmit(event, formData) {/* ... */}
```

<h2 id="beforesubmit-output">Output</h2>

As soon as the callback is triggered, the `event` and `formData` objects will be served.

The `event` object will refer to the form's native submit event.

The `formData` object will contain all the fields' identifiers paired with their respective values:

```json
{
  "example-field-1": "value",
  "example-field-2": "value",
  "example-field-3": "value",
}
```

Learn more: [:link: getFields @ Utilities](UTILS.md#getfields)

<div align="right"><a href="#callbacks">&#8593; Back to top</a></div>

# onSubmit

| Output              | Required |
| ------------------- | -------- |
| `event`, `formData` | :x:      |

Specify what happens when the data is submitted.

This callback is affected by [:link: preventDefault](SETTINGS.md#preventdefault).

```js
onSubmit(event, formData) {/* ... */}
```

<h2 id="onsubmit-output">Output</h2>

As soon as the callback is triggered, the `event` and `formData` objects will be served.

The `formData` object will contain all the fields' identifiers paired with their respective values:

```json
{
  "example-field-1": "value",
  "example-field-2": "value",
  "example-field-3": "value",
}
```

Learn more: [:link: getFields @ Utilities](UTILS.md#getfields)

<div align="right"><a href="#callbacks">&#8593; Back to top</a></div>
