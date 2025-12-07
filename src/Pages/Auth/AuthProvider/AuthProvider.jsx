import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { auth } from '../../../../firebase.init';
import { AuthContext } from '../AuthContext/AuthContext';


const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

const signUpUser = (email, password)=>{
    setLoading(true)

    return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = ()=>{
    return signInWithPopup(auth, googleProvider)
}

const forgetPassword = (email)=>{
    return sendPasswordResetEmail(auth, email)
}

const updateUserProfile = (updatedProfile)=>{
    return updateProfile(auth.currentUser,updatedProfile )
}

const signOutUser = ()=>{
    return signOut(auth)
}

useEffect( ()=>{

const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
setUser(currentUser)
setLoading(false)
})

return ()=>{
    unsubscribe();
}


},[])


const authInfo = {
    loading, 
    setLoading,
    user,
     setUser,
signUpUser ,
signInUser,
signInWithGoogle,
forgetPassword ,
updateUserProfile,
signOutUser,

}
    return (
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;