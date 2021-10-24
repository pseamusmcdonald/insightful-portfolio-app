import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import Loading from '../misc/loading'

const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signUp } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfRef.current.value) {
            return setError('Passwords do not match!')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/auth/login")
        }
        catch {
            setError('Failed to create account.')
        }
        
        setLoading(false)
    }

    return (
        <div className='authFormWrapper'>
            {error && <alert>{error}</alert>}
            <form className='authForm' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input ref={emailRef} type='email' placeholder='e-mail address' required/>
                <input ref={passwordRef} type='password' placeholder='password' required/>
                <input ref={passwordConfRef} type='password' placeholder='password confirmation' required/>
                <button className='authSubmitButton' type='submit' disabled={loading}>Sign Up</button>
                <p>Already have an account? <Link to='/auth/login'>Login</Link></p>
            </form>
            {loading &&
                <Loading />
            }
        </div>
    )
}

export default SignUp