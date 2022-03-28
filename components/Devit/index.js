import Avatar from "components/Avatar"
import { DevitStyle, HeaderDevit, Section, Img, ContainerImg } from "./styles"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
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
          <time title={createdAtFormater}>{timeago}</time>
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
