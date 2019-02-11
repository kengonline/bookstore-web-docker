import React from 'react';
import { connect } from 'react-redux';
import { redirect } from 'src/services/router.service'

class ErrorBoundary extends React.Component {

    componentWillUnmount() {
        // this.props.clearTimeout();
    }

    componentDidCatch(error, info) {
        redirect('/error')
        console.error(info)
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state, ownProps) => {
    const { isTimeout } = state.securityReducer;
    return {
        isTimeout
    }
}

ErrorBoundary = connect(mapStateToProps, {})(ErrorBoundary);

export default ErrorBoundary;