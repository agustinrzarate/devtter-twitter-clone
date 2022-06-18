import Link from "next/link"
import { useEffect, useState } from "react"
import Header from "src/components/Header"
import ArrowLeft from "src/components/Icons/ArrowLeft"
import Search from "src/components/Icons/Search"
import { findUser, listenUsers } from "src/firebase/client"
import { Container, InputField } from "src/styles/Search"

export default function SearchUsers() {
  const [users, setUsers] = useState(null)
  const [value, setValue] = useState("")

 useEffect(() => {
    setUsers(null)
    const unsub = findUser(setUsers, value)
    return () => unsub && unsub()
  }, [value])

  const onChangeValue = (event) => {
    setValue(event.target.value)
  }

  return (
    <>
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
      </Container>
    </>
  )
}
