import React from 'react'

const Loading = () => {

    return (
        <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 2, background: 'rgba(0, 0, 0, .2),'}}>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading