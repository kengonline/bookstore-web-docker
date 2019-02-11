import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Row, Col } from 'antd';

// Constants
import { MESSAGE_TYPE } from 'src/constants/form.constant';

// PropTypes
import { ValidationPropTypes, MessageTypePropTypes } from 'src/prop-types/form.prop-types';

const StyledCol = styled(Col)`
    &.error-message {
        color: red;
        white-space: nowrap;
    }
    &.warning-message {
        color: #faad14;
        white-space: nowrap;
    }
`

const propTypes = {
    id: PropTypes.string.isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.shape({
        validate: ValidationPropTypes.isRequired,
        message: PropTypes.string.isRequired,
        type: MessageTypePropTypes,
        value: PropTypes.any
    }))
}

const defaultProps = {
    dataSource: []
}

class ErrorMessages extends Component {
    renderErrors = (id, dataSource) => {
        return dataSource.map((error, index) => {
            const { validate, type, message } = error;
            const key = `${id}_${index}_${validate}_${type}`
            return (
                <StyledCol
                    key={key}
                    span={24}
                    className={this.getCssClass(type)}
                >
                    {message}
                </StyledCol>
            )
        })
    }

    getCssClass = (type = MESSAGE_TYPE.ERROR) => {
        if (type === MESSAGE_TYPE.ERROR) {
            return "error-message";
        } else if (type === MESSAGE_TYPE.WARNING) {
            return "warning-message";
        } else {
            return "";
        }
    }

    render() {
        const { id, dataSource } = this.props;

        return (
            <Row>
                {this.renderErrors(id, dataSource)}
            </Row>
        )
    }
}

ErrorMessages.propTypes = propTypes;
ErrorMessages.defaultProps = defaultProps;

export default ErrorMessages;