import AppLayout from "components/AppLayout"
import { Header, Devits } from "./styles"
import { useState, useEffect } from "react"
import Devit from "components/Devit"

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setPosts)
  }, [])

  return (
    <AppLayout>
      <Header>
        <h3>Inicio</h3>
      </Header>
      <Devits>
        {posts.map(({ id, avatar, username, name, message }) => (
          <Devit
            key={id}
            avatar={avatar}
            username={username}
            name={name}
            id={id}
            message={message}
          />
        ))}
      </Devits>
      <nav></nav>
    </AppLayout>
  )
}
