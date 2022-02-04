[&#8592; Utilities](UTILS.md)

# Usage example

[:link: Back to the main document](../../../)

See a realistic, simple use case with many properties working together.

```html
<form id="form"></form>
```

```js
$('#form').bootstrapForm({
  validationText: true,

  heading: {
    text: 'Login',
    divider: true,
  },

  fields: {
    'username': {
      required: true,
      label: {text: 'Username',},
    },

    'password': {
      type: 'password',
      required: true,
      label: {text: 'Password',},
    },

    'keep-me-logged': {
      type: 'checkbox',
      checked: true,
      label: {text: 'Keep me logged in',},

      help: {
        identifier: 'keepMeLoggedHelp',
        text: 'We use cookies.',
      },
    },
  },

  buttons: {
    'login': {
      text: 'Login',
      type: 'submit',

      icon: {
        glyph: 'chevron-compact-right',
        placement: 'end',
      },

      attributes: {
        class: 'btn-primary',
      },
    },
  },

  onSubmit(event, formData) {
    console.log(formData.username);
    console.log(formData.password);
    console.log(formData['keep-me-logged']);
  },
});
```

### Output

Added comments for readability.

```html
<form id="form">
  <!-- Heading -->
  <h4 class="form-heading">Login</h4>
  <hr class="form-heading-divider mb-4">

  <!-- Username field -->
  <div class="mb-3">
    <label class="form-label" for="username">Username</label>
    <input id="username" class="form-control" type="text"> <!-- :required -->
    <div class="valid-feedback"></div>
    <div class="invalid-feedback"></div>
  </div>

  <!-- Password field -->
  <div class="mb-3">
    <label class="form-label" for="password">Password</label>
    <input id="password" class="form-control" type="password"> <!-- :required -->
    <div class="valid-feedback"></div>
    <div class="invalid-feedback"></div>
  </div>

  <!-- Checkbox field -->
  <div class="mb-3 form-check">
    <input id="keep-me-logged" class="form-check-input" type="checkbox" aria-describedby="keepMeLoggedHelp"> <!-- :checked -->
    <label class="form-check-label" for="keep-me-logged">Keep me logged in</label>
    <div id="keepMeLoggedHelp" class="form-text">We use cookies.</div>
    <div class="valid-feedback"></div>
    <div class="invalid-feedback"></div>
  </div>

  <!-- Buttons -->
  <div class="form-buttons mt-5">
    <button id="login-btn" class="btn btn-primary" type="submit">
      Login<i class="bi bi-chevron-compact-right ms-2"></i>
    </button>
  </div>
</form>
```

<div align="right"><a href="#usage-example">&#8593; Back to top</a></div>
