import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { db } from '../misc/firebase'

import LineChart from '../misc/line_chart'
import AccountPositions from './account_positions'
import AccountDataOverview from './account_data_overview'
import Loading from '../misc/loading'
import { useAuth } from '../../contexts/authContext'

const Dashboard = () => {

    const labelsArray = [
        {
            labelRange: 'daily',
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'],
        },
        {
            labelRange: 'weekly',
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'],
        },
        {
            labelRange: 'monthly',
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'],
        },
        {
            labelRange: 'yearly',
            labels: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec'],
        },
    ]


    const { currentUser } = useAuth()

    const [ accounts, setAccounts ] = useState(null)
    const [ fetching, setFetching ] = useState(true)
    const [ currentAccount, setCurrentAccount ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ labels, setLabels ] = useState(labelsArray[labelsArray.map(label => label.labelRange).indexOf('daily')].labels)

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

    const handleChartRangeSelection = (event) => {
        setLabels(labelsArray[labelsArray.map(label => label.labelRange).indexOf(`${event.target.value}`)].labels)
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
                    <select id='chartPeriodSelection' onChange={handleChartRangeSelection}>
                        <option value='daily'>1 Day</option>
                        <option value='weekly'>5 Day</option>
                        <option value='monthly'>1 Month</option>
                        <option value='yearly'>1 Year</option>
                        <option value='ytd'>YTD</option>
                    </select>
                    <LineChart data={data} labels={labels}/>
                </div>
            </div>
            </>
        }
        </div>
    )
}

export default Dashboard