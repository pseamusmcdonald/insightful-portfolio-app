import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

const ProtectedRoute = ({ reUrl, component }) => {

    const { currentUser } = useAuth()

    return (
        <Route to='/app'>
            {currentUser ? component : <Redirect to={reUrl} />}
        </Route>
    )
}

export default ProtectedRoute