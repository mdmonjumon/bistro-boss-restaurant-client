import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import AuthContext from "./AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);


const AuthProviders = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // create new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // login with google
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }



    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // logout user
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false);
            }

        })

        return () => unsubscribe();
    }, [axiosPublic])






    const authInfo = {
        user,
        loading,
        createUser,
        userLogin,
        loginWithGoogle,
        updateUserProfile,
        userLogOut
    }
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;