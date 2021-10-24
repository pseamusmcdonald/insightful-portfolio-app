import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

import SignUp from '../components/useraccess/signUp'
import Login from '../components/useraccess/login'
import Layout from '../templates/layout'

const UserAccess = () => {

    const { currentUser } = useAuth()

    return (
        <>
            {currentUser ? <Redirect to='/app/dashboard'/> :
                <Layout>
                    <Route exact path='/auth/login' component={ Login }/>
                    <Route exact path='/auth/sign-up' component={ SignUp }/>
                </Layout>
            }
        </>
    )
}

export default UserAccess