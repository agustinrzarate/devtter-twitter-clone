import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Header from "src/components/Header"
import ArrowLeft from "src/components/Icons/ArrowLeft"
import Search from "src/components/Icons/Search"
import UserCard from "src/components/UserCard"
import { findUser } from "src/firebase/client"
import { getUser } from "src/redux/selectors/user"
import { Container, InputField } from "src/styles/Search"

export default function SearchUsers() {
  const [users, setUsers] = useState(null)
  const [value, setValue] = useState("")
  const userLogged = useSelector((state) => getUser(state))
  
  useEffect(() => {
    setUsers(null)
    const unsub = findUser(setUsers, value)
    return () => unsub && unsub()
  }, [value])

  const onChangeValue = (event) => {
    setValue(event.target.value)
  }

  const mapUsers = () => {
    return users?.filter((user) => user.userId !== userLogged.uid).map((user, index) => (
      <UserCard key={index} avatar={user.avatar} userName={user.userName} userId={user.userId}/>
    ))
    
  }

  return (
    <>
      <Head>
        <title>Search / Devtter</title>
      </Head>
      <Container>
        <Header>
          <Link href="/home">
            <a>
              <ArrowLeft width={27} height={32} stroke="#09f" />
            </a>
          </Link>
          <InputField type="text" value={value} onChange={onChangeValue} />
          <Search width={32} height={32} stroke="#09f" />
        </Header>
        {mapUsers()}
      </Container>
    </>
  )
}
