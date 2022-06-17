import Avatar from "src/components/Avatar"
import { DevitStyle, HeaderDevit, Section, Img, ContainerImg } from "./styles"
import useTimeAgo from "src/hooks/useTimeAgo"
import useDateTimeFormat from "src/hooks/useDateTimeFormat"
import Link from "next/link"

export default function Devit({
  name,
  avatar,
  id,
  content,
  userName,
  userId,
  createdAt,
  img,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormater = useDateTimeFormat(createdAt)

  return (
    <DevitStyle>
      <Avatar src={avatar} alt={userName} />
      <Section>
        <HeaderDevit>
          <strong>{userName}</strong>
          <span> · </span>
          <Link href={{ pathname: "/status/[id]", query: { id: `${id}` } }}>
            <a>
              <time title={createdAtFormater}>{timeago}</time>
            </a>
          </Link>
        </HeaderDevit>
        <p>{content} </p>
        {img && (
          <ContainerImg>
            <Img
              src={img}
              alt=""
              title=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </ContainerImg>
        )}
      </Section>
    </DevitStyle>
  )
}
