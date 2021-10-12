import React from 'react'
import { Link, Route } from 'react-router-dom'

import SignUp from './signUp'
import Login from './login'
import Layout from '../../templates/layout'

const UserAccess = () => {
    return (
        <Layout>
            <Route exact path='/auth/login' component={ Login }/>
            <Route exact path='/auth/sign-up' component={ SignUp }/>
        </Layout>
    )
}

export default UserAccess