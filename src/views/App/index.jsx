import bugsnag from 'bugsnag-js';
import React, { Component, Fragment } from 'react';
import createPlugin from 'bugsnag-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import store from '../../redux/store/store';
import './App.scss';
import Routes from '../../routes/index';
import '../../../node_modules/material-design-lite/material';
import '../../../node_modules/material-design-icons';
import '../../customStyles/toast.scss';


// Check if the bugsnag API key was configured correctly
// and handle cases where the key was not provided.
let Wrapper = Fragment;

if (process.env.REACT_APP_BUGSNAG_API_KEY) {
  /* istanbul ignore next */
  const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_API_KEY);
  /* istanbul ignore next */
  let Wrapper = bugsnagClient.use(createPlugin(React));
}

// Calender settings
moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

class App extends Component {
  render() {
    return (
      <Wrapper>
        <div className="App-container">
          <Provider store={store}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </Provider>
        </div>
      </Wrapper>
    );
  }
}

export default App;
