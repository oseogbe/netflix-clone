import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBULD4bvglurL5zd41NnMSUbHGVSSaJkpI",
    authDomain: "netflix-clone-e4f63.firebaseapp.com",
    projectId: "netflix-clone-e4f63",
    storageBucket: "netflix-clone-e4f63.appspot.com",
    messagingSenderId: "840324788355",
    appId: "1:840324788355:web:133f9fc3844a6903e56bb6"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }