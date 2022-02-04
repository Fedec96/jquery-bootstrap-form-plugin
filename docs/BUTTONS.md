[&#8592; Fields](FIELDS.md) &nbsp; | &nbsp; [Callbacks &#8594;](CALLBACKS.md)

# Buttons

[:link: Back to the main document](../../../)

Populate the target form with buttons that can be customized aesthetically and functionally.

This part is one of the two requirements for this plugin to work, as stated in the [fundamentals](../../../#fundamentals).

# Table of contents

1. [Fundamentals](#fundamentals)
2. [Button properties](#button-properties)
    - [icon](#icon)
    - [text](#text)
    - [type](#type)
3. [Callbacks](#callbacks)
    - [onClick](#onclick)
4. [Additional attributes](#additional-attributes)

# Fundamentals

In order for a button to be built, either the `text` property or the `icon` object have to be declared. These can also be combined, but at least one of them must be declared and valid.

Create a button placing it within the `buttons` object.

# Button properties

Unlike the input fields, buttons will all be wrapped by the same element identified by the `form-buttons` class for easy styling. Each button's identifier will be built with the one specified in the plugin instance plus a `-btn` suffix.

## icon

| Property    | Type   | Output    | Default     | Required           |
| ----------- | ------ | --------- | ----------- | ------------------ |
| `glyph`     | String | HTML node | `undefined` | :heavy_check_mark: |
| `placement` | String | CSS class | `start`     | :x:                |

The button's icon relies on [:link: Bootstrap Icons](https://icons.getbootstrap.com/). Each icon's name will be in fact a Bootstrap Icons glyph, without the `bi bi-` prefix.

```js
'example': {
  icon: {
    glyph: 'chevron-right',
  },
}
```

```html
<div class="form-buttons mt-5">
  <button id="example-btn" type="button" class="btn"><i class="bi bi-chevron-right"></i></button>
</div>
```

Omitting the `placement` property will automatically set it to its default value.

With placement:

```js
'example': {
  text: 'Example text',
  icon: {
    glyph: 'chevron-right',
    placement: 'start',
  },
}
```

```html
<div class="form-buttons mt-5">
  <button id="example-btn" type="button" class="btn"><i class="bi bi-chevron-right me-2"></i>Example text</button>
</div>
```

```js
'example': {
  text: 'Example text',
  icon: {
    glyph: 'chevron-right',
    placement: 'end',
  },
}
```

```html
<div class="form-buttons mt-5">
  <button id="example-btn" type="button" class="btn">Example text<i class="bi bi-chevron-right ms-2"></i></button>
</div>
```

<div align="right"><a href="#buttons">&#8593; Back to top</a></div>

## text

| Type   | Output    | Default     | Required                                     |
| ------ | --------- | ----------- | -------------------------------------------- |
| String | HTML node | `undefined` | :heavy_check_mark: unless `icon` is declared |

```js
'example': {
  text: 'Example text',
}
```

```html
<div class="form-buttons mt-5">
  <button id="example-btn" type="button" class="btn">Example text</button>
</div>
```

<div align="right"><a href="#buttons">&#8593; Back to top</a></div>

## type

| Type   | Output         | Default  | Required |
| ------ | -------------- | -------- | -------- |
| String | HTML attribute | `button` | :x:      |

Omitting the `type` property will automatically set it to its default value.

```js
'example': {
  text: 'Example text',
  type: 'submit',
}
```

```html
<div class="form-buttons mt-5">
  <button id="example-btn" type="submit" class="btn">Example button</button>
</div>
```

<div align="right"><a href="#buttons">&#8593; Back to top</a></div>

# Callbacks

Specify what happens when specific button events are triggered.

## onClick

| Output  | Default     | Required |
| ------- | ----------- | -------- |
| `event` | `undefined` | :x:      |

This function is not affected by the [:link: preventDefault setting](SETTINGS.md#preventdefault).

```js
'example': {
  text: 'Example text',
  onClick(event) {/* ... */},
}
```

<div align="right"><a href="#buttons">&#8593; Back to top</a></div>

# Additional attributes

Custom attributes can be placed within the `attributes` object.

Attributes that will be ignored: `id`, `placeholder`, `type`.

```js
'example': {
  text: 'Example text',
  attributes: {
    title: 'Example title',
    'data-example': 420,
  },
}
```

```html
<div class="form-buttons mt-5">
  <button id="example-btn" type="button" class="btn" title="Example title" data-example="420">Example text</button>
</div>
```

<div align="right"><a href="#buttons">&#8593; Back to top</a></div>
