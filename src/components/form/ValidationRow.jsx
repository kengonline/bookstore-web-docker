import React from 'react';
import PropTypes from 'prop-types';
import { Row } from "antd";
import _ from 'lodash';

// Services
import { wrapValidateClass } from "src/services/form.service";

const propTypes = {
    className: PropTypes.string,
    element: PropTypes.shape({
        dirty: PropTypes.bool,
        errors: PropTypes.array
    })
}

const defaultProps = {
    className: '',
    element: {},
    gutter: 16
}

const ValidationRow = (props) => {
    const { children, className, element } = props;
    return (
        <Row {..._.omit(props, 'element')} className={wrapValidateClass(element, `ant-form-item ${className}`)}>
            {children}
        </Row>
    );
};

ValidationRow.propTypes = propTypes;
ValidationRow.defaultProps = defaultProps;

export default ValidationRow;