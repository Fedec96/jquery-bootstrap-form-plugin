[&#8592; Heading](HEADING.md) &nbsp; | &nbsp; [Buttons &#8594;](BUTTONS.md)

# Fields

[:link: Back to the main document](../../../)

Draw and customize every possible type of field, from the most traditional to the more artificial ones.

This part is one of the two requirements for this plugin to work, as stated in the [:link: fundamentals](../../../#fundamentals).

# Table of contents

1. [Fundamentals](#fundamentals)
2. [General properties](#general-properties)
    - [dimension](#dimension)
    - [disabled](#disabled)
    - [plain](#plain)
    - [readonly](#readonly)
    - [required](#required)
    - [value](#value)
3. [Labels](#labels)
    - [text](#label-text)
    - [floating](#floating)
4. [Field types](#field-types)
    - [checkbox](#checkbox) ([checked](#checkbox-checked), [indeterminate](#indeterminate), [inline](#checkbox-inline))
    - [color](#color)
    - [email](#email)
    - [file](#file) ([accept](#accept), [multiple](#file-multiple))
    - [list](#list) ([Default value](#list-default-value))
    - [number](#number) ([min & max](#number-min-and-max), [step](#number-step))
    - [password](#password)
    - [radio](#radio) ([checked](#radio-checked), [inline](#radio-inline))
    - [range](#range) ([min & max](#range-min-and-max), [step](#range-step))
    - [select](#select) ([Default value](#select-default-value), [multiple](#select-multiple), [size](#size))
    - [switch](#switch) ([checked](#switch-checked), [inline](#switch-inline))
    - [text](#type-text)
    - [textarea](#textarea) ([rows](#rows))
5. [Accessories](#accessories)
    - [help](#help)
    - [section](#section)
6. [Additional attributes](#additional-attributes)

# Fundamentals

Create a simple input field just by declaring its identifier within the `fields` object:

```js
'example-field': {}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control" aria-label="example-field">
</div>
```

Each field, along with all its related elements, will be wrapped in a `<div>` node.

If no `type` is specified, `text` will be automatically assumed.

Every field will have the `aria-label` attribute, which will contain the field's identifier if no custom content is specified in an [additional attribute](#additional-attributes). The `aria-label` attribute will also drop by default for fields which have been provided a [label](#labels).

&nbsp;

> :warning: If a specific type other than `text` is declared but not all the type-related validity conditions are met, the field will be rendered as a basic `text` input.

&nbsp;

Learn more: [Field types](#field-types)

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

# General properties

There are many properties that can be given to fields, which can be combined according to specific rules. Some properties are tied to a specific field type, but most of them are not.

## dimension

| Type   | Output    | Default | Compatibility                                              | Required |
| ------ | --------- | ------- | ---------------------------------------------------------- | -------- |
| String | CSS class | `false` | `*` except `checkbox`, `color`, `radio`, `range`, `switch` | :x:      |

This property will have no effect at all if the [floating label](#floating) is enabled.

### Small

```js
'example-field': {
  dimension: 'sm',
}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control form-control-sm" aria-label="example-field">
</div>
```

### Large

```js
'example-field': {
  dimension: 'lg',
}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control form-control-lg" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## disabled

| Type    | Output       | Default | Compatibility | Required |
| ------- | ------------ | ------- | ------------- | -------- |
| Boolean | DOM property | `false` | `*`           | :x:      |

> :warning: `disabled` and `readonly` are incompatible. When both are declared as `true`, the former wins over the latter.

```js
'example-field': {
  disabled: true,
}
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## plain

| Type    | Output    | Default | Compatibility                                   | Required |
| ------- | --------- | ------- | ----------------------------------------------- | -------- |
| Boolean | CSS class | `false` | `*` except `checkbox`, `file`, `radio`, `range` | :x:      |

The element will look completely as a plain string, instead of an actual input field. It is best paired with the `readonly` property, but it's not strictly necessary.

```js
'example-field': {
  plain: true,
}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control-plaintext" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## readonly

| Type    | Output       | Default | Compatibility                                            | Required |
| ------- | ------------ | ------- | -------------------------------------------------------- | -------- |
| Boolean | DOM property | `false` | `*` except `checkbox`, `color`, `file`, `radio`, `range` | :x:      |

> :warning: `readonly` and `disabled` are incompatible. When both are declared as `true`, the latter wins over the former.

```js
'example-field': {
  readonly: true,
}
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## required

| Type    | Output       | Default | Compatibility | Required |
| ------- | ------------ | ------- | ------------- | -------- |
| Boolean | DOM property | `false` | `*`           | :x:      |

```js
'example-field': {
  required: true,
}
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## value

| Type  | Output       | Default     | Compatibility                           | Required |
| ----- | ------------ | ----------- | --------------------------------------- | -------- |
| Mixed | DOM property | `undefined` | `*` except `checkbox`, `file`, `switch` | :x:      |

Values of the **boolean** and **object** type are not allowed.

```js
'example-field': {
  value: 'value',
}
```

```js
'example-field': {
  value: 5,
}
```

```js
'example-field': {
  value: '#ff0000',
}
```

&nbsp;

> :warning: The `color` input requires a value of the **string** type, which must be a 7-characters HEX color.

> :warning: The `list` input requires a value that is among its options.

> :warning: The `number` input requires a value of the **number** type.

> :warning: The `radio` input requires a value of the **number** or **string** type. The **number** must be **greater than `0`**.

> :warning: The `range` input requires a value of the **number** type, **which must start from `0`**.

> :warning: If a `list`/`select` element has been given a default value, this property will be ignored.

&nbsp;

See also: [checked (checkbox)](#checkbox-checked), [checked (radio)](#radio-checked), [checked (switch)](#switch-checked), [Default value (list)](#list-default-value), [Default value (select)](#select-default-value)

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

# Labels

Optional element that can be paired with any input field.

<h2 id="label-text">text</h2>

| Type   | Output    | Default     | Compatibility | Required           |
| ------ | --------- | ----------- | ------------- | ------------------ |
| String | HTML node | `undefined` | `*`           | :heavy_check_mark: |

For all the field types except `checkbox`, `radio` and `switch`, it will be placed **before** the input element:

```js
'example-field': {
  label: {
    text: 'Example label',
  },
}
```

```html
<div class="mb-3">
  <label for="example-field" class="form-label">Example label</label>
  <input type="text" id="example-field" class="form-control">
</div>
```

For the `checkbox`, `radio` and `switch` types, it will be placed **after** the input element:

```js
'example-field': {
  type: 'checkbox',
  label: {
    text: 'Example label',
  },
}
```

```html
<div class="mb-3 form-check">
  <input type="checkbox" id="example-field" class="form-check-input">
  <label for="example-field" class="form-check-label">Example label</label>
</div>
```

## floating

| Type    | Output    | Default | Compatibility                                                      | Required |
| ------- | --------- | ------- | ------------------------------------------------------------------ | -------- |
| Boolean | CSS class | `false` | `*` except `checkbox`, `color`, `file`, `radio`, `range`, `switch` | :x:      |

Create a floating label, displaying it within the field itself. The label will always be placed **after** the input element.

This property is intended to be paired with a `placeholder` attribute for the best result, but it's not strictly necessary.

```js
'example-field': {
  label: {
    text: 'Example label',
    floating: true,
  },
}
```

```html
<div class="mb-3 form-floating">
  <input type="text" id="example-field" class="form-control">
  <label for="example-field">Example label</label>
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

# Field types

Use the `type` property to create a specific field with its own rules of behavior and compatibility. This property can be entirely omitted if the expected output is a field of the `text` type.

## checkbox

```js
'example-field': {
  type: 'checkbox',
}
```

```html
<div class="mb-3 form-check">
  <input type="checkbox" id="example-field" class="form-check-input" aria-label="example-field">
</div>
```

<h3 id="checkbox-checked">checked</h3>

| Type    | Output       | Default | Required |
| ------- | ------------ | ------- | -------- |
| Boolean | DOM property | `false` | :x:      |

```js
'example-field': {
  type: 'checkbox',
  checked: true,
}
```

### indeterminate

| Type    | Output       | Default  | Required |
| ------- | ------------ | -------- | -------- |
| Boolean | DOM property | `false`  | :x:      |

An indeterminate checkbox counts as **unchecked**.

If both `checked` and `indeterminate` are both set to `true`, only the first of the two property will take any effect.

```js
'example-field': {
  type: 'checkbox',
  indeterminate: true,
}
```

<h3 id="checkbox-inline">inline</h3>

| Type    | Output    | Default | Required |
| ------- | --------- | ------- | -------- |
| Boolean | CSS class | `false` | :x:      |

The checkboxes will be displayed inline rather than being stacked like a list.

```js
'example-field': {
  type: 'checkbox',
  inline: true,
}
```

```html
<div class="form-check form-check-inline">
  <input type="checkbox" id="example-field" class="form-check-input" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## color

```js
'example-field': {
  type: 'color',
}
```

```html
<div class="mb-3">
  <input type="color" id="example-field" class="form-control form-control-color" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## email

```js
'example-field': {
  type: 'email',
}
```

```html
<div class="mb-3">
  <input type="email" id="example-field" class="form-control" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## file

```js
'example-field': {
  type: 'file',
}
```

```html
<div class="mb-3">
  <input type="file" id="example-field" class="form-control" aria-label="example-field">
</div>
```

### accept

| Type  | Output         | Default     | Required |
| ----- | -------------- | ----------- | -------- |
| Array | HTML attribute | `undefined` | :x:      |

This property controls which file extensions and types can be uploaded.

```js
'example-field': {
  type: 'file',
  accept: ['.pdf', '.docx', 'application/msword',],
}
```

```html
<div class="mb-3">
  <input type="file" id="example-field" class="form-control" accept=".pdf,.docx,application/msword" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

<h3 id="file-multiple">multiple</h3>

| Type    | Output       | Default | Required |
| ------- | ------------ | ------- | -------- |
| Boolean | DOM property | `false` | :x:      |

The input field will allow a multiple files selection.

```js
'example-field': {
  type: 'file',
  multiple: true,
}
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## list

| Property  | Type   | Output         | Default     | Required           |
| --------- | ------ | -------------- | ----------- | ------------------ |
| `list`    | String | HTML attribute | `undefined` | :heavy_check_mark: |
| `options` | Array  | HTML node      | `undefined` | :heavy_check_mark: |

The `list` property is the `<datalist>`'s identifier, while the `options` property contains all the possible values.

```js
'example-field': {
  type: 'list',
  list: 'exampleList',
  options: [
    'Example option 1',
    'Example option 2',
    'Example option 3',
  ],
}
```

```html
<div class="mb-3">
  <input id="example-field" class="form-control" list="exampleList" aria-label="example-field">
  <datalist id="exampleList">
    <option value="Example option 1"></option>
    <option value="Example option 2"></option>
    <option value="Example option 3"></option>
  </datalist>
</div>
```

<h3 id="list-default-value">Default value</h3>

> :warning: This will override the [`value`](#value) property.

Use `^` to give the list an option that will be the input's value on creation:

```js
options: [
  'Example option 1',
  '^Example option 2',
  'Example option 3',
],
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## number

```js
'example-field': {
  type: 'number',
}
```

```html
<div class="mb-3">
  <input type="number" id="example-field" class="form-control" aria-label="example-field">
</div>
```

<h3 id="number-min-and-max">min & max</h3>

| Property | Type   | Output         | Default     | Required                     |
| -------- | ------ | -------------- | ----------- | ---------------------------- |
| `min`    | Number | HTML attribute | `-Infinity` | :x: unless `max` is declared |
| `max`    | Number | HTML attribute | `+Infinity` | :x: unless `min` is declared |

> :warning: If `min` and `max` are declared and valid, an eventual [`value`](#value) property must be compatible with these values.

The `min` and `max` attributes will be applied only if the following conditions are met:

- They are both specified as valid numbers
- `min` is lower than `max`

```js
'example-field': {
  type: 'number',
  min: 5,
  max: 25,
}
```

```html
<div class="mb-3">
  <input type="number" id="example-field" class="form-control" min="5" max="25" aria-label="example-field">
</div>
```

<h3 id="number-step">step</h3>

| Type   | Output         | Default | Required |
| ------ | -------------- | ------- | -------- |
| Number | HTML attribute | `1`     | :x:      |

The value must be greater than `0`.

```js
'example-field': {
  type: 'number',
  step: 0.5,
}
```

```html
<div class="mb-3">
  <input type="number" id="example-field" class="form-control" step="0.5" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## password

```js
'example-field': {
  type: 'password',
}
```

```html
<div class="mb-3">
  <input type="password" id="example-field" class="form-control" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## radio

| Property | Type   | Output         | Default     | Required  |
| -------- | ------ | -------------- | ----------- | --------- |
| `family` | String | HTML attribute | `undefined` | :warning: |

The `family` property is the only mean by which multiple `radio`s can have a `name` attribute, to prevent the multiple selection of choices that are supposed to be mutually exclusive. It is not technically required in order for the plugin to render the field, but it's strongly recommended.

> :warning: While `family` is not necessarily a requirement, the [`value`](#value) property is &mdash; otherwise the element will be rendered as a basic `text` input.

```js
'example-field': {
  type: 'radio',
  family: 'exampleFamily',
  value: 1,
}
```

```html
<div class="mb-3 form-check">
  <input type="radio" id="example-field" name="exampleFamily" value="1" class="form-check-input" aria-label="example-field">
</div>
```

<h3 id="radio-checked">checked</h3>

| Type    | Output       | Default | Required |
| ------- | ------------ | ------- | -------- |
| Boolean | DOM property | `false` | :x:      |

```js
'example-field': {
  type: 'radio',
  family: 'exampleFamily',
  value: 1,
  checked: true,
}
```

<h3 id="radio-inline">inline</h3>

| Type    | Output    | Default | Required |
| ------- | --------- | ------- | -------- |
| Boolean | CSS class | `false` | :x:      |

The `radio`s will be displayed inline rather than being stacked like a list.

```js
'example-field': {
  type: 'radio',
  family: 'exampleFamily',
  inline: true,
}
```

```html
<div class="form-check form-check-inline">
  <input type="radio" id="example-field" name="exampleFamily" class="form-check-input" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## range

```js
'example-field': {
  type: 'range',
}
```

```html
<div class="mb-3">
  <input type="range" id="example-field" class="form-range" aria-label="example-field">
</div>
```

<h3 id="range-min-and-max">min & max</h3>

| Property | Type   | Output         | Default | Required                     |
| -------- | ------ | -------------- | ------- | ---------------------------- |
| `min`    | Number | HTML attribute | `0`     | :x: unless `max` is declared |
| `max`    | Number | HTML attribute | `100`   | :x: unless `min` is declared |

> :warning: If `min` and `max` are declared and valid, an eventual [`value`](#value) property must be compatible with these values.

The `min` and `max` attributes will be applied only if the following conditions are met:

- They are both specified as valid numbers
- `min` is lower than `max`

```js
'example-field': {
  type: 'range',
  min: 5,
  max: 25,
}
```

```html
<div class="mb-3">
  <input type="range" id="example-field" class="form-range" min="5" max="25" aria-label="example-field">
</div>
```

<h3 id="range-step">step</h3>

| Type   | Output         | Default | Required |
| ------ | -------------- | ------- | -------- |
| Number | HTML attribute | `1`     | :x:      |

The value must be greater than `0`.

```js
'example-field': {
  type: 'range',
  step: 0.5,
}
```

```html
<div class="mb-3">
  <input type="range" id="example-field" class="form-range" step="0.5" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## select

| Property  | Type   | Output    | Default     | Required           |
| --------- | ------ | --------- | ----------- | ------------------ |
| `options` | Object | HTML node | `undefined` | :heavy_check_mark: |

> :warning: The options order will always follow the alphabetical, ascending order of the `value` attribute.

```js
'example-field': {
  type: 'select',
  options: {
    '0': 'Select option...',
    'a': 'Example option 1',
    'b': 'Example option 2',
    'c': 'Example option 3',
  },
}
```

```html
<div class="mb-3">
  <select id="example-field" class="form-select" aria-label="example-field">
    <option value="0">Select option...</option>
    <option value="a">Example option 1</option>
    <option value="b">Example option 2</option>
    <option value="c">Example option 3</option>
  </select>
</div>
```

<h3 id="select-default-value">Default value</h3>

> :warning: This will override the [`value`](#value) property.

Use `^` to give a `selected` DOM property to a specific option:

```js
options: {
  '0': 'Select option...',
  'a': 'Example option 1',
  'b': '^Example option 2',
  'c': 'Example option 3',
}
```

> :warning: A `<select>` that is not given a `multiple` or `rows` property will always have a value by default: either the first declared or the one with the special `^` character.

<h3 id="select-multiple">multiple</h3>

| Type    | Output       | Default | Required |
| ------- | ------------ | ------- | -------- |
| Boolean | DOM property | `false` | :x:      |

Show the entire options list already expanded.

This property will have no effect at all if this field is given a [floating label](#floating).

```js
'example-field': {
  type: 'select',
  multiple: true,
  options: {/* ... */},
}
```

### size

| Type   | Output         | Default     | Required |
| ------ | -------------- | ----------- | -------- |
| Number | HTML attribute | `undefined` | :x:      |

Similar to `multiple`, specify how many expanded options are visible before overflowing.

This property will have no effect at all if this field is given a [floating label](#floating) or a `multiple` property set to `true`.

```js
'example-field': {
  type: 'select',
  size: 3,
  options: {/* ... */},
}
```

```html
<div class="mb-3">
  <select id="example-field" class="form-select" rows="3" aria-label="example-field">
    <!-- ... -->
  </select>
</div>
```

See also: [:link: selectSize @ General settings](SETTINGS.md#selectsize)

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## switch

The `switch` type is technically a **checkbox**.

```js
'example-field': {
  type: 'switch',
}
```

```html
<div class="mb-3 form-check form-switch">
  <input type="checkbox" role="switch" id="example-field" class="form-check-input" aria-label="example-field">
</div>
```

<h3 id="switch-checked">checked</h3>

| Type    | Output       | Default | Required |
| ------- | ------------ | ------- | -------- |
| Boolean | DOM property | `false` | :x:      |

```js
'example-field': {
  type: 'switch',
  checked: true,
}
```

<h3 id="switch-inline">inline</h3>

| Type    | Output    | Default | Required |
| ------- | --------- | ------- | -------- |
| Boolean | CSS class | `false` | :x:      |

The switches will be displayed inline rather than being stacked like a list.

```js
'example-field': {
  type: 'switch',
  inline: true,
}
```

```html
<div class="form-check form-check-inline form-switch">
  <input type="checkbox" role="switch" id="example-field" class="form-check-input" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

<h2 id="type-text">text</h2>

For this element, the `type` property can be completely omitted. It will still work if specified:

```js
'example-field': {
  type: 'text',
}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

## textarea

```js
'example-field': {
  type: 'textarea',
}
```

```html
<div class="mb-3">
  <textarea id="example-field" class="form-control" rows="3" aria-label="example-field"></textarea>
</div>
```

### rows

| Type   | Output         | Default | Required |
| ------ | -------------- | ------- | -------- |
| Number | HTML attribute | `3`     | :x:      |

The value must be greater than `0`.

```js
'example-field': {
  type: 'textarea',
  rows: 6,
}
```

```html
<div class="mb-3">
  <textarea id="example-field" class="form-control" rows="6" aria-label="example-field"></textarea>
</div>
```

See also: [:link: textareaRows @ General settings](SETTINGS.md#textarearows)

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

# Accessories

Entirely optional utilities that can enrich the fields and the form itself.

## help

| Property     | Type   | Output         | Default     | Required           |
| ------------ | ------ | -------------- | ----------- | ------------------ |
| `identifier` | String | HTML attribute | `undefined` | :heavy_check_mark: |
| `text`       | String | HTML node      | `undefined` | :heavy_check_mark: |

Provide an informative note right under the respective field, adding the `aria-describedby` attribute to it, which will be the text's identifier.

```js
'example-field': {
  help: {
    identifier: 'exampleFieldHelp',
    text: 'Example help text.',
  },
}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control" aria-label="example-field" aria-describedby="exampleFieldHelp">
  <div id="exampleFieldHelp" class="form-text">Example help text.</div>
</div>
```

## section

| Property  | Type    | Output    | Default     | Required           |
| --------- | ------- | --------- | ----------- | ------------------ |
| `type`    | String  | HTML node | `undefined` | :heavy_check_mark: |
| `divider` | Boolean | HTML node | `false`     | :x:                |

Similar to the way fields are declared, this element provides a simple yet effective way to separate the contents within the target form.

The elements will have the `form-section` and the `form-section-divider` classes for easy custom styling.

Unlike the way in which the standard fields are handled, this element will not be wrapped in a `<div>` node.

With `divider: false` or unspecified

```js
'Example section': {
  type: 'section',
},
```

```html
<h5 class="form-section mt-4 mb-3">Example section</h5>
```

With `divider: true`

```js
'Example section': {
  type: 'section',
  divider: true,
},
```

```html
<h5 class="form-section mt-4 mb-3">Example section</h5>
<hr class="form-section-divider">
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>

# Additional attributes

Custom attributes that are not type-specific can be placed within the `attributes` object.

Attributes that will be ignored:

`accept`, `checked`, `disabled`, `for`, `id`, `indeterminate`, `list`, `max`, `min`, `multiple`, `name`, `readonly`, `required`, `rows`, `step`, `value`, `selected`, `size`, `type`.

The `placeholder` attribute will be ignored for the following types:

`checkbox`, `color`, `file`, `radio`, `select`, `switch`.

```js
'example-field': {
  attributes: {
    placeholder: 'Example placeholder',
    'data-example': 69,
  },
}
```

```html
<div class="mb-3">
  <input type="text" id="example-field" class="form-control" placeholder="Example placeholder" data-example="69" aria-label="example-field">
</div>
```

<div align="right"><a href="#fields">&#8593; Back to top</a></div>
