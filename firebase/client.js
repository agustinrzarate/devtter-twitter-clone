import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC3bXJFjGgqBPhqJoE_H_eaSwKNPzPdM1I",
  authDomain: "devtter-50d59.firebaseapp.com",
  projectId: "devtter-50d59",
  storageBucket: "devtter-50d59.appspot.com",
  messagingSenderId: "354472592151",
  appId: "1:354472592151:web:2e253c6c1e88d2f72b2d52",
  measurementId: "G-78PGE67WPX",
}

!getApps.length && initializeApp(firebaseConfig)

const auth = getAuth()

const mapUserFromFirebaseAuth = (user) => {
  if (!user) return null
  console.log(user)
  const { displayName, photoURL, email } = user
  return {
    email,
    name: displayName,
    avatar: photoURL,
  }
}

export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
    .then((user) => (user ? mapUserFromFirebaseAuth(user) : null))
    .catch((err) => {
      console.log(err)
    })
}

export const onAuthState = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = mapUserFromFirebaseAuth(user)
    onChange(normalizedUser)
  })
}
