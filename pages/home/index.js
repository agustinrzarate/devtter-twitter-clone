import { Devits, Footer } from "./styles"
import { useState, useEffect } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"
import Link from "next/link"
import HomeIcon from "components/Icons/HomeIcon"
import Search from "components/Icons/Search"
import Create from "components/Icons/Create"
import Head from "next/head"
import Header from "components/Header"

export default function Home() {
  const [posts, setPosts] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setPosts)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devtter</title>
      </Head>
      <Header>
        <h3>Home</h3>
      </Header>
      <Devits>
        {posts.map(
          ({ id, avatar, userName, name, content, userId, createdAt, img }) => (
            <Devit
              key={id}
              avatar={avatar}
              userName={userName}
              name={name}
              id={id}
              content={content}
              userId={userId}
              createdAt={createdAt}
              img={img}
            />
          )
        )}
      </Devits>
      <Footer>
        <Link href="/home">
          <a>
            <HomeIcon width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/devit">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </Footer>
    </>
  )
}
