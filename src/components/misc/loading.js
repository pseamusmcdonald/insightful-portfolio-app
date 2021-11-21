import React from 'react'

const Loading = () => {

    return (
        <div style={{position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, background: 'rgba(0, 0, 0, .2),'}}>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading