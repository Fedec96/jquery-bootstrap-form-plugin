[&#8592; BootstrapForm](../../../) &nbsp; | &nbsp; [Heading &#8594;](HEADING.md)

# General settings

The general settings affect multiple elements at once in a target form if tweaked locally, or for every form that is a BootstrapForm instance if the [:link: defaults are overridden](../../../#overriding-defaults).

# Table of contents

1. [preventDefault](#preventdefault)
2. [selectSize](#selectsize)
3. [textareaRows](#textarearows)
4. [useName](#usename)
5. [validationText](#validationtext)

# preventDefault

| Type    | Default | Impact   | Required |
| ------- | ------- | -------- | -------- |
| Boolean | `true`  | `submit` | :x:      |

By default, this plugin will prevent the default submit event's propagation, resulting in no action whatsoever by the user agent if the event itself is not explicity handled within the code (see: [:link: Callbacks](CALLBACKS.md)).

To change that:

```js
preventDefault: false
```

This has no effect on the [:link: buttons' callbacks](BUTTONS.md#callbacks).

See also: [:link: onSubmit @ Callbacks](CALLBACKS.md#onsubmit)

<div align="right"><a href="#general-settings">&#8593; Back to top</a></div>

# selectSize

| Type   | Default | Impact   | Required |
| ------ | ------- | -------- | -------- |
| Number | `3`     | `select` | :x:      |

Bootstrap offers the change to render the `<select>` nodes displaying multiple options at once. With this parameter, the number of rows (hence options) that can be displayed can be customized with any value above `0`:

```js
selectSize: 6
```

```html
<select id="example-field" class="form-select" rows="6" aria-label="example-field"></select>
```

Learn more about `select`: [:link: select @ Fields](FIELDS.md#select)

<div align="right"><a href="#general-settings">&#8593; Back to top</a></div>

# textareaRows

| Type   | Default | Impact     | Required |
| ------ | ------- | ---------- | -------- |
| Number | `3`     | `textarea` | :x:      |

Easily change the default number of rows that the `<textarea>` nodes have upon creation. Customizable with any value above `0`:

```js
textareaRows: 6
```

```html
<textarea id="example-field" class="form-control" rows="6" aria-label="example-field"></textarea>
```

Learn more about `textarea`: [:link: textarea @ Fields](FIELDS.md#textarea)

<div align="right"><a href="#general-settings">&#8593; Back to top</a></div>

# useName

| Type    | Default | Impact             | Required |
| ------- | ------- | ------------------ | -------- |
| Boolean | `false` | `*` except `radio` | :x:      |

By default, the input fields generated by this plugin will use the `id` attribute as unique identifier. To give each input **also** the `name` attribute, change this setting:

```js
useName: true
```

With `useName: false`

```html
<input type="text" id="example-field" class="form-control" aria-label="example-field">
```

With `useName: true`

```html
<input type="text" id="example-field" name="example-field" class="form-control" aria-label="example-field">
```

Learn more about `radio` and the `family` property: [:link: radio @ Fields](FIELDS.md#radio)

<div align="right"><a href="#general-settings">&#8593; Back to top</a></div>

# validationText

| Type    | Default | Impact | Required |
| ------- | ------- | ------ | -------- |
| Boolean | `false` | `*`    | :x:      |

Bootstrap provides a handy set of feedback containers, both for valid and invalid feedback.

These containers can be populated with the proper feedback message, or instruction, right after the submit or while the user is interacting with the form in real time. Said containers will be always appended as the very last elements.

```js
validationText: true
```

With `validationText: false`

```html
<input type="text" id="example-field" class="form-control" aria-label="example-field">
```

With `validationText: true`

```html
<input type="text" id="example-field" class="form-control" aria-label="example-field">
<div class="valid-feedback"></div>
<div class="invalid-feedback"></div>
```

<div align="right"><a href="#general-settings">&#8593; Back to top</a></div>
