import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import NotificationSender from './components/NotificationSender/NotificationSender';
import Uploader from './components/Uploader/Uploader'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/' component={Uploader} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
