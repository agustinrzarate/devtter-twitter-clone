import Avatar from "components/Avatar"
import { DevitStyle, HeaderDevit, Section } from "./styles"

export default function Devit({
  name,
  avatar,
  id,
  content,
  userName,
  userId,
  createdAt,
}) {
  return (
    <DevitStyle>
      <Avatar src={avatar} alt={userName} />
      <Section>
        <HeaderDevit>
          <strong>{userName}</strong>
          <span> · </span>
          <div>{createdAt}</div>
        </HeaderDevit>
        <p>{content} </p>
      </Section>
    </DevitStyle>
  )
}
