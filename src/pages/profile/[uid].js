import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import Avatar from "src/components/Avatar"
import Coffee from "src/components/Coffee"
import Devit from "src/components/Devit"
import { FollowButton } from "src/components/FollowButton"
import Header from "src/components/Header"
import ArrowLeft from "src/components/Icons/ArrowLeft"
import { useGetUser } from "src/hooks/useGetUser"
import { getUser } from "src/redux/selectors/user"
import { getUserAccount } from "src/redux/selectors/userAccount"
import { DevitHoverStyle, Devits } from "src/styles/Home"
import {
  AvatarContainer,
  BottomHeader,
  Box,
  DevitsContainer,
} from "src/styles/Profile"

export default function Profile() {
  const router = useRouter()
  const { user, loading, posts } = useGetUser(router.query.uid)
  const userLogged = useSelector((state) => getUser(state))
  const userAccount = useSelector((state) => getUserAccount(state))

  /* const handleArticleClick = (e, id) => {
    router.push(`/status/${id}`)
  } */

  return (
    <>
      <Head>
        <title>Profile / Devter</title>
      </Head>
      <Header>
        <Link href="/home">
          <a>
            <ArrowLeft width={27} height={32} stroke="#09f" />
          </a>
        </Link>
      </Header>
      {user && (
        <>
          <Box>
            <AvatarContainer>
              <Avatar
                src={user[0]?.avatar}
                alt={user[0]?.userName}
                height={100}
                width={100}
              />
            </AvatarContainer>
            <BottomHeader>
              <span>
                Following:<strong> {user[0].following.length}</strong>
              </span>
              <span>
                Follows: <strong>{user[0].follows.length}</strong>
              </span>
              {userLogged.uid !== user[0].userId && (
                <FollowButton userAccount={userAccount} user={user[0]} />
              )}
            </BottomHeader>
          </Box>
          <DevitsContainer>
            <Devits>
              {!loading &&
                posts.map(
                  ({
                    id,
                    avatar,
                    userName,
                    name,
                    content,
                    userId,
                    createdAt,
                    img,
                    sharedCount,
                    likesCount,
                  }) => (
                    <DevitHoverStyle
                      key={id}
                      /* onClick={(e) => handleArticleClick(e, id)} */
                    >
                      <Devit
                        likesCount={likesCount}
                        sharedCount={sharedCount}
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
          </DevitsContainer>
        </>
      )}
      {loading && <Coffee />}
    </>
  )
}
