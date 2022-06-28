import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { existUser, listenLatestDevits } from "src/firebase/client"
import { getUserAccount } from "src/redux/selectors/userAccount"

export const useGetUser = (userId) => {
  const [user, setuser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub, unsub2
    if (userId) {
      unsub2 = existUser(setuser, userId)
      unsub = listenLatestDevits(setPosts, setLoading, [userId], userId)
      
    }
    return () => unsub && unsub() && unsub2 && unsub2()
  }, [userId, user?.follows])
  return { user, loading, posts }
}
