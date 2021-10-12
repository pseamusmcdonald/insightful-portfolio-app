import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ currentUser }) => {
    
    return (
        <header>
            <div className='headerLogo'>

            </div>
            <ul className='headerMenu'>
                {currentUser ?
                    <li><Link>My Dashboard</Link></li>
                    :
                    <>
                    <li><Link to=''></Link></li>
                    <li><Link></Link></li>
                    <li><Link to='/auth/login'>Login / Sign Up</Link></li>
                    </>
                }
            </ul>
        </header>
    )
}

export default Header