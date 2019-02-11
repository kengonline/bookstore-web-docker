import React from 'react';
import { connect } from 'react-redux';

// Services
import { redirect } from 'src/services/router.service'
import { isAuthorize } from 'src/services/security.service';
import { alertDanger } from "src/services/alert.service";

export default function requireAuth(Component) {
    class Authenticate extends React.Component {
        componentWillMount() {
            const { isAuthenticated, permissions } = this.props;
            if (!isAuthenticated) {
                alertDanger("Your session already timeout.")
                redirect('/login')
            } else if (!isAuthorize(permissions)) {
                redirect(`/unauthorize`)
            }
        }

        render() {
            if (!this.props.isAuthenticated) {
                return null
            }

            return (
                <Component {...this.props} />
            );
        }
    }

    const mapStateToProps = (state) => {
        const { token } = state.securityReducer;
        return {
            isAuthenticated: !!token,
        }
    }

    Authenticate = connect(mapStateToProps)(Authenticate);

    return Authenticate;
}