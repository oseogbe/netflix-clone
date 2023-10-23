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
    const [error, setError] = useState(null)
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
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user)
                router.push('/')
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    const logout = async () => {
        setLoading(true)

        signOut(auth)
            .then(() => setUser(null))
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    const memoidValue = useMemo(
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

    return <AuthContext.Provider value={memoidValue}>
        {!initialLoading && children}
    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}