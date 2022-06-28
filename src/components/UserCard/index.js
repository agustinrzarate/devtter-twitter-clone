import { useRouter } from "next/router"
import Avatar from "../Avatar"
import { Container } from "./styles"

export default function UserCard({ avatar, userName, userId }) {
  const router = useRouter();
  const viewProfile = (event) => {
    router.push(`/profile/${userId}`)
  }
  return (
    <Container onClick={viewProfile}>
      {avatar && <Avatar src={avatar} alt={userName} />}
      <strong>{userName}</strong>
    </Container>
  )
}
