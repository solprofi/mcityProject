import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  user,
  component: Comp,
  ...rest,
}) => (
    <Route {...rest} component={props => (
      rest.isRestricted ?
        (user ?
          <Redirect to='/dashboard' />
          :
          <Comp {...props} user={user} />
        )
        :
        <Comp {...props} user={user} />
    )} />
  )

export default PublicRoute;
