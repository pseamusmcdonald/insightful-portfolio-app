import React from 'react'
import { Route } from 'react-router-dom'

import Dashboard from '../components/application/dashboard'
import Search from '../components/application/search'
import Layout from '../templates/layout'

const Application = () => {
    
    return (
        <Layout>
            <Route exact path='/app/dashboard' component={Dashboard}/>
            <Route exact path='/app/search' component={Search}/>
            <Route exact path='/app/profile' />
            <Route exact path='/app/settings' />
        </Layout>
    )
}

export default Application