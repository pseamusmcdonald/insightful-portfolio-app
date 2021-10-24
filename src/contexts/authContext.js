import React, { useContext, useState, useEffect } from "react"
import { auth } from '../components/misc/firebase'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut  } from "@firebase/auth"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    
    const [ currentUser, setCurrentUser ] = useState()

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signOutUser = () => {
        signOut(auth)
            .catch((error) => {
                console.log(error)
            })
    }

    const value = {
        currentUser,
        signUp,
        login,
        signOutUser,
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    })

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider