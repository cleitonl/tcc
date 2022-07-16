import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth'

import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route  path='/logout' component={Logout} />
      <Route  path='/signup' component={Signup} />
      <PrivateRoute  path='/user' component={User} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;

