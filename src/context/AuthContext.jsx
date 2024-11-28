import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // State to store errors

    // Register a new user
    const registerUser = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);  // Store error message
        }
    }

    // Log in the user
    const loginUser = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);  // Store error message
        }
    }

    // Sign up with Google
    const signInWithGoogle = async () => {
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError(err.message);  // Store error message
        }
    }

    // Log out the user
    const logout = () => {
        return signOut(auth);
    }

    // Manage user state with onAuthStateChanged
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            
            // If user is authenticated, you can store more user data if needed
            if (user) {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL,
                };
                // You can update the state with the user data if needed
            }
        });

        return () => unsubscribe();  // Clean up listener on component unmount
    }, []);

    // Provide context to the rest of the app
    const value = {
        currentUser,
        loading,
        error,  // Provide error to the components
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
