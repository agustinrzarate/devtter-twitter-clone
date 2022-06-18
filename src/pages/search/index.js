import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "src/components/Header";
import ArrowLeft from "src/components/Icons/ArrowLeft";
import Search from "src/components/Icons/Search";
import { listenUsers } from "src/firebase/client";
import { Container, InputField } from "src/styles/Search";

export default function SearchUsers () {
    const [users, setUsers] = useState(null);

   useEffect(() => {
     const unsub = listenUsers(setUsers)
     return () => unsub && unsub()
   }, [])
   

    return (
        <>
            <Container>
                <Header>
                    <Link href="/home">
                        <a>
                            <ArrowLeft width={27} height={32} stroke="#09f" />
                        </a>
                    </Link>
                    <InputField type="text"/>
                    <Search width={32} height={32} stroke="#09f" />
                </Header>
            </Container>
        </>
    )
}