import React, { useState } from 'react'
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"

import Position from './position'
import { useAuth } from '../../contexts/authContext'

import { db } from '../misc/firebase'
import StockSearchBox from '../misc/stock-search-box'

const AccountPositions = ({ currentAccount }) => {

    const { currentUser } = useAuth()
    const [ positions, setPositions ] = useState(currentAccount.positions)
    const [ isEditing, setIsEditing ] = useState(false)

    const accountRef = doc(db, `users/${currentUser.uid}/accounts`, `${currentAccount.name}`)

    const handlePortfolioEdit = () => {
        setIsEditing(prev => !prev)
    }

    const handleDeletePosition = async event => {

        event.preventDefault()

        await updateDoc(accountRef, {
            positions: arrayRemove(positions[event.target.value])
        })
            .then(() => {
                console.log('Success')
                setPositions(prev => {
                    const temp = prev.slice(0)
                    temp.splice(event.target.value, 1)
                    return temp
                })
            })
    }

    const handleAddPosition = async (event) => {

        event.preventDefault()

        const newPositionData = {
            company: `${event.target.company.value}`,
            cost: `${event.target.cost.value}`,
            shares: `${event.target.shares.value}`,
        }

        await updateDoc(accountRef, {
            positions: arrayUnion(newPositionData)
        })
            .then(() => {
                setPositions(prev => {
                    const temp = prev.slice(0)
                    temp.push(newPositionData)
                    return temp
                })
            })

            var form = event.target
            form.reset()
    }

    return (
        <div className='accountPositionsOverview'>
            <div className='positionContainer legend'>
            {(positions === null || positions.length === 0 && !isEditing) ?
                <h2 style={{margin: '5rem auto', textAlign: 'center'}}>Your portfolio is empty... Add Positions!</h2>
                :
                (!isEditing ?
                    <>
                    <p id='positionName'>Company</p>
                    <p id='positionPrice'>Price</p>
                    <p id='positionQuantity'>Quantity</p>
                    <p id='positionValue'>Total Value</p>
                    <p id='positionProportion'>% of Portfolio</p>
                    <p id='positionPnL'>Profit/Loss</p>
                    </>
                    :
                    <>
                    <p id='positionName' style={{width: '30%'}}>Company</p>
                    <p id='positionPrice' style={{width: '30%'}}>Cost</p>
                    <p id='positionQuantity'style={{width: '30%'}}>Quantity</p>
                    </>
                )
            }
            </div>
            {positions.map((position, index) => (
                <Position key={ position.name } position={ position } isEditing={ isEditing } index={ index } handleDeletePosition={ handleDeletePosition }/>
            ))}
            {isEditing ?
                <div>
                    <form className='positionEditForm' id='positionEditForm' style={{ padding: '.5rem 0' }} onSubmit={handleAddPosition} autoComplete='off'>
                        <StockSearchBox />
                        <input name='cost' type="number" min="0.00" max="10000.00" step="0.01" placeholder='Share Cost' required/>
                        <input name='shares' type="number" min="0" max="10000" step="1" placeholder='Quantity' required/>
                        <button type='submit' id='editPositionButton'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="rgba(47,204,113,1)"/>
                            </svg>
                        </button>
                    </form>
                </div>
                :
                null
            }
            <button className='hover-underline-animation' id='editPortfolioButton' onClick={ handlePortfolioEdit }>{!isEditing ? 'Edit Portfolio' : 'Save Portfolio'}</button>
        </div>
    )
}
 
export default AccountPositions