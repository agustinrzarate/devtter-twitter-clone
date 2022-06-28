import Avatar from "src/components/Avatar"
import {
  DevitStyle,
  HeaderDevit,
  Section,
  Img,
  ContainerImg,
  Container,
  FooterDevit,
} from "./styles"
import useTimeAgo from "src/hooks/useTimeAgo"
import useDateTimeFormat from "src/hooks/useDateTimeFormat"
import Link from "next/link"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { LikeButton } from "../LikeButton"
import { useSelector } from "react-redux"
import { getUserAccount } from "src/redux/selectors/userAccount"
import { useState } from "react"
import { RedeviButton } from "../RedevitButton"

export default function Devit({
  name,
  avatar,
  id,
  content,
  userName,
  userId,
  createdAt,
  img,
  sharedCount,
  likesCount,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormater = useDateTimeFormat(createdAt)
  const userLogged = useSelector((state) => getUserAccount(state))

  const [isRedevit, setIsRedevit] = useState(
    sharedCount?.includes(userLogged?.userId)
  )
  const [isLike, setIsLike] = useState(
    likesCount?.includes(userLogged?.userId)
  )

  return (
    <Container>
      <DevitStyle>
        <Avatar src={avatar} alt={userName} />
        <Section>
          <HeaderDevit>
            <Link href={`/profile/${userId}`}>
              <a>
                <strong>{userName}</strong>
              </a>
            </Link>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormater}>{timeago}</time>
              </a>
            </Link>
          </HeaderDevit>
          <p>{content} </p>
          {img && (
            <ContainerImg>
              <PhotoProvider>
                <div className="foo">
                  <PhotoView src={img}>
                    <Img
                      src={img}
                      alt=""
                      title=""
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </PhotoView>
                </div>
              </PhotoProvider>
            </ContainerImg>
          )}
        </Section>
      </DevitStyle>
      <FooterDevit>
        <RedeviButton
          id={id}
          sharedCount={sharedCount}
          userLoggedId={userLogged?.userId}
          isRedevit={isRedevit}
          setIsRedevit={setIsRedevit}
        />
        <LikeButton
          id={id}
          likesCount={likesCount}
          userLoggedId={userLogged?.userId}
          isLike={isLike}
          setIsLike={setIsLike}
        />
      </FooterDevit>
    </Container>
  )
}
