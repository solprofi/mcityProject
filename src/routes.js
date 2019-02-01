import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import Home from './components/Home/Home';



const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          exact
          component={Home}
          path='/'
        />
      </Switch>
    </Layout>
  )
}

export default Routes;
