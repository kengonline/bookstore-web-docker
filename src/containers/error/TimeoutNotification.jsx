import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd'

// Actions
import { closeTimeout } from "src/actions/notification.action";

const TIMEOUT_NOTIFICATION_KEY = 'timeout_noti';

class TimeoutNotification extends Component {
    componentDidUpdate(prevProps, prevState) {
        const { locale, timeout } = this.props;

        if (timeout && !prevProps.timeout) {
            this.showNotification();
        } else if (locale !== prevProps.locale && timeout && prevProps.timeout) {
            this.showNotification();
        } else if (!timeout && prevProps.timeout) {
            notification.close(TIMEOUT_NOTIFICATION_KEY);
        }
    }

    showNotification = () => {
        const { closeTimeout } = this.props;

        notification.warning({
            key: TIMEOUT_NOTIFICATION_KEY,
            message: "Connection Timeout",
            description: "This request take too long time. Please refresh and try again or contact us.",
            duration: 0,
            onClose: closeTimeout
        });
    }

    render() {
        return <div></div>;
    }
}

const mapStateToProps = (state) => {
    const { timeout } = state.notificationReducer;
    return { timeout }
}

const mapDispatchToProps = {
    closeTimeout
}

TimeoutNotification = connect(mapStateToProps, mapDispatchToProps)(TimeoutNotification);

export default TimeoutNotification;