import React from 'react'

const Position = ({position, isEditing, handleDeletePosition, index}) => {

    const currentPrice = 25

    const currentValue = currentPrice * position.shares
    const profitLoss = (currentPrice * position.shares) - (position.cost * position.shares)
    

    return(
        <div className='positionContainer'>
            {!isEditing ?
                <> 
                <p id='positionName'>{position.company}</p>
                <p id='positionPrice'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentPrice)}</p>
                <p id='positionQuantity'>{new Intl.NumberFormat('en-US').format(position.shares)}</p>
                <p id='positionValue'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentValue)}</p>
                <p id='positionProportion'>{position.proportion}</p>
                <p id='positionPnL' style={profitLoss > 0 ? {color: 'green'} : {color: 'red'}}>{profitLoss > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(profitLoss)}</p>
                </>
                :
                <>
                <form className='positionEditForm'>
                    <p style={{width: '30%'}} id='positionName'>{position.company}</p>
                    <input style={{width: '28%', marginRight: '2%'}} type="number" min="0.00" max="10000.00" step="0.01" placeholder={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(position.cost)}/>
                    <input style={{width: '28%', marginRight: '2%'}} type="number" min="0" max="10000" step="1" placeholder={new Intl.NumberFormat('en-US').format(position.shares)}/>
                    <button id='editPositionButton' onClick={handleDeletePosition} value={index}>
                        <svg style={{pointerEvents: 'none'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" fill="rgba(217,79,79,1)"/>
                        </svg>
                    </button>
                </form>
                </>
            }
        </div>
    )
}

export default Position