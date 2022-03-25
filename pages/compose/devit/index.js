import AppLayout from "components/AppLayout"
import { Button } from "components/Button"
import { TextArea } from "./styles"
import useUser from "hooks/useUser"
import { useState } from "react"
import { addDevit } from "../../../firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    sendDevit()
  }

  const sendDevit = async () => {
    try {
      await addDevit({
        avatar: user.avatar,
        content: message,
        userId: user.uid,
        userName: user.userName,
      })
      router.push("/home")
    } catch (error) {}
  }
  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="¿Qué esta pasando?"
          value={message}
          onChange={handleChange}
        ></TextArea>
        <div style={{ padding: 15 }}>
          <Button fontSize="14px" disabled={isButtonDisabled}>
            Devittear
          </Button>
        </div>
      </form>
    </AppLayout>
  )
}
