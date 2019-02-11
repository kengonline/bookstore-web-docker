import React from 'react';
import PropTypes from 'prop-types';

// Services
import { getCssClassTitle } from "src/services/form.service";

const propTypes = {
    title: PropTypes.string.isRequired,
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool
}

const defaultProps = {
    required: false
}

const TitleLabel = (props) => {
    return (
        <label {...props} className={getCssClassTitle(`ant-form-item-label ${props.className}`, props.required)}>
            {props.title}
        </label>
    );
};

TitleLabel.propTypes = propTypes;
TitleLabel.defaultProps = defaultProps;

export default TitleLabel;