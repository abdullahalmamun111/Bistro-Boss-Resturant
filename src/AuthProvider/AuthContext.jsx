import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import usePublic from '../hooks/usePublic';

export  const ContextApi = createContext(null);
const auth = getAuth(app)
const AuthContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = usePublic();

    // create a new user
    const createUser = (email , password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
       
    }

    // login user
    const signIn = (email , password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    // logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    
    // google login
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth,provider)
    }

    // update user Profile
    const updateUserProfile = (name, photo) => {
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo 
          })
    }

    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        });
        return () => {
            return unsubsCribe();
        }
    },[axiosPublic])

  

    const authInfo = {
        user, 
        loading,
        createUser,
        signIn, 
        logOut,
        googleSignIn,
        updateUserProfile
    }
    return (
        <ContextApi.Provider value={authInfo}>
            {children}
        </ContextApi.Provider>
    );
};

export default AuthContext;