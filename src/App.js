import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from './components/misc/protectedRoute'

import Homepage from './pages/homepage'
import UserAccess from './pages/useraccess'
import Application from './pages/application'
import Contact from './pages/contact'
import AuthProvider from './contexts/authContext'



const App = () => {

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/auth' component={UserAccess}/>
          <ProtectedRoute route ='/app' reUrl='/' component={Application} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
