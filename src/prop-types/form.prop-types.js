import PropTypes from 'prop-types'

// Constants
import { VALIDATION, MESSAGE_TYPE } from "src/constants/form.constant";

// PropTypes
import { IdPropTypes } from "src/prop-types/common.prop-types";

export const ValidationPropTypes = PropTypes.oneOf([
    VALIDATION.REQUIRED,
    VALIDATION.REQUIRED_NUMBER,
    VALIDATION.PATTERN,
    VALIDATION.MINLENGTH,
    VALIDATION.MAXLENGTH,
    VALIDATION.MIN,
    VALIDATION.MAX,
    VALIDATION.MIN_DATE,
    VALIDATION.MAX_DATE,
    VALIDATION.FUNCTION
]);

export const MessageTypePropTypes = PropTypes.oneOf([MESSAGE_TYPE.ERROR, MESSAGE_TYPE.WARNING]);

export const OptionPropTypes = PropTypes.shape({
    text: PropTypes.string,
    value: IdPropTypes,
    disabled: PropTypes.bool
})