import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Homepage from './components/homepage/homepage';
import UserAccess from './components/useraccess/useraccess';
import Application from './components/application/application';
import AuthProvider from './contexts/authContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/auth' component={UserAccess}/>
          <Route path='/dashboard' component={Application}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
