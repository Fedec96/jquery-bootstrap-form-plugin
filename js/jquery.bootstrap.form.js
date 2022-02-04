/**
 * BootstrapForm
 * 
 * Bootstrap-based jQuery plugin for generating
 * customized forms.
 * 
 * @requires jQuery {@link https://jquery.com/}
 * @author Federico Cappelletti <fedec96@gmail.com>
 * @license MIT (https://github.com/Fedec96/jquery-bootstrap-form-plugin/blob/main/LICENSE.md)
 */

'use strict';

(function($, window, document, undefined) {
    /**
     * This plugin's name. Used for namespacing,
     * console errors, jQuery's data.
     * 
     * @type {string}
     * @private
     */
    const pluginName = 'bootstrapForm';

    /**
     * Capitalized plugin name for the console messages.
     * 
     * @type {string}
     * @private
     */
    const displayName = pluginName.charAt(0).toUpperCase() + pluginName.slice(1);

    /**
     * All the publicly available methods.
     * 
     * @type {object}
     * @private
     */
     const methods = {
        /**
         * Returns the element's parameters.
         * 
         * @example
         * // Returns {settings...}
         * const instance = $('#form').bootstrapForm('getInstance');
         * 
         * @returns {(undefined|object)} The element's settings.
         * @public
         */
        getInstance() {
            return $(this).data(pluginName);
        },

        /**
         * Remove all the children and sub-children of all the form's elements.
         * 
         * @example
         * $('#form').bootstrapForm('emptyForm');
         * 
         * @public
         */
        emptyForm() {
            $(this).empty();
            $(this).removeData(pluginName);
        },

        /**
         * For the target form, build a JSON that has each field's ID as key
         * and each field's value as value. This will skip the buttons.
         * 
         * @example
         * // Returns {'field-1': value, 'field-2': value, ...}
         * const fields = $('#form').bootstrapForm('getFields');
         * 
         * @returns {object} The JSON object with all the fields' IDs and values.
         * @public
         */
        getFields() {
            const skipTypes = ['button', 'submit',];
            const fields = $(this).find(':input');
            const formFields = {};

            fields.each(function(i, input) {
                const field = $(input);
                const type = field.attr('type');

                if (!skipTypes.includes(type)) {
                    const fieldValue = field.val();
                    let value = fieldValue;

                    switch (true) {
                        // 'checkbox' and 'switch'
                        case type === 'checkbox':
                            value = field.prop('checked');
                            break;

                        case type === 'file':
                            if (!field.prop('multiple')) {
                                // filename.ext
                                value = fieldValue.split('\\').pop();
                            } else {
                                const fileList = [];

                                $.each(field.prop('files'), function(i, file) {
                                    fileList.push(file.name);
                                });

                                value = fileList;
                            }

                            break;

                        case field.prop('tagName') === 'SELECT' && (field.prop('multiple') === true || field.attr('rows')):
                            // Expanded 'select' inputs will return the 'value' attribute as single-cell array.
                            value = fieldValue[0];
                            break;

                        case type === 'number':
                        case type === 'range':
                            value = parseInt(fieldValue);
                            break;

                        case type === 'radio':
                            value = [fieldValue, field.prop('checked'),];
                            break;
                    }

                    formFields[field.attr('id')] = value;
                }
            });

            return formFields;
        },

        /**
         * Use jQuery's default method to clear all the target form's fields.
         * 
         * @example
         * $('#form').bootstrapForm('resetForm');
         * 
         * @public
         */
        resetForm() {
            // Step one: reset the whole form.
            $(this).trigger('reset');

            // Step two: reset specific types.
            const fields = $(this).find(':input');

            fields.each(function(i, input) {
                const field = $(input);

                switch (field.attr('type')) {
                    case 'number':
                    case 'range':
                        const minValue = field.attr('min');
                        let baseValue;

                        if (typeof minValue !== 'undefined') {
                            baseValue = minValue;
                        } else {
                            baseValue = '0';
                        }

                        field.val(baseValue);
                        break;
                }
            });
        },

        /**
         * Remove all the form's fields that have a validation-related class and
         * the respective feedback text.
         * 
         * @example
         * $('#form').bootstrapForm('resetValidation');
         * 
         * @public
         */
        resetValidation() {
            const skipTypes = ['button', 'submit',];
            const fields = $(this).find(':input');

            fields.each(function(i, input) {
                const field = $(input);

                if (!skipTypes.includes(field.attr('type'))) {
                    if (field.hasClass('is-valid')) {
                        field.removeClass('is-valid');
                        field.siblings('.valid-feedback').contents().remove();
                    }

                    if (field.hasClass('is-invalid')) {
                        field.removeClass('is-invalid');
                        field.siblings('.invalid-feedback').contents().remove();
                    }
                }
            });
        },

        /**
         * Trim all the target form's fields' values.
         * 
         * @example
         * $('#form').bootstrapForm('trimFields');
         * 
         * @public
         */
        trimFields() {
            const skipTypes = ['button', 'checkbox', 'color', 'file', 'number', 'radio', 'range', 'submit',];
            const fields = $(this).find(':input');

            fields.each(function(i, input) {
                const field = $(input);

                if (!skipTypes.includes(field.attr('type'))) {
                    // Skip expanded 'select' inputs.
                    if (field.prop('tagName') !== 'SELECT' && (field.prop('multiple') !== true || !field.attr('rows'))) {
                        const trimmedValue = field.val().trim();
                        field.val(trimmedValue);
                    }
                }
            });
        },
    };

    class Plugin {
        /**
         * Initialize the target element and extend the default options with the
         * caller's parameters; then, start rendering.
         * 
         * @param {object} element The target element's identifier.
         * @param {object} options Parameters - defaults extending eventual options.
         * @private
         */
        constructor(element, options) {
            this.element = $(element);
            this.settings = $.extend(true, {}, $.fn[pluginName].defaults, options);

            // Store all the console messages.
            this.messages = [];

            this._init();
            this._printMessages();
        }

        /**
         * Start this plugin's logic, such as checking settings,
         * building the expected output, and so on.
         * @private
         */
         _init() {
            this._buildForm();
            this._handleCallbacks();

            // Cache the settings in the target's data.
            this.element.data(pluginName, this.settings);

            // Before serving the form, reset all the values including custom rules.
            this.element[pluginName]('resetForm');
        }

        /**
         * Populate the form with the desired fields/buttons.
         * @private
         */
        _buildForm() {
            if (this._isValidObject(this.settings.heading)) {
                this._buildHeading();
            }

            // Check the minimum requirements.
            let meetsRequirements = true;
            if (!this._isValidObject(this.settings.fields)) {
                meetsRequirements = false;
                this._sendMessage('no fields provided', 'error');
            }

            if (!this._isValidObject(this.settings.buttons)) {
                meetsRequirements = false;
                this._sendMessage('no buttons provided', 'error');
            }

            if (meetsRequirements) {
                this._buildFields();
                this._buildButtons();
            }
        }

        /**
         * Build the form's header.
         * @private
         */
        _buildHeading() {
            // Check if a valid text was provided.
            let hasText = false;
            if (this._isValidString(this.settings.heading.text)) {
                hasText = true;
            }

            // If all the checks are passed, start defining the rendering rules.
            if (hasText) {
                // Check if a divider has to be drawn.
                let hasDivider = false;
                if (this.settings.heading.divider === true) {
                    hasDivider = true;
                }

                // Base element
                const heading = $('<h4>').addClass('form-heading').append(this.settings.heading.text);

                // In case of no divider, a bit of margin is needed.
                if (!hasDivider) {
                    heading.addClass('mb-5');
                }

                this.element.append(heading);

                // Draw the divider.
                if (hasDivider) {
                    const divider = $('<hr>').addClass('form-heading-divider mb-4');
                    this.element.append(divider);
                }
            } else {
                this._sendMessage('heading without valid text', 'error');
            }
        }

        /**
         * Build the form's fields.
         * @private
         */
        _buildFields() {
            // Housekeeping
            const _this = this;

            const allowedTypes = [
                undefined, 'checkbox', 'color', 'email', 'file', 'list', 'number', 'password',
                'radio', 'range', 'section', 'select', 'switch', 'text', 'textarea',
            ];

            /**
             * First, validate all the general settings.
             * Then, define the rendering rules for each single field.
             */

            // Use the [name] attribute along with [id].
            let useNameAttribute = false;
            if (this.settings.useName === true) {
                useNameAttribute = true;
            }

            // Append the valid/invalid feedback containers to the field's wrapper.
            let useValidationText = false;
            if (this.settings.validationText === true) {
                useValidationText = true;
            }

            // Check if the default textarea rows number is overridden.
            let defaultTextareaRows = 3;
            if (typeof this.settings.textareaRows === 'number' && this.settings.textareaRows > 0 && this.settings.textareaRows !== defaultTextareaRows) {
                defaultTextareaRows = this.settings.textareaRows;
            }

            // Check if the default select rows number (size) is overridden.
            let defaultselectSize = 3;
            if (typeof this.settings.selectSize === 'number' && this.settings.selectSize > 0 && this.settings.selectSize !== defaultselectSize) {
                defaultselectSize = this.settings.selectSize;
            }

            // Fields settings
            $.each(this.settings.fields, function(root, field) {
                // Check if the field's identifier is an actual, valid string.
                let validIdentifier = true;
                if (!_this._isValidString(root)) {
                    validIdentifier = false;
                    _this._sendMessage('detected invalid field identifier', 'error');
                }

                // Check if the field is allowed and it's of the 'string' type (except for 'undefined', allowed for implicit 'text').
                let validType = true;
                if (!allowedTypes.includes(field.type)) {
                    validType = false;
                    _this._sendMessage('invalid field type "' + field.type + '"', 'error');
                }

                // Check if a field's content was defined as an object.
                let validField = true;
                if (typeof field !== 'object') {
                    validField = false;
                    _this._sendMessage('detected field not of the \'object\' type ("' + field + '")', 'error');
                }

                // If all the checks are passed, start defining the rendering rules.
                if (validIdentifier && validType && validField) {
                    const validator = {
                        checkbox: false,
                        color: false,
                        email: false,
                        file: false,
                        list: false,
                        number: false,
                        password: false,
                        radio: false,
                        range: false,
                        section: false,
                        select: false,
                        switch: false,
                        text: false,
                        textarea: false,
                    };

                    // Base elements
                    let inputTag = 'input';

                    switch (field.type) {
                        case 'checkbox':
                            validator.checkbox = true;
                            break;

                        case 'color':
                            validator.color = true;
                            break;

                        case 'email':
                            validator.email = true;
                            break;

                        case 'file':
                            validator.file = true;
                            break;

                        case 'list':
                            let hasListIdentifier = false;
                            if (_this._isValidString(field.list)) {
                                hasListIdentifier = true;
                            } else {
                                _this._sendMessage('list inputs require a \'list\' identifier');
                            }

                            let hasValidOptions = false;
                            if (_this._isValidArray(field.options)) {
                                hasValidOptions = true;
                            } else {
                                _this._sendMessage('list inputs require a valid \'options\' array', 'error');
                            }

                            if (hasListIdentifier && hasValidOptions) {
                                validator.list = true;
                            }

                            break;

                        case 'number':
                            validator.number = true;
                            break;

                        case 'password':
                            validator.password = true;
                            break;

                        case 'radio':
                            // The 'radio' type requires the value to be either a valid string or of the 'number' type, starting from 0.
                            if (_this._isValidString(field.value) || typeof field.value === 'number' && field.value > 0) {
                                validator.radio = true;
                            } else {
                                _this._sendMessage('radio inputs require a value that is either a valid string or of the \'number\' type starting from 0', 'error');
                            }

                            break;

                        case 'range':
                            validator.range = true;
                            break;

                        case 'section':
                            validator.section = true;
                            break;

                        case 'select':
                            // The 'select' type requires the options to be an object.
                            if (_this._isValidObject(field.options)) {
                                validator.select = true;
                                inputTag = 'select';
                            } else {
                                _this._sendMessage('select inputs required a valid \'options\' object', 'error');
                            }

                            break;

                        case 'switch':
                            validator.switch = true;
                            break;

                        case 'textarea':
                            validator.textarea = true;
                            inputTag = 'textarea';

                            break;
                    }

                    inputTag = '<' + inputTag + '>';

                    // Check if a type validator was enabled. If not, enable the default one.
                    let atLeastOneKeyEnabled = false;
                    $.each(validator, function(key, value) {
                        if (value) {
                            atLeastOneKeyEnabled = true;
                            return false; // Quit the loop at the first successful test.
                        }
                    });

                    // Determine the field's type - 'text' is default.
                    let baseInputType;
                    if (!atLeastOneKeyEnabled) {
                        validator.text = true;
                        baseInputType = 'text';
                    } else {
                        // 'checkbox' and 'switch' are both actually checkboxes. Make an exception.
                        if (validator.switch) {
                            baseInputType = 'checkbox';
                        } else {
                            baseInputType = field.type;
                        }
                    }

                    // Since the 'section' element is the only one without a wrapper, check that before rendering.
                    if (!validator.section) {
                        // Each field has its own wrapper.
                        const baseWrapper = $('<div>').addClass('mb-3');

                        // Check if an help text was defined and valid.
                        let hasHelpText = false;
                        if (typeof field.help === 'object' && _this._isValidString(field.help.identifier) && _this._isValidString(field.help.text)) {
                            hasHelpText = true;
                        }

                        // Check if a valid label was defined along with its 'floating' property.
                        let hasLabel = false;
                        let hasFloatingLabel = false;
                        if (typeof field.label === 'object' && _this._isValidString(field.label.text)) {
                            hasLabel = true;

                            // The 'floating' property will be accepted for all the types except 'checkbox', 'color', 'file', 'radio', 'range' and 'switch'.
                            if (!validator.checkbox && !validator.color && !validator.file && !validator.radio && !validator.range && !validator.switch) {
                                if (field.label.floating === true) {
                                    hasFloatingLabel = true;
                                }
                            }
                        }

                        // Check if additional attributes were specified.
                        let hasAdditionalAttributes = false;
                        if (_this._isValidObject(field.attributes)) {
                            hasAdditionalAttributes = true;
                        }

                        // Define the base input field.
                        const baseField = $(inputTag).attr('id', root);

                        // The base field class depends on specific types.
                        if (validator.checkbox || validator.radio || validator.switch) {
                            baseField.addClass('form-check-input');
                        } else if (validator.select) {
                            baseField.addClass('form-select');
                        } else if (validator.range) {
                            baseField.addClass('form-range');
                        } else {
                            baseField.addClass('form-control');
                        }

                        // Add the [type] attribute.
                        if (!validator.list && !validator.select && !validator.textarea) {

                            /**
                             * The 'list' type is more artificial, hence no [type] attribute.
                             * The 'select' has no [type] attribute according to Bootstrap's documentation.
                             * The 'textarea' type also has no [type] attribute.
                             */

                            baseField.attr('type', baseInputType);
                        }

                        // Add the [name] attribute, except for the 'radio' type, that is handled separately.
                        if (useNameAttribute && !validator.radio) {
                            baseField.attr('name', root);
                        }

                        // The [name] attribute for the 'radio' type is the obligatory [name] attribute.
                        if (validator.radio) {
                            if (_this._isValidString(field.family)) {
                                baseField.attr('name', field.family);
                            } else {
                                _this._sendMessage('detected radio field without a proper \'family\' attribute', 'error');
                            }
                        }

                        // Add the 'required' attribute.
                        if (field.required === true) {
                            baseField.prop('required', true);
                        }

                        // Add the 'disabled' attribute.
                        if (field.disabled === true) {
                            baseField.prop('disabled', true);
                        } else if (field.readonly === true) {
                            // 'disabled' and 'readonly' are incompatible. 'disabled' wins.
                            if (!validator.color && !validator.checkbox && !validator.file && !validator.radio && !validator.range && !validator.switch) {
                                // Add the 'readonly' attribute, except for the 'color', 'checkbox', 'file', 'radio', 'range' and 'switch' types.
                                baseField.prop('readonly', true);
                            }
                        }

                        // Add the [aria-describedby] attribute for the help text.
                        if (hasHelpText) {
                            baseField.attr('aria-describedby', field.help.identifier);
                        }

                        // Add the [rows] attribute, for the 'textarea' type only.
                        if (validator.textarea) {
                            // The default rows number can be overridden per-field, if a valid number is provided.
                            if (typeof field.rows === 'number' && field.rows > 0) {
                                baseField.attr('rows', field.rows);
                            } else {
                                baseField.attr('rows', defaultTextareaRows);
                            }
                        }

                        // Add the [role] attribute for the 'switch' type only.
                        if (validator.switch) {
                            baseField.attr('role', 'switch');
                        }

                        // Add the [accept] attribute for the 'file' type only.
                        if (validator.file && _this._isValidArray(field.accept)) {
                            const fileTypeList = field.accept.join(',');
                            baseField.attr('accept', fileTypeList);
                        }

                        // Add the [min], [max] and [step] attributes for the 'number' and 'range' types only.
                        let hasMinMax = false;
                        if (validator.number || validator.range) {
                            // Check that the 'min' and 'max' values are compatible.
                            if (typeof field.min === 'number' && typeof field.max === 'number') {
                                if (field.min < field.max) {
                                    hasMinMax = true;
                                    baseField.attr('min', field.min);
                                    baseField.attr('max', field.max);
                                } else {
                                    if (validator.number) {
                                        _this._sendMessage('\'min\' and \'max\' values incompatible for \'number\'', 'warning');
                                    } else {
                                        _this._sendMessage('\'min\' and \'max\' values incompatible for \'range\'', 'warning');
                                    }
                                }
                            }

                            if (typeof field.step === 'number' && field.step > 0) {
                                baseField.attr('step', field.step);
                            }
                        }

                        // Add the 'form-check-inline' class for inline checkboxes, radios and switches.
                        if (validator.checkbox || validator.radio || validator.switch) {
                            if (field.inline === true) {
                                // Adapt the wrapper's class list.
                                if (baseWrapper.hasClass('mb-3')) {
                                    baseWrapper.removeClass('mb-3');
                                }

                                baseWrapper.addClass('form-check-inline');
                            }
                        }

                        // Add the 'multiple' attribute for the 'file' and 'select' types only.
                        let hasMultiple = false;
                        if (validator.file || (validator.select && !hasFloatingLabel)) {
                            // For the 'select' type, works only if there is not a floating label.
                            if (field.multiple === true) {
                                hasMultiple = true;
                                baseField.prop('multiple', true);
                            }
                        }

                        // Manage the 'value' attribute. Boolean and object values are not allowed.
                        let hasValidValue = false;
                        // The 'file' type is not supported.
                        if (!validator.file && typeof field.value !== 'boolean' && typeof field.value !== 'object') {
                            // Set a value for any other type, except 'checkbox' and 'switch'.
                            if (field.value) {
                                if (!validator.checkbox && !validator.switch) {
                                    // The 'color' type accepts values of the 'string' type only.
                                    if (validator.color) {
                                        if (_this._isValidString(field.value)) {
                                            // Check if the string is a HEX code.
                                            const value = field.value.split('');
                                            if (value[0] === '#' && value.length === 7) {
                                                hasValidValue = true;
                                            } else {
                                                _this._sendMessage('color inputs require a HEX-formatted value', 'error');
                                            }
                                        } else {
                                            _this._sendMessage('color inputs require a value of the \'string\' type', 'error');
                                        }
                                    } else if (validator.list) {
                                        // Check if there's a forced default value first.
                                        let hasForcedDefault = false;
                                        $.each(field.options, function(i, option) {
                                            if (option.charAt(0) === '^') {
                                                hasForcedDefault = true;
                                                return false; // Break the loop.
                                            }
                                        });

                                        if (!hasForcedDefault) {
                                            // The 'list' type requires the value to be among its options.
                                            if (field.options.includes(field.value)) {
                                                hasValidValue = true;
                                            }
                                        }
                                    } else if (validator.select) {
                                        // Check if there's a forced default value first.
                                        let hasForcedDefault = false;
                                        $.each(field.options, function(value, caption) {
                                            if (caption.charAt(0) === '^') {
                                                hasForcedDefault = true;
                                                return false; // Break the loop.
                                            }
                                        });

                                        if (!hasForcedDefault) {
                                            // The 'select' type requires the value to be among its options.
                                            let includesValue = false;
                                            $.each(field.options, function(value, caption) {
                                                if (value === field.value) {
                                                    includesValue = true;
                                                    return false; // Break the loop.
                                                }
                                            });

                                            if (includesValue) {
                                                hasValidValue = true;
                                            }
                                        }
                                    } else if (validator.number || validator.range) {
                                        // The 'number' and 'range' types accept values of the 'number' type only.
                                        if (typeof field.value === 'number' && field.value >= 0) {
                                            if ((validator.number || validator.range) && hasMinMax) {
                                                // The 'number' and 'range' types require a value between 'min' and 'max'.
                                                if (field.value >= field.min && field.value <= field.max) {
                                                    hasValidValue = true;
                                                } else {
                                                    if (validator.number) {
                                                        _this._sendMessage('\'number\' value not between \'min\' and \'max\'', 'warning');
                                                    } else {
                                                        _this._sendMessage('\'range\' value not between \'min\' and \'max\'', 'warning');
                                                    }
                                                }
                                            } else {
                                                hasValidValue = true;
                                            }
                                        } else {
                                            _this._sendMessage('number and range inputs require a value of the \'number\' type starting from 0', 'error');
                                        }
                                    } else {
                                        hasValidValue = true;
                                    }
                                }
                            }
                        }

                        if (hasValidValue) {
                            let finalValue;

                            // Avoid 'number' inputs with a NaN value.
                            if (validator.number && !hasValidValue) {
                                finalValue = 0;
                            } else {
                                finalValue = field.value;
                                if (typeof finalValue === 'number') {
                                    finalValue = finalValue.toString();
                                }
                            }

                            // For consistency, since all input values are strings, convert numbers to strings.
                            baseField.val(finalValue);
                        }

                        /**
                         * Make a 'checkbox', 'radio' or 'switch' checked.
                         * A 'checkbox' can also be "indeterminate" - if both 'checked' and 'indeterminate'
                         * are declared, the first declared property between the two wins.
                         */

                        if (validator.checkbox || validator.radio || validator.switch) {
                            if (field.checked === true) {
                                baseField.prop('checked', true);
                            } else if (validator.checkbox && field.indeterminate === true) {
                                // An indeterminate checkbox still counts as unchecked.
                                baseField.prop('indeterminate', true);
                            }
                        }

                        // Make a field "plain", to make it look like a normal string and not an actual field.
                        if (field.plain === true) {
                            // The 'checkbox', 'file', 'radio', 'range' and 'switch' types are excluded from this feature.
                            if (!validator.checkbox && !validator.file && !validator.radio && !validator.range && !validator.switch) {
                                if (baseField.hasClass('form-control')) {
                                    baseField.removeClass('form-control');
                                }

                                // It is best to combine this class with a placeholder attribute.
                                baseField.addClass('form-control-plaintext');
                            }
                        }

                        // For the 'color' type, the input fields needs a specific class.
                        if (validator.color) {
                            baseField.addClass('form-control-color');
                        }

                        // Manage the 'select' type.
                        if (validator.select) {
                            // The 'size' attribute will not work if 'multiple' was specified.
                            if (!hasMultiple) {
                                let hasRows = false;

                                // The 'size' attribute works for the 'select' type only. Specify the number of expanded options.
                                if (typeof field.size !== 'undefined') {
                                    // The 'size' property is incompatible with a floating label.
                                    if (!hasFloatingLabel) {
                                        if (typeof field.size === 'number' && field.size > 0) {
                                            hasRows = true;
                                        }

                                        // The value can be overridden per-field, if a valid number is provided.
                                        if (hasRows) {
                                            baseField.attr('size', field.size);
                                        } else {
                                            baseField.attr('size', defaultselectSize);
                                        }
                                    }
                                }
                            }

                            // Build the options for the select box.
                            let hasDefaultOption = false;
                            $.each(field.options, function(value, caption) {
                                const option = $('<option>').attr('value', value);

                                // The caption that starts with '^' will give the option the 'selected' attribute.
                                if (caption.charAt(0) === '^') {
                                    // Remove the special character in any case.
                                    caption = caption.substring(1);

                                    // Avoid duplicates with this flag.
                                    if (!hasDefaultOption) {
                                        hasDefaultOption = true;
                                        option.prop('selected', true);
                                    }
                                }

                                option.append(caption);

                                baseField.append(option);
                            });
                        }

                        // Specify the field's size, according to its type, if no floating label was provided.
                        if (!hasFloatingLabel) {
                            if (_this._isValidString(field.dimension)) {
                                // The 'checkbox', 'color', 'radio', 'range' and 'switch' types are excluded.
                                if (!validator.checkbox && !validator.color && !validator.radio && !validator.range && !validator.switch) {
                                    const allowedDimensions = ['sm', 'lg',];

                                    if (allowedDimensions.includes(field.dimension)) {
                                        let dimensionClass;

                                        // The 'select' type is handled with a specific class.
                                        if (validator.select) {
                                            dimensionClass = 'form-select-' + field.dimension;
                                        } else {
                                            dimensionClass = 'form-control-' + field.dimension;
                                        }

                                        baseField.addClass(dimensionClass);
                                    } else {
                                        _this._sendMessage('valid field \'dimension\' format but wrong value', 'warn');
                                    }
                                }
                            }
                        }

                        // Build the label element. If the label is floating, it must stand after the field, not before.
                        let label;

                        if (hasLabel) {
                            label = $('<label>').attr('for', root).append(field.label.text);

                            // The floating labels have no particular class(es), according to Bootrap's documentation.
                            if (!hasFloatingLabel) {
                                // The 'checkbox', 'radio' and 'switch' labels are handled separately.
                                if (!validator.checkbox && !validator.radio && !validator.switch) {
                                    label.addClass('form-label');
                                } else {
                                    label.addClass('form-check-label');
                                }
                            }
                        }

                        // Append the label BEFORE the input field, if not 'floating', but not for the 'checkbox', 'radio' and 'switch' types.
                        if (hasLabel && !hasFloatingLabel) {
                            if (!validator.checkbox && !validator.radio && !validator.switch) {
                                baseWrapper.append(label);
                            }
                        }

                        // Additional attributes. Attributes that are supposed to be defined at a higher level will be skipped.
                        if (hasAdditionalAttributes) {
                            const specialAttributes = [
                                'accept', 'for', 'id', 'list', 'max', 'min',
                                'name', 'rows', 'size', 'step', 'type', 'value',
                            ];

                            const specialProperties = [
                                'checked', 'disabled', 'indeterminate', 'multiple',
                                'readonly', 'required', 'selected',
                            ];

                            $.each(field.attributes, function(attribute, value) {
                                // Check the proper formats.
                                if (_this._isValidString(attribute) && !_this._isValidObject(value) && !_this._isValidArray(value)) {
                                    const cleanAttribute = attribute.trim();

                                    // Skip the iteration for special keywords to avoid unintentional overriding, or for specific combinations.
                                    if (specialAttributes.includes(cleanAttribute) || specialProperties.includes(cleanAttribute)
                                    || (cleanAttribute === 'placeholder' && (validator.checkbox || validator.color || validator.file || validator.radio || validator.select || validator.switch))) {
                                        return;
                                    }

                                    // Manage the CSS classes separately.
                                    if (cleanAttribute === 'class') {
                                        if (_this._isValidString(value)) {
                                            baseField.addClass(value);
                                        }
                                    } else {
                                        // Any other case.
                                        baseField.attr(cleanAttribute, value);
                                    }
                                }
                            });
                        }

                        // Verify that the field has a proper [aria-label] attribute if no label was given.
                        if (!hasLabel) {
                            const ariaLabel = baseField.attr('aria-label');
                            if (!_this._isValidString(ariaLabel)) {
                                baseField.attr('aria-label', root);
                            }
                        }

                        // Render the input element.
                        baseWrapper.append(baseField);

                        // The wrapper needs an extra class for the 'checkbox', 'radio' and 'switch' types.
                        if (validator.checkbox || validator.radio || validator.switch) {
                            baseWrapper.addClass('form-check');

                            // The 'switch' type requires an extra class.
                            if (validator.switch) {
                                baseWrapper.addClass('form-switch');
                            }
                        }

                        // For the 'checkbox', 'radio' and 'switch' types, the label has to be appended AFTER the input field.
                        if (hasLabel) {
                            // If the label is 'floating', a valid label was built and has to be appended AFTER the input field.
                            if ((validator.checkbox || validator.radio || validator.switch) || hasFloatingLabel) {
                                baseWrapper.append(label);

                                // The wrapper needs an additional class for floating labels.
                                if (hasFloatingLabel) {
                                    baseWrapper.addClass('form-floating');
                                }
                            }
                        }

                        // If the 'list' type is specified, build the datalist node (right after the input field).
                        if (validator.list) {
                            // The 'list' attribute is for this type only.
                            baseField.attr('list', field.list);

                            const datalist = $('<datalist>').attr('id', field.list);

                            let hasDefaultValue = false;
                            $.each(field.options, function(i, option) {
                                // The option that starts with '^' will be the field's default value.
                                if (option.charAt(0) === '^') {
                                    // Remove the special character in any case.
                                    option = option.substring(1);

                                    // Avoid duplicates with this flag.
                                    if (!hasDefaultValue) {
                                        hasDefaultValue = true;

                                        baseField.val(option);
                                    }
                                }
    
                                const opt = $('<option>').attr('value', option);
                                datalist.append(opt);
                            });

                            baseWrapper.append(datalist);
                        }

                        // Check if a help text is expected.
                        if (hasHelpText) {
                            const helpFeedback = $('<div>').attr('id', field.help.identifier).addClass('form-text').append(field.help.text);
                            baseWrapper.append(helpFeedback);
                        }

                        // At last, check if valid/invalid feedback containers are expected.
                        if (useValidationText) {
                            const validFeedback = $('<div>').addClass('valid-feedback');
                            const invalidFeedback = $('<div>').addClass('invalid-feedback');

                            baseWrapper.append(validFeedback);
                            baseWrapper.append(invalidFeedback);
                        }

                        // Finally, append the entire element and move on.
                        _this.element.append(baseWrapper);
                    } else {
                        // The 'section' element is managed separately.
                        const section = $('<h5>').addClass('form-section mt-4 mb-3').append(root);
                        _this.element.append(section);

                        if (field.divider === true) {
                            const divider = $('<hr>').addClass('form-section-divider');
                            _this.element.append(divider);
                        }
                    }
                }
            });
        }

        /**
         * Build the form's buttons.
         * @private
         */
        _buildButtons() {
            // Housekeeping
            const _this = this;

            const defaultType = 'button';
            const allowedTypes = [undefined, defaultType, 'submit',];

            // There is a single wrapper for all the buttons.
            const baseWrapper = $('<div>').addClass('form-buttons mt-5');

            // Buttons settings
            $.each(this.settings.buttons, function(id, button) {
                let validIdentifier = true;
                if (!_this._isValidString(id)) {
                    validIdentifier = false;
                    _this._sendMessage('detected invalid button identifier', 'error');
                }

                // Check if the button is allowed and it's of the 'string' type (except for 'undefined', allowed for implicit 'button').
                let validType = true;
                if (!allowedTypes.includes(button.type)) {
                    validType = false;
                    _this._sendMessage('invalid button type "' + button.type + '"', 'error');
                }

                // Check if a button's content was defined as an object.
                let validButton = true;
                if (typeof button !== 'object') {
                    validButton = false;
                    _this._sendMessage('detected button not of the \'object\' type ("' + button + '")', 'error');
                }

                // Check if a valid text was provided.
                let hasText = false;
                if (_this._isValidString(button.text)) {
                    hasText = true;
                }

                // Check if a valid icon was provided.
                let hasIcon = false;
                if (_this._isValidObject(button.icon) && _this._isValidString(button.icon.glyph)) {
                    hasIcon = true;
                }

                // If all the checks are passed, start defining the rendering rules.
                if (validIdentifier && validType && validButton && (hasText || hasIcon)) {
                    // Check if the button has a valid callback.
                    let hasCallback = false;
                    if (_this._isValidFunction(button.onClick)) {
                        hasCallback = true;
                    }

                    // Determine the button's type, with a default.
                    let baseButtonType = defaultType;
                    if (typeof button.type !== 'undefined') {
                        baseButtonType = button.type;
                    }

                    // Check if additional attributes were specified.
                    let hasAdditionalAttributes = false;
                    if (_this._isValidObject(button.attributes)) {
                        hasAdditionalAttributes = true;
                    }

                    // Base button element
                    const baseButton = $('<button>').addClass('btn').attr({id: id + '-btn', type: baseButtonType,});

                    // Populate the button with its text, if provided.
                    if (hasText) {
                        baseButton.append(button.text);
                    }

                    // Handle the button's icon, if provided.
                    if (hasIcon) {
                        const baseIcon = $('<i>').addClass('bi bi-' + button.icon.glyph);

                        // Manage the icon's placement.
                        const allowedPlacements = [undefined, 'start', 'end',];

                        if (allowedPlacements.includes(button.icon.placement)) {
                            switch (button.icon.placement) {
                                case 'start':
                                case undefined:
                                    if (hasText) {
                                        baseIcon.addClass('me-2');
                                    }
                                    baseButton.prepend(baseIcon);

                                    break;

                                case 'end':
                                    if (hasText) {
                                        baseIcon.addClass('ms-2');
                                    }
                                    baseButton.append(baseIcon);

                                    break;
                            }
                        } else {
                            _this._sendMessage('invalid button icon placement', 'warn');
                        }
                    }

                    // Additional attributes. Attributes that are supposed to be defined at a higher level will be skipped.
                    if (hasAdditionalAttributes) {
                        const specialAttributes = ['id', 'placeholder', 'type',];

                        $.each(button.attributes, function(attribute, value) {
                            // Check the proper formats.
                            if (_this._isValidString(attribute) && !_this._isValidObject(value) && !_this._isValidArray(value)) {
                                const cleanAttribute = attribute.trim();

                                // Skip the iteration for special keywords to avoid unintentional overriding.
                                if (specialAttributes.includes(cleanAttribute)) {
                                    return;
                                }

                                // Manage the CSS classes separately.
                                if (cleanAttribute === 'class') {
                                    if (_this._isValidString(value)) {
                                        baseButton.addClass(value);
                                    }
                                } else {
                                    // Any other case.
                                    baseButton.attr(cleanAttribute, value);
                                }
                            }
                        });
                    }

                    // Manage the button's click's callback.
                    if (hasCallback) {
                        baseButton.click(function(event) {
                            button.onClick(event);
                        });
                    }

                    // Finally, append the entire element and move on.
                    baseWrapper.append(baseButton);
                }
            });

            // Append all the buttons at once.
            this.element.append(baseWrapper);
        }

        /**
         * Specify what happens for specific form events.
         * @private
         */
        _handleCallbacks() {
            const _this = this;

            let isValidPreSubmit = true;
            if (!this._isValidFunction(this.settings.beforeSubmit)) {
                isValidPreSubmit = false;
            }

            let isValidSubmit = true;
            if (!this._isValidFunction(this.settings.onSubmit)) {
                isValidSubmit = false;
                this._sendMessage('no submit instructions given', 'warn');
            }

            let preventDefault = false;
            if (this.settings.preventDefault === true) {
                preventDefault = true;
            }

            // Intercept the submit event. Provide the event and the fields' values.
            this.element.submit(function(event) {
                if (preventDefault) {
                    event.preventDefault();
                }

                // Trim the fields and reset the validation elements.
                _this.element[pluginName]('trimFields');
                _this.element[pluginName]('resetValidation');

                if (isValidSubmit) {
                    const formData = _this.element[pluginName]('getFields');

                    if (isValidPreSubmit) {
                        _this.settings.beforeSubmit(event, formData);
                    }

                    _this.settings.onSubmit(event, formData);
                }
            });
        }

        /**
         * Check if a given element is of the 'array[]' type
         * and contains at least one element.
         * 
         * @param {mixed} element The element in exam.
         * @returns {boolean} Whether the element is a valid array or not.
         * @private
         */
        _isValidArray(element) {
            return Array.isArray(element) && element.length > 0;
        }

        /**
         * Check if a given function os of the 'function' type
         * and has at least one instruction within its body.
         * 
         * @param {mixed} element The element in exam.
         * @returns {boolean} Whether the element is a running function or not.
         * @private
         */
        _isValidFunction(element) {
            // Step one: check the type.
            let isValidType = false;
            if (typeof element === 'function') {
                isValidType = true;
            }

            // Step two: check if there are instructions within the function.
            let hasInstructions = false;
            if (isValidType) {
                const functionBody = element.toString().match(/\{([\s\S]*)\}/m)[1].replace(/^\s*\/\/.*$/mg, '');

                if (functionBody.length > 0) {
                    hasInstructions = true;
                }
            }

            return isValidType && hasInstructions;
        }

        /**
         * Check if a given element is of the 'object' type
         * and contains at least one key/value pair.
         * 
         * @param {mixed} element The element in exam.
         * @returns {boolean} Whether the element is a usable object or not.
         * @private
         */
        _isValidObject(element) {
            return typeof element === 'object' && !$.isEmptyObject(element);
        }

        /**
         * Check if a given element is of the 'string' type
         * and contains an actual, non-empty string.
         * 
         * @param {mixed} element The element in exam.
         * @returns {boolean} Whether the element is a valid string or not.
         * @private
         */
        _isValidString(element) {
            return typeof element === 'string' && element.trim();
        }

        /**
         * Craft a message to send to the browser's console.
         * 
         * @param {string} content The message's content.
         * @param {(undefined|string)} type The message's type.
         * @private
         */
        _sendMessage(content, type) {
            const defaultType = 'log';
            const allowedTypes = [defaultType, 'error', 'info', 'warn',];

            let messageType = defaultType;
            if (allowedTypes.includes(type)) {
                messageType = type;
            }

            this.messages.push({
                type: messageType,
                content: content,
            });
        }

        /**
         * Print eventual messages that this plugin raised.
         * @private
         */
        _printMessages() {
            $.each(this.messages, function(i, message) {
                console[message.type](displayName + ': ' + message.content + '.');
            });
        }
    }

    /**
     * Initialize this plugin for each instanced element
     * or apply the desired public method.
     * 
     * @example
     * $('#form').bootstrapForm({
     *     fields: {
     *         'form-field': {
     *             label: {
     *                 text: 'Input data',
     *             },
     *         },
     *     },
     * 
     *     buttons: {
     *       'submit-data': {
     *         type: 'submit',
     *         text: 'Submit data',
     *       },
     *     },
     * 
     *     onSubmit(event, formData) {
     *       // ...
     *     },
     * });
     * 
     * @param {(object|string)} config Options or method (with eventual arguments).
     * @returns {(undefined|function)} One of the public methods or this plugin's instance.
     * @public
     */
    $.fn[pluginName] = function(config) {
        if (methods[config]) {
            return methods[config].apply(this, [].slice.call(arguments, 1));
        } else if (typeof config === 'object') {
            return this.each(function(i, target) {
                new Plugin(this, config);
            });
        } else {
            console.error(displayName + ': invalid options.');
        }
    };

    /**
     * This plugin's default attributes and callbacks.
     * Each element can be externally overridden.
     * 
     * @example
     * $.fn.bootstrapForm.defaults.useName = true;
     * 
     * @type {object}
     * @public
     */
    $.fn[pluginName].defaults = {
        preventDefault: true,
    };
})(jQuery, window, document);
