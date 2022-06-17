import { useEffect } from "react"
import { onAuthState } from "../firebase/client"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "src/redux/selectors/user"

export default function useUser() {
  const user = useSelector(state => getUser(state))
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    onAuthState(dispatch)
  }, [])

  useEffect(() => {
    !user && router.replace("/")
  }, [user])
}
