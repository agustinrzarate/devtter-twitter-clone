import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore"

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
const db = getFirestore()

const mapUserFromFirebaseAuth = (user) => {
  if (!user) return null

  const { displayName, photoURL, email, uid } = user
  return {
    uid,
    email,
    userName: displayName,
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

export const addDevit = async ({ avatar, content, userId, userName }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "devits"))
    const docs = []
    querySnapshot.forEach((doc) => {
      const date = new Date(doc.data().createdAt.seconds * 1000)
      const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)
      docs.push({ ...doc.data(), id: doc.id, createdAt: normalizedCreatedAt })
    })
    return docs
  } catch (error) {}
}
