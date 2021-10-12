import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { login } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        }
        catch {
            setError('Failed to login. Check email and password.')
        }
        
        setLoading(false)
    }

    return (
        <div>
            {error && <alert>{error}</alert>}
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input ref={emailRef} type='email' required/>
                <input ref={passwordRef} type='text' required/>
                <button className='authSubmitButton' type='submit' disabled={loading}>Login</button>
                <p>Need an account?<Link to='/auth/sign-up'>Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login