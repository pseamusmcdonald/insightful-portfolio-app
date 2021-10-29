import React, { useEffect, useState } from 'react'

import LineChart from '../misc/line_chart'
import AccountPositions from './account_positions'
import AccountDataOverview from './account_data_overview'


const AccountOverview = ({accounts}) => {

    const [ currentAccount, setCurrentAccount ] = useState(accounts[0])

    const handleAccountSelection = (event) => {
        setCurrentAccount(event.target.value)
    }


    return (
        <>
            <div className='accountsDropdown'>
                <select onChange={handleAccountSelection}>
                    {accounts.map((account) => (
                        <option value={account.id}>{account.name}</option>
                    ))}
                </select>
            </div>
            <div className='accountOverviewContainer'>
                <div className='accountOverviewData'>
                    <AccountDataOverview account={currentAccount} />
                    <AccountPositions positions={currentAccount.positions}/>
                </div>
                <div className='accountOverviewChart'>
                    <select id='chartPeriodSelection'>
                        <option>1 Day</option>
                        <option>5 Day</option>
                        <option>1 Month</option>
                        <option>1 Year</option>
                        <option>YTD</option>
                    </select>
                    <LineChart />
                </div>
            </div>
        </>
    )
}

export default AccountOverview