import React from 'react'
import Layout from '../templates/layout'

import { useAuth } from '../contexts/authContext'
import { Redirect } from 'react-router-dom'

const Homepage = () => {

    const { currentUser } = useAuth()

    return (
        <>
            {currentUser ? <Redirect to='/app/dashboard'/> :
                <Layout>
                    <h1>This is a demo for a portfolio tracker built in React. Sign up to check it out!</h1>
                </Layout>
            }
        </>
    )
}

export default Homepage