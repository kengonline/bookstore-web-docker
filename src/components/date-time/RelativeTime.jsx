import React from 'react';
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

const RelativeTime = props => {
    return (
        <div className={`relative-time ${props.className}`}>
            <ClockIcon key="icon" type="clock-circle" className="icon" />
            <span key="time" className="label">{props.value.fromNow()}</span>
        </div>
    )
};

RelativeTime.propTypes = propTypes

export default RelativeTime;