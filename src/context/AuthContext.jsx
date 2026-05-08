import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged,  sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app, db } from '../firebase'; 

const auth = getAuth(app);
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState(null);
    const [signupError, setSignupError] = useState(null);
    const [resetError, setResetError] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe(); 
    }, []);

    // Sign Up
    // async function signUp(firstName, lastName, email, password) {
    async function signUp(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,  email, password);
            const user = userCredential.user;
            try {
                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, {
                    // firstName: firstName,
                    // lastName: lastName,
                    email: email,
                    createdAt: new Date().toISOString()
                });
            } catch (firestoreError) {
                console.error(firestoreError);
            }

            setUser(userCredential.user);

        } catch (error) {
            setSignupError(error.message);
            throw error;
        }
    }

    // Login
    async function login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            if(error.code === 'auth/invalid-credential') {
                setLoginError("Incorrect email or password. Please try again.");
            } else {
                setLoginError("An error occurred during login. Please try again.");
            }
            throw error;
        }
    }

    // Logout
    async function logout() {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setLoginError(error.message);
        }
    }

    // Reset Password 
      async function resetPassword(email) {
        try {
          await sendPasswordResetEmail(auth, email);
          setResetError(null);
        } catch (error) {
          setResetError(error.message);
          throw error;
        }
      }
    

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout, loading, loginError, signupError, resetPassword, resetError }}>
        {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}