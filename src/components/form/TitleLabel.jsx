import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
    &.ant-form-item-label {
        font-weight: 600;
        
        &.ant-form-item-required:after {
            display: inline-block;
            margin-left: 4px;
            content: " *";
            line-height: 1;
            font-size: 14px;
            color: #f5222d;
        }
    }
`

const propTypes = {
    title: PropTypes.string.isRequired,
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool
}

const defaultProps = {
    required: false
}


const getRequiredCssClass = (isRequire) => {
    return isRequire ? 'ant-form-item-required' : '';
}

const TitleLabel = (props) => {
    return (
        <StyledLabel {...props} className={`ant-form-item-label ${getRequiredCssClass(props.required)} ${props.className}`}>
            {props.title}
        </StyledLabel>
    );
};

TitleLabel.propTypes = propTypes;
TitleLabel.defaultProps = defaultProps;

export default TitleLabel;