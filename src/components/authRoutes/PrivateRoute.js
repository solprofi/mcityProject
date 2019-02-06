import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  user,
  component: Comp,
  ...rest,
}) => (
    <Route {...rest} component={props => (
      user ?
        <Comp {...props} user={user} />
        :
        <Redirect to='signIn' />
    )} />
  )

export default PrivateRoute;
