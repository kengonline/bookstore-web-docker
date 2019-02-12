import React, { Component } from 'react';
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

class RelativeTime extends Component {
    componentDidMount() {
        this.interval = setInterval(() => this.setState({}), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { className, value } = this.props;

        return (
            <div className={`relative-time ${className}`}>
                <ClockIcon key="icon" type="clock-circle" className="icon" />
                <span key="time" className="label">{value.fromNow()}</span>
            </div>
        );
    }
}

RelativeTime.propTypes = propTypes

export default RelativeTime;