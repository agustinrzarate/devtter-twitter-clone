import Avatar from "components/Avatar"
import { DevitStyle, HeaderDevit, Section, Img, ContainerImg } from "./styles"
import useTimeAgo from "hooks/useTimeAgo"
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
  return (
    <DevitStyle>
      <Avatar src={avatar} alt={userName} />
      <Section>
        <HeaderDevit>
          <strong>{userName}</strong>
          <span> · </span>
          <div>{timeago}</div>
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
