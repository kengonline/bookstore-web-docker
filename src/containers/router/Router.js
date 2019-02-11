import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

// Services
import { getAsRouter } from 'src/services/router.service'

// Components
import ErrorPage from 'src/containers/error/ErrorPage'
import ErrorBoundary from 'src/components/security/ErrorBoundary';

// Scripts
import './trigger-router'

class Router extends Component {
    constructor(props) {
        super(props);

        this.routers = getAsRouter()
    }

    renderRouters = (routers = []) => {
        return routers.map(function (router, i) {
            const TargetComponent = router.component
            return (
                <Route exact key={i} path={router.path} component={(props) => (
                    <ErrorBoundary>
                        <TargetComponent {...props} permissions={router.permissions} />
                    </ErrorBoundary>
                )} />
            )
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                {this.renderRouters(this.routers)}
                <Route component={ErrorPage} />
            </Switch>
        );
    }
}

export default Router;