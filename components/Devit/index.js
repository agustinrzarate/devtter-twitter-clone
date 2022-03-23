import Avatar from "components/Avatar"
import { DevitStyle, Section } from "./styles"

export default function Devit({ name, avatar, id, message, username }) {
  return (
    <DevitStyle>
      <Avatar src={avatar} alt={username} />
      <Section>
        <strong>{username}</strong>
        <p>{message} </p>
      </Section>
    </DevitStyle>
  )
}
