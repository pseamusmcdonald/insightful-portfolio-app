import React from 'react'
import Header from '../components/misc/header'
import { useAuth } from '../contexts/authContext'

const Layout = ({ children }) => {

    const { currentUser } = useAuth()

    return (
        <React.Fragment>
            <Header currentUser={currentUser}/>
            <main>{children}</main>
            <h1>footer</h1>
        </React.Fragment>
    )
}

export default Layout;