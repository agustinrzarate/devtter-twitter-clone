import { useState, useEffect } from "react"
import { onAuthState } from "../firebase/client"
import { useRouter } from "next/router"

export const USER_STATES = {
  NOT_LOGGED: null,
  LOADING: undefined,
  UNDEFINED: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.UNDEFINED)
  const router = useRouter()

  useEffect(() => {
    onAuthState(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.replace("/")
  }, [user])

  return user
}
