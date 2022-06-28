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
  where,
  setDoc,
  doc,
  updateDoc,
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

const queryUsers = query(usersRef)

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
      callback(loginUser({ data: null, error: err }))
    })
}

export const onAuthState = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = mapUserFromFirebaseAuth(user)
    onChange(loginUser({ data: normalizedUser, error: false }))
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
    likesCount: [],
    sharedCount: [],
  })
}

export const uploadImage = async(file) => {
  const storageRef = ref(storage, `/images/${file.name}`).then(() => {
    const uploadTask = uploadBytesResumable(storageRef, file)
    return uploadTask
  })
}

export const listenLatestDevits = (callback, setLoading, value, userLoggedId) => {
  let queryDevits
  if (value) {
    queryDevits = query(
      devitsRef,
      where("userId", "in", value)
    )
  } else {
    queryDevits = query(devitsRef, orderBy("createdAt", "desc"))
  }
  const qRedevit = query(devitsRef, where("sharedCount", "array-contains", userLoggedId))
  
  let result;
  onSnapshot(qRedevit, (snapshot) => {
    const newDevits = snapshot.docs
      .map((doc) => {
        const { createdAt } = doc.data()
        return { ...doc.data(), id: doc.id, createdAt: +createdAt.toDate() }
      })
      .sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    result = newDevits
  })

  onSnapshot(queryDevits, (snapshot) => {
    const newDevits = snapshot.docs
      .map((doc) => {
        const { createdAt } = doc.data()
        return { ...doc.data(), id: doc.id, createdAt: +createdAt.toDate() }
      })
    
    let arr = []
    if (result) {
      const res = [...result, ...newDevits]
      arr = res
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        )
        .sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
    }
    callback(arr)
    setLoading(false)
  })
}

export const listenUsers = (callback) => {
  return onSnapshot(queryUsers, (snapshot) => {
    const users = snapshot.docs.map((doc) => {
      return doc.data()
    })
    callback(users)
  })
}

export const existUser = (callback, value) => {
  const queryUser = query(usersRef, where("userId", "==", value))
  return onSnapshot(queryUser, (snapshot) => {
    const user = snapshot.docs.map((doc) => {
      return doc.data()
    })
    callback(user)
  })
}

export const addUser = async ({
  userId,
  userName,
  follows,
  following,
  avatar,
}) => {
  return setDoc(doc(db, "users", userId), {
    userId,
    userName,
    follows,
    following,
    avatar,
  })
}

export const addFollow = async (user, userLogged) => {
  const ref = doc(db, "users", user.userId)
  const ref2 = doc(db, "users", userLogged.userId)

  await setDoc(ref, {
    userId: user.userId,
    userName: user.userName,
    avatar: user.avatar,
    following: user.following,
    follows: [...user.follows, userLogged.userId],
  })
  await setDoc(ref2, {
    userId: userLogged.userId,
    userName: userLogged.userName,
    avatar: userLogged.avatar,
    follows: userLogged.follows,
    following: [...userLogged.following, user.userId],
  })
}

export const unFollow = async (user, userLogged) => {
  const ref = doc(db, "users", user.userId)

  const ref2 = doc(db, "users", userLogged.userId)
  const newFollows = user.follows.filter(userFollow => userFollow !== userLogged.userId);
  const newFollowing = userLogged.following.filter(userFollowing => userFollowing !== user.userId);
  
  await setDoc(ref, {
    userId: user.userId,
    userName: user.userName,
    avatar: user.avatar,
    following: user.following,
    follows: newFollows,
  })

  await setDoc(ref2, {
    userId: userLogged.userId,
    userName: userLogged.userName,
    avatar: userLogged.avatar,
    follows: userLogged.follows,
    following: newFollowing,
  })
}

export const findUser = (callback, value) => {
  const queryUser = query(
    usersRef,
    where("userName", ">=", value),
    where("userName", "<=", value + "~")
  )
  return onSnapshot(queryUser, (snapshot) => {
    const user = snapshot.docs.map((doc) => {
      return doc.data()
    })
    callback(user)
  })
}

export const redevit = async (devitId, devitShareds, userLoggedId) => {
  const ref = doc(db, "devits", devitId)
  await updateDoc(ref, {
    sharedCount: [...devitShareds, userLoggedId],
  })
}

export const likeDevit = async (devitId, devitLikes, userLoggedId) => {
  const ref = doc(db, "devits", devitId)
  await updateDoc(ref, {
    likesCount: [...devitLikes, userLoggedId],
  })
}

export const removeLike = async (devitId, devitLikes, userLoggedId) => {
  const ref = doc(db, "devits", devitId)
  const newLikesdevit = devitLikes.filter((userId) => userId !== userLoggedId)
  await updateDoc(ref, {
    likesCount: newLikesdevit,
  })
}

export const removeRedevit = async(devitId, devitShareds, userLoggedId)=> {
  const ref = doc(db, "devits", devitId)
  const newRedevits = devitShareds.filter((userId) => userId !== userLoggedId)
  await updateDoc(ref, {
    sharedCount: newRedevits,
  })
}
