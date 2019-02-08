import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';
import Matches from './components/admin/Matches/Matches';
import AddMatch from './components/admin/Matches/AddMatch';
import Players from './components/admin/Players/Players';
import AddPlayer from './components/admin/Players/AddPlayer';
import Team from './components/Team/Team';
import MatchList from './components/MatchList/MatchList';
import PageNotFound from './components/PageNotFound/PageNotFound';

const Routes = props => (
  <Layout>
    <Switch>
      <PrivateRoute
        {...props}
        path={'/dashboard'}
        exact
        component={Dashboard}
      />
      <PrivateRoute
        {...props}
        path={'/matches'}
        exact
        component={Matches}
      />
      <PrivateRoute
        {...props}
        path={'/players'}
        exact
        component={Players}
      />
      <PrivateRoute
        {...props}
        path={'/matches/editMatch'}
        exact
        component={AddMatch}
      />
      <PrivateRoute
        {...props}
        path={'/matches/editMatch/:id'}
        exact
        component={AddMatch}
      />
      <PrivateRoute
        {...props}
        path={'/players/addPlayer/:id'}
        exact
        component={AddPlayer}
      />
      <PrivateRoute
        {...props}
        path={'/players/addPlayer'}
        exact
        component={AddPlayer}
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
        component={MatchList}
        path='/matchList'
        isRestricted={false}
      />
      <PublicRoute
        {...props}
        exact
        component={Team}
        path='/team'
        isRestricted={false}
      />
      <PublicRoute
        {...props}
        exact
        component={SignIn}
        path='/signIn'
        isRestricted={true}
      />
      <PublicRoute
        {...props}
        exact
        component={PageNotFound}
        isRestricted={false}
      />
    </Switch>
  </Layout>
)

export default Routes;
