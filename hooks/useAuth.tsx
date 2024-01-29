"use client"

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth } from "../firebase"
import toast from "react-hot-toast"

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    // initialLoading state is used to block the UI when value is true
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    // persisting the user
    useEffect(
        () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user)
                    setLoading(false)
                } else {
                    setUser(null)
                    setLoading(true)
                    router.push('/login')
                }

                setInitialLoading(false)
            }), [auth]
        }
    )

    const signUp = async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user)
                router.push('/')
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        toast.error("Email is already in use.")
                        break
                    case "auth/invalid-email":
                        toast.error("Invalid email.")
                        break
                    case "auth/weak-password":
                        toast.error("Weak password.")
                        break

                    default:
                        toast.error("An error occurred. Please try again!")
                        break
                }
            })
            .finally(() => setLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user)
                router.push('/')
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/invalid-email":
                        toast.error("Invalid email or password.")
                        break
                    case "auth/user-disabled":
                        toast.error("Your account has been disabled.")
                        break
                    case "auth/user-not-found":
                        toast.error("Invalid email or password.")
                        break
                    case "auth/wrong-password":
                        toast.error("Invalid email or password.")
                        break
                    case "auth/invalid-credential":
                        toast.error("Invalid email or password.")
                        break
                    case "auth/too-many-requests":
                        toast.error("Too many sign-in attempts. Please try again later.")
                        break

                    default:
                        toast.error("An error occurred. Please try again!")
                        break
                }
            })
            .finally(() => setLoading(false))
    }

    const logout = async () => {
        setLoading(true)

        signOut(auth)
            .then(() => setUser(null))
            .catch(error => toast.error(error.message))
            .finally(() => setLoading(false))
    }

    const memoizedValue = useMemo(
        () => ({
            user,
            signUp,
            signIn,
            loading,
            logout,
            error
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, loading]
    )

    return <AuthContext.Provider value={memoizedValue}>
        {!initialLoading && children}
    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}