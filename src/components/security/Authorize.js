import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAuthorize } from 'src/services/security.service'

const propTypes = {
    userProfile: PropTypes.object,
    permissions: PropTypes.array
}

class Authorize extends Component {
    render() {
        if (isAuthorize(this.props.permissions))
            return this.props.children
        else
            return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userProfile: state.security
    }
}

Authorize.propTypes = propTypes;

Authorize = connect(mapStateToProps)(Authorize);

export default Authorize;