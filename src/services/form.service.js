import React from 'react'
import _ from 'lodash'
import { Select, Radio } from 'antd'
import moment from 'moment';

// Constants
import { VALIDATION } from 'src/constants/form.constant';

// Components
import ErrorMessages from 'src/components/shared/custom-form/ErrorMessages';

export const normalizeField = (value) => {
    if (_.isString(value)) {
        return value.trim()
    } else {
        return value
    }
}

export const getRegex = (pattern) => {
    let regex;
    if (typeof pattern === 'string') {
        regex = new RegExp(pattern, 'g');
    } else if (pattern && typeof pattern.test === 'function') {
        regex = pattern;
    }

    return regex
}

const isRequiredValid = (value, validate) => {
    if ([VALIDATION.REQUIRED, VALIDATION.REQUIRED_NUMBER].indexOf(validate) === -1) {
        return true;
    }

    if (validate === VALIDATION.REQUIRED_NUMBER || typeof value === 'number') {
        return isRequiredNumber(value);
    } else {
        return value && value !== "" && !_.isEmpty(value);
    }
}

const isRequiredNumber = (value) => {
    return !isNaN(value) && value !== "" && value !== null;
}

export const fieldValidation = (rawValue, validations = [], args) => {

    const fieldValue = typeof rawValue === 'string' ? rawValue.trim() : rawValue;

    const errors = validations.filter(validation => {
        const { validate, value } = validation;

        const requiredValid = isRequiredValid(fieldValue, validate);

        if (!requiredValid) {
            return true;
        } else if (validate === VALIDATION.PATTERN) {
            const regex = getRegex(value);
            if (!_.isEmpty(fieldValue) && regex && !regex.test(fieldValue)) {
                return true;
            }
        } else if (validate === VALIDATION.MINLENGTH && `${fieldValue}`.length > 0 && `${fieldValue}`.length < value) {
            return true;
        } else if (validate === VALIDATION.MAXLENGTH && `${fieldValue}`.length > value) {
            return true;
        } else if (validate === VALIDATION.MIN && fieldValue < value) {
            return true;
        } else if (validate === VALIDATION.MAX && fieldValue > value) {
            return true;
        } else if (validate === VALIDATION.FUNCTION && typeof value === 'function' && !value(fieldValue, args)) {
            return true;
        } else if (validate === VALIDATION.MIN_DATE && moment.isMoment(fieldValue) && moment.isMoment(value) && !fieldValue.isSameOrAfter(value)) {
            return true;
        } else if (validate === VALIDATION.MAX_DATE && moment.isMoment(fieldValue) && moment.isMoment(value) && !fieldValue.isSameOrBefore(value)) {
            return true;
        }

        return false;
    })

    return { valid: errors.length === 0, errors };
}

export const getUpdatedForm = (id, value, formValue) => {
    const targetElement = formValue[id];

    const { valid, errors } = fieldValidation(value, targetElement.validation);
    const newFormValue = { ...formValue, [id]: { ...targetElement, value, valid, errors, dirty: true } };

    return {
        formValue: newFormValue,
        isValid: isFormValid(newFormValue)
    }
}

export const imageObjectValidation = (imageObj = {}, validations = []) => {
    const errors = validations.filter(validation => {
        const { validate } = validation;

        const requiredValid = validate !== VALIDATION.REQUIRED || imageObj.src !== undefined;

        if (!requiredValid) {
            return true;
        }

        return false;
    })

    return { valid: errors.length === 0, errors };
}

export const isFormValid = (form) => {
    const invalidElement = Object.keys(form).find(key => !key.startsWith('$') && form[key] && form[key].valid === false);
    return invalidElement === undefined
}

const getElementValue = (element = {}) => {
    if (typeof element.value === 'string') {
        const trimValue = element.value.trim();
        return trimValue.length === 0 ? undefined : trimValue;
    } else {
        return element.value;
    }
}

export const extractValue = (formValue) => {
    return Object.keys(formValue).reduce((result, key) => {
        return {
            ...result,
            [key]: getElementValue(formValue[key])
        }
    }, {})
}

export const wrapValidateClass = (element, basedClass = '') => {
    const { dirty, errors = [] } = element;
    return errors.length && dirty ? `${basedClass} error-element` : basedClass;
}

export const getCssClassTitle = (basedClass, isRequire) => {
    return isRequire ? `${basedClass} form-title ant-form-item-required required-field` : `${basedClass} form-title`;
}

export const isFormDisabled = (disabled, disabledField) => {
    return disabled || disabledField;
}

export const renderOptions = (options) => {
    return options.map(({ text, value }) => <Select.Option key={value} value={value} title={text}>{text}</Select.Option>)
}

export const renderRadioOptions = (options = []) => {
    return options.map(option => <Radio key={option.value} value={option.value}>{option.text}</Radio>);
}

export const renderErrors = (id, { dirty, valid, errors }) => {
    if (!dirty || valid) {
        return null;
    }

    return <ErrorMessages id={id} dataSource={errors} />
}

export const generateElement = (value, validation, args) => {
    let validationObj = { valid: true }

    if (validation !== undefined) {
        validationObj = {
            validation,
            ...fieldValidation(value, validation, args)
        }
    }

    return {
        dirty: false,
        value,
        ...validationObj
    }
}

export const getPlaceholder = (text, readOnly) => {
    return readOnly ? undefined : text;
}

export const extractValueFormValue = (formValue = {}) => {
    const keys = Object.keys(formValue)
    const result = keys.reduce((result, key) => ({ ...result, [key]: formValue[key].value }), {})
    return result
}

export const getNumberValueFromValidation = (fieldValue, validations = []) => {
    const targetValidation = validations.find(validation => {
        const { validate, value } = validation;
        if (validate === VALIDATION.MIN && fieldValue < value) {
            return true;
        } else if (validate === VALIDATION.MAX && fieldValue > value) {
            return true;
        } else {
            return false;
        }
    })

    if (targetValidation === undefined) {
        return fieldValue;
    } else {
        return targetValidation.value;
    }
}

export const isAllFormValid = (isFormValid = {}) => {
    const allFormKeys = Object.keys(isFormValid)
    const inValidForms = allFormKeys.filter((key) => isFormValid[key] !== true)
    return inValidForms.length === 0
}

export const getDirtyForm = (formValue = {}) => {
    return Object.keys(formValue).reduce((result, key) => {
        return { ...result, [key]: { ...formValue[key], dirty: true } }
    }, {})
}