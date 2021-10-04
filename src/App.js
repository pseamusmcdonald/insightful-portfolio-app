import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Homepage from './components/homepage/homepage';
import UserAccess from './components/useraccess/useraccess';
import Application from './components/application/application';

const App = () => {
  return (
    <Router>
      <div>

      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth/login">Login / Sign Up</Link>
          </li>
          <li>
            <Link to="/app">App</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route path='/auth'>
            <UserAccess />
          </Route>
          <Route path='/dashboard'>
            <Application />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
