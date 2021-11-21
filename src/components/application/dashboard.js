import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, setDoc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore"
import { db } from '../misc/firebase'

import AccountPositions from './account_positions'
import AccountDataOverview from './account_data_overview'
import AccountOverviewChart from './account-overview-chart'
import Loading from '../misc/loading'
import { useAuth } from '../../contexts/authContext'
import { set } from 'date-fns'

const Dashboard = () => {


    const { currentUser } = useAuth( )

    const [ accounts, setAccounts ] = useState(null)
    const [ fetching, setFetching ] = useState(true)
    const [ currentAccount, setCurrentAccount ] = useState(null)

    const getAccountData = async () => {

        let tempAccountArray = []
		
        const docsSnap = await getDocs(collection(db, `users/${currentUser.uid}/accounts`))

        await docsSnap.forEach((doc) => {
            tempAccountArray.push(doc.data())
        })

		if (tempAccountArray.length > 0) {
			setAccounts(tempAccountArray)
			setFetching(false)
		}
		else {
			const newAccountData = {
				isDefault: true,
				name: 'defaultAccount',
				positions: [],
			}
			await setDoc(doc(db, `users/${currentUser.uid}/accounts`, "defaultAccount"), newAccountData)
			const docsSnap = await getDocs(collection(db, `users/${currentUser.uid}/accounts`))
			setAccounts(docsSnap)
			setFetching(false)
		}

    }

    const handleAccountSelection = (event) => {
        setCurrentAccount(event.target.value)
    }

	const handleAddPosition = async (event) => {

        event.preventDefault()

        const newPositionData = {
            company: `${event.target.company.value}`,
            cost: `${event.target.cost.value}`,
            shares: `${event.target.shares.value}`,
        }

        await updateDoc(doc(db, `users/${currentUser.uid}/accounts`, `${currentAccount.name}`), {
            positions: arrayUnion(newPositionData)
        })

		var form = event.target
		form.reset()

		getAccountData()
    }

	const handleDeletePosition = async event => {

        event.preventDefault()

        await updateDoc(doc(db, `users/${currentUser.uid}/accounts`, `${currentAccount.name}`), {
            positions: arrayRemove(currentAccount.positions[event.target.value])
        })

		getAccountData()
    }

    useEffect(() => {
        if (accounts === null) getAccountData()
        if (currentAccount === null && accounts) setCurrentAccount(accounts[0])
    })

	useEffect(() => {
        if (accounts) setCurrentAccount(accounts[0])
    }, [accounts])

    return (
        <div className='dashboardContainer'>
        {fetching ? 
            <Loading />
            :
            <>

            <div className='accountOverviewContainer'>
				{} 
				<>
					<div className='accountOverviewData'>
						<AccountPositions positions={currentAccount.positions} handleAddPosition={handleAddPosition} handleDeletePosition={handleDeletePosition}/>
					</div>
					<AccountOverviewChart positions={currentAccount.positions}/>
				</>
            </div>
            </>
        }
        </div>
    )
}

export default Dashboard