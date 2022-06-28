import { useEffect, useState } from "react"
import { addUser, existUser, onAuthState } from "../firebase/client"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "src/redux/selectors/user"
import { setUserAccount } from "src/redux/features/userAccount/userAccountSlice"


export default function useUser() {
  const user = useSelector(state => getUser(state))
  const [userProfileExist, setUserProfilExist] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter()
  
  useEffect(() => {
    onAuthState(dispatch)
  }, [])

   useEffect(() => {
     if(userProfileExist?.length === 0 && user) {
      const add = async() => {
        try {
          await addUser({
            userId: user.uid,
            userName: user.userName,
            follows: [],
            following: [],
            avatar: user.avatar,
          })
        } catch (error) {
        }
      }
      add()
    }else if (userProfileExist?.length > 0) {
      dispatch(setUserAccount({data: userProfileExist[0], error: null}))
    }
  }, [userProfileExist])
  
  useEffect(() => {
    let unsub
    !user && router.replace("/")

    if(user){
      unsub = existUser(setUserProfilExist, user.uid)
    }
    return () => unsub && unsub()
  }, [user])
}
