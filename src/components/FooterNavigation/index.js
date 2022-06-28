import Link from "next/link"
import { useSelector } from "react-redux"
import { getUser } from "src/redux/selectors/user"
import { Footer } from "src/styles/FooterNavigation"
import Create from "../Icons/Create"
import HomeIcon from "../Icons/HomeIcon"
import ProfileIcon from "../Icons/ProfileIcon"
import Search from "../Icons/Search"

export default function FooterNavigation() {
  const user = useSelector((state) => getUser(state))
  

  return (
    user && (
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
        <Link href={`/profile/${user.uid}`}>
          <a>
            <ProfileIcon width={27} height={27} stroke="#09f" />
          </a>
        </Link>
      </Footer>
    )
  )
}
