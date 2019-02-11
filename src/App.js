import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router'

// Configs
import history from 'src/configs/router.config'
import store from 'src/configs/store.config'
import Config from 'src/configs/env.config'
import 'src/configs/axios.config'
import 'src/configs/moment.config'
import 'src/configs/accounting.config'
import 'src/configs/notification.config'

// Services
import { verifyUserProfile } from "src/services/security.service";

// Components
import ScrollToTop from 'src/containers/router/ScrollToTop'
import RouterComponent from 'src/containers/router/Router'
import LoadingScreen from "src/components/shared/loading/LoadingScreen";
import TimeoutNotification from "src/containers/error/TimeoutNotification";

// CSS
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    console.log(`App Version: ${Config.VERSION}`)
  }

  async componentDidMount() {
    await verifyUserProfile();
    this.setState({ loading: false });
  }

  renderContent = (loading) => {
    if (loading) {
      return <LoadingScreen />;
    } else {
      return <RouterComponent />;
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <Provider store={store}>
        <Router history={history}>
          <ScrollToTop>
            <TimeoutNotification />
            {this.renderContent(loading)}
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;