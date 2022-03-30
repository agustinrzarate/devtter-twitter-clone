import Devit from "components/Devit"
import Header from "components/Header"
import Link from "next/link"
import ArrowLeft from "components/Icons/ArrowLeft"
import { firestore } from "../../firebase/admin"
import { useRouter } from "next/router"
import CoffeeCup from "components/CoffeeCup"

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "wCyzc0172GeW624gdygk" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

export default function DevitPage(props) {
  const router = useRouter()
  if (router.isFallback) return <CoffeeCup />

  return (
    <div>
      <Header>
        <Link href="/">
          <a>
            <ArrowLeft width={27} height={32} stroke="#09f" />
          </a>
        </Link>
      </Header>
      <Devit {...props} />
    </div>
  )
}
