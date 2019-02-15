import React, { useEffect, useState } from 'react';
import { Icon } from "antd";
import styled from 'styled-components';
import MomentPropTypes from 'react-moment-proptypes';

const ClockIcon = styled(Icon)`
    &.anticon {
        margin-right: 4px;
    }
`

const propTypes = {
    value: MomentPropTypes.momentObj.isRequired,
};

const RelativeTime = ({ className, value }) => {
    const setState = useState()[1]

    useEffect(() => {
        const interval = setInterval(() => setState({}), 60000);

        return function cleanup() {
            clearInterval(interval);
        }
    })

    return (
        <div className={`relative-time ${className}`}>
            <ClockIcon key="icon" type="clock-circle" className="icon" />
            <span key="time" className="label">{value.fromNow()}</span>
        </div>
    );
};


RelativeTime.propTypes = propTypes

export default RelativeTime;