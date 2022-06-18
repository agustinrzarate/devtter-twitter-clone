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
  orderBy,
  query,
  onSnapshot,
  doc,
  where,
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { loginUser } from "src/redux/features/user/userSlice"

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
const storage = getStorage()
const db = getFirestore()

const devitsRef = collection(db, "devits")
const usersRef = collection(db, "users")

const q = query(devitsRef, orderBy("createdAt", "desc"))
const queryUsers = query(usersRef);


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

export const loginWithGitHub = (callback) => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
    .then((user) => (user ? mapUserFromFirebaseAuth(user) : null))
    .catch((err) => {
      callback(loginUser({data: null, error: err}))
    })
}

export const onAuthState = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = mapUserFromFirebaseAuth(user)
    onChange(loginUser({ data: normalizedUser, error: false}))
  })
}

export const addDevit = async ({ avatar, content, userId, userName, img }) => {
  return addDoc(devitsRef, {
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const uploadImage = (file) => {
  const storageRef = ref(storage, `/images/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file)
  return uploadTask
}


export const listenLatestDevits = (callback, setLoading) => {
  return onSnapshot(q, (snapshot) => {
    const newDevits = snapshot.docs.map((doc) => {
      const { createdAt } = doc.data()
      return { ...doc.data(), id: doc.id, createdAt: +createdAt.toDate() }
    })
    callback(newDevits);
    setLoading(false);
  })
}

export const listenUsers = (callback) => {
  return onSnapshot(queryUsers, (snapshot) => {
    const users = snapshot.docs.map((doc) => {
      return doc.data()
    });
    callback(users);
  })
}

export const existUser = (callback, value) => {
  const queryUser = query(usersRef, where("userId", "==", value));
  return onSnapshot(queryUser, (snapshot) => {
    const user = snapshot.docs.map((doc) => {
      return doc.data()
    });
    callback(user)
  })
}

export const addUser = async ({ userId, userName, follows ,following }) => {
  return addDoc(usersRef, {
    userId,
    userName,
    follows,
    following
  })
}
