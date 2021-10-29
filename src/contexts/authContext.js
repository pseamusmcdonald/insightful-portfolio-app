import React, { useContext, useState, useEffect } from "react"
import { auth, db } from '../components/misc/firebase'
import { doc, setDoc } from "firebase/firestore"; 

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut  } from "@firebase/auth"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    
    const [ currentUser, setCurrentUser ] = useState()

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return setDoc(doc(db, "users", userCredential.user.uid), {userId: userCredential.user.uid})
            })
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