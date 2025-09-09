/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
    createUserWithEmailAndPassword, GoogleAuthProvider,
    onAuthStateChanged, signInWithEmailAndPassword,
    signInWithPopup, signOut,
    updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) // hooks for getting logged in user info, or not
    const [loading, setLoading] = useState(true)

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = updateData => {
        return updateProfile(auth.currentUser, updateData)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        setUser,
        loading,
        createNewUser,
        loginWithGoogle,
        login,
        updateUserProfile,
        logOut,
    }
    // set an observer for logged in user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => unSubscribe()
    })

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;