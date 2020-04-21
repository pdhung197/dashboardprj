import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthForm from './../AuthForm/AuthForm';
import UserList from './../UserList/UserList';

import AuthRoute from './../../components/AuthRoute/AuthRoute';

class App extends Component {
    render() {
        return (
            <Router>
                <AuthRoute exact path="/" component={UserList} />
                <AuthRoute path="/userlist" component={UserList} />
                <Route path="/login" render={props => <AuthForm {...props} authType='login' />} />
                <Route path="/register" render={props => <AuthForm {...props} authType='register' />} />
            </Router>
        );
    }
}

export default App;