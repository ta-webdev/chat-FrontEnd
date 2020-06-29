import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Configrator from './Configrator';
import PollResult from './PollResult';
import SinglePollResult from './SinglePollResult';
import renderMessageImp from './renderMessageImp'

function Navigation() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/config" exact component={Configrator} />
        <Route path="/pollresult" exact component={SinglePollResult} />
        <Route path="/selectedMessage" exact component={renderMessageImp} />
      </Switch>
    </Router>
  );
}

export default Navigation;
