import React, { useRef, useState, Suspense } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import Loading from '../misc/loading'

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/app/dashboard")
        }
        catch {
            setError('Failed to login. Check email and password.')
        }
        setLoading(false)
    }

    return (
        <div className='authFormWrapper'>
            {error && <alert>{error}</alert>}
            <form className='authForm' onSubmit={handleSubmit}>
                <h2 style={{marginBottom: '1rem'}}>Login</h2>
                <input ref={emailRef} placeholder='e-mail address' type='email' required/>
                <input ref={passwordRef} placeholder='password' type='password' required/>
                <button className='authSubmitButton' type='submit' disabled={loading}>Login</button>
                <p>Need an account? <Link to='/auth/sign-up'>Sign Up</Link></p>
            </form>
            {loading &&
                <Loading />
            }
        </div>
    )
}

export default Login