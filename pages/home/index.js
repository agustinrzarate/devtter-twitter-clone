import AppLayout from "components/AppLayout"
import { Header, Devits } from "./styles"
import { useState, useEffect } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"

export default function Home() {
  const [posts, setPosts] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setPosts)
  }, [user])

  return (
    <AppLayout>
      <Header>
        <h3>Inicio</h3>
      </Header>
      <Devits>
        {posts.map(
          ({ id, avatar, userName, name, content, userId, createdAt }) => (
            <Devit
              key={id}
              avatar={avatar}
              userName={userName}
              name={name}
              id={id}
              content={content}
              userId={userId}
              createdAt={createdAt}
            />
          )
        )}
      </Devits>
      <nav></nav>
    </AppLayout>
  )
}
