import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

const Routes = props => (
  <Layout>
    <Switch>
      <PrivateRoute
        {...props}
        path={'/dashboard'}
        exact
        component={Dashboard}
      />
      <PublicRoute
        {...props}
        exact
        component={Home}
        path='/'
        isRestricted={false}
      />
      <PublicRoute
        {...props}
        exact
        component={SignIn}
        path='/signIn'
        isRestricted={true}
      />
    </Switch>
  </Layout>
)

export default Routes;
