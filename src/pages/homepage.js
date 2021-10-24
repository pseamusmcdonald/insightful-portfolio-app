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
                    <h1>wdsa</h1>
                </Layout>
            }
        </>
    )
}

export default Homepage