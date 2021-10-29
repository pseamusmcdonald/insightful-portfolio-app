import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { db } from '../misc/firebase'

import LineChart from '../misc/line_chart'
import AccountPositions from './account_positions'
import AccountDataOverview from './account_data_overview'
import Loading from '../misc/loading'
import { useAuth } from '../../contexts/authContext'

const Dashboard = () => {

    const { currentUser } = useAuth()

    const [ accounts, setAccounts ] = useState(null)
    const [ fetching, setFetching ] = useState(true)
    const [ currentAccount, setCurrentAccount ] = useState(null)

    const getData = async () => {

        let tempAccountArray = []

        const docsSnap = await getDocs(collection(db, `users/${currentUser.uid}/accounts`))

        await docsSnap.forEach((doc) => {
            tempAccountArray.push(doc.data())
        })

        setAccounts(tempAccountArray)
        setFetching(false)

    }

    const handleAccountSelection = (event) => {
        setCurrentAccount(event.target.value)
    }

    useEffect(() => {
        if (accounts === null) getData()
        if (currentAccount === null && accounts) setCurrentAccount(accounts[0])
    })


    return (
        <div className='dashboardContainer'>
        {fetching ? 
            <Loading />
            :
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
                    <AccountPositions currentAccount={currentAccount}/>
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
        }
        </div>
    )
}

export default Dashboard