import React, { useState } from 'react'

import Accounts from './accounts'
import Portfolio from './portfolio'

const Dashboard = () => {

    const [ currentAccount, setCurrentAccount ] = useState("ACCOUNT")

    const handleAccountSelection = (event) => {
        setCurrentAccount(event.target.value)
    }

    return (
        <div className='dashboardContainer'>
            <Accounts currentAccount={currentAccount} callback={handleAccountSelection}/>
            <Portfolio currentAccount={currentAccount}/>
        </div>
    )
}

export default Dashboard