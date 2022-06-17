import { Devits, Footer, DevitHoverStyle } from "src/styles/Home"
import { useState, useEffect } from "react"
import Devit from "src/components/Devit"
import { listenLatestDevits } from "../../firebase/client"
import Link from "next/link"
import HomeIcon from "src/components/Icons/HomeIcon"
import Search from "src/components/Icons/Search"
import Create from "src/components/Icons/Create"
import Head from "next/head"
import Header from "src/components/Header"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { getUser } from "src/redux/selectors/user"
import Coffee from "src/components/Coffee"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => getUser(state))

  useEffect(() => {
    let unsub
    if (user) {
      setLoading(true)
      unsub = listenLatestDevits(setPosts, setLoading)
    }
    return () => unsub && unsub()
  }, [user])

  const router = useRouter()

  const handleArticleClick = (e, id) => {
    e.preventDefault()
    router.push(`status/${id}`)
  }

  return (
    <>
      <Head>
        <title>Inicio / Devtter</title>
      </Head>
      <Header>
        <h3>Home</h3>
      </Header>
      {loading && <Coffee/>}
      <Devits>
        {!loading && posts.map(
          ({ id, avatar, userName, name, content, userId, createdAt, img }) => (
            <DevitHoverStyle
              key={id}
              onClick={(e) => handleArticleClick(e, id)}
            >
              <Devit
                avatar={avatar}
                userName={userName}
                name={name}
                id={id}
                content={content}
                userId={userId}
                createdAt={createdAt}
                img={img}
              />
            </DevitHoverStyle>
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
