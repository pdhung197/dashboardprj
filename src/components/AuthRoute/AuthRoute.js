import React from 'react'
import { Route, Redirect } from 'react-router-dom';

/* AuthRoute is a route for re-check user was login or not to call and receive data */

const AuthRoute = ({ component: AuthenticatedComponent, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('jwtToken')
            ? <AuthenticatedComponent {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default AuthRoute;