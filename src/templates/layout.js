import React from 'react'
import { useAuth } from '../contexts/authContext'

import Header from '../components/misc/header'
import Footer from '../components/misc/footer'

const Layout = ({ children }) => {

    const { currentUser } = useAuth()

    return (
        <React.Fragment>
            <Header currentUser={currentUser}/>
            <main>{children}</main>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout;