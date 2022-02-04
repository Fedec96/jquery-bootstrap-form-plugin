# BootstrapForm

jQuery plugin for form elements manipulation based on Bootstrap.

# Requirements

* [:link: jQuery](https://jquery.com/) ver. 3.6.0+
* [:link: Bootstrap](https://getbootstrap.com/) ver. 5+
* [:link: Bootstrap Icons](https://icons.getbootstrap.com/) ver. 1.7+

# Table of contents

1. [Fundamentals](#fundamentals)
    - [Installation](#installation)
    - [Instance](#instance)
    - [Overriding defaults](#overriding-defaults)
2. [License](#license)
3. Browse in-depth documentation:
    - [:link: General settings](docs/SETTINGS.md)
    - [:link: Heading](docs/HEADING.md)
    - [:link: Fields](docs/FIELDS.md)
    - [:link: Buttons](docs/BUTTONS.md)
    - [:link: Callbacks](docs/CALLBACKS.md)
    - [:link: Utilities](docs/UTILS.md)
    - [:link: Usage example](docs/EXAMPLE.md)

# Fundamentals

In order to work, this plugin expects both the `fields` and `buttons` objects with at least one entry, respectively. All the other general settings, defined outside of the two main objects, can be omitted.

Always remember to check the **browser's console** for potential warnings.

Whenever a form is created from scratch, each field's value will be initialized according to the [:link: resetForm](docs/UTILS.md#resetform) utility's rules.

> :warning: Keep in mind that any property that supports the `string` type will potentially support HTML syntax.

<div align="right"><a href="#bootstrapform">&#8593; Back to top</a></div>

## Installation

Load the CSS and JS files at last, respectively in `<head>` and `<body>`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <!-- Bootstrap Icons CSS -->
    <link rel="stylesheet" href="/css/bootstrap-icons.css">
    <!-- BootstrapForm CSS -->
    <link rel="stylesheet" href="/css/jquery.bootstrap.form.css">
  </head>
  <body>
    <!-- jQuery -->
    <script src="/js/jquery.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="/js/bootstrap.bundle.min.js"></script>
    <!-- BootstrapForm JS -->
    <script src="/js/jquery.bootstrap.form.js"></script>
  </body>
</html>
```

<div align="right"><a href="#bootstrapform">&#8593; Back to top</a></div>

## Instance

To create an instance on a specific target and render specific elements within said target:

```js
$(element).bootstrapForm(options);
```

### Example

```js
$('#form').bootstrapForm({
  useName: true,
  fields: {/* ... */},
  buttons: {/* ... */},
});
```

To use an utility on a specific target:

```js
$(element).bootstrapForm(method);
```

### Example

```js
const data = $('#form').bootstrapForm('getFields');
```

Learn more: [:link: Fields](docs/FIELDS.md) [:link: Buttons](docs/BUTTONS.md) [:link: Utilities](docs/UTILS.md)

<div align="right"><a href="#bootstrapform">&#8593; Back to top</a></div>

## Overriding defaults

To override this plugin's default settings and making them work across all the instances:

```js
$.fn.bootstrapForm.defaults.property = value;
```

### Example

```js
$.fn.bootstrapForm.defaults.textareaRows = 4;
```

Works for adding custom properties too.

Learn more: [:link: General settings](docs/SETTINGS.md)

<div align="right"><a href="#bootstrapform">&#8593; Back to top</a></div>

# License

Licensed under the [:link: MIT license](LICENSE.md).

<div align="right"><a href="#bootstrapform">&#8593; Back to top</a></div>
