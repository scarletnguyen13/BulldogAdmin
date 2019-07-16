/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import NotificationSender from './components/NotificationSender/NotificationSender';
import Uploader from './components/Uploader/Uploader'

const App = function() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={NotificationSender} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
