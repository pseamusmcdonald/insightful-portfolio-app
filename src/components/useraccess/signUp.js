import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const { signUp } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfRef.current.value) {
            return setError('Passwords do not match!')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
        }
        catch {
            setError('Failed to create account.')
        }
        
        setLoading(false)
    }

    return (
        <div>
            {error && <alert>{error}</alert>}
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input ref={emailRef} type='email' required/>
                <input ref={passwordRef} type='text' required/>
                <input ref={passwordConfRef} type='text' required/>
                <button className='authSubmitButton' type='submit' disabled={loading}>Sign Up</button>
                <p>Already have an account? <Link to='/auth/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default SignUp