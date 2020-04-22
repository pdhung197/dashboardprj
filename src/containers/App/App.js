import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AuthForm from './../AuthForm/AuthForm';
import UserList from './../UserList/UserList';

import AuthRoute from './../../components/AuthRoute/AuthRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={UserList} />
          <AuthRoute path="/userlist" component={UserList} />
          <Route path="/login" component={() => <AuthForm authType='login' />} />
          <Route path="/register" component={() => <AuthForm authType='register' />} />
        </Switch>
      </Router>
    );
  }
}

export default App;