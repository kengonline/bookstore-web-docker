import React from 'react';

const LabelMessage = props => {
    return (
        <label className={`ant-form-item-label ${props.className}`}>
            {props.children}
        </label>
    );
};

export default LabelMessage;