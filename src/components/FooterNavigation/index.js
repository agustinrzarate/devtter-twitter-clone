import Link from "next/link";
import { Footer } from "src/styles/FooterNavigation";
import Create from "../Icons/Create";
import HomeIcon from "../Icons/HomeIcon";
import Search from "../Icons/Search";

export default function FooterNavigation () {
    return(
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
    );
}