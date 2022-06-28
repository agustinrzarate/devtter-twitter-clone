import { useState } from "react"
import { likeDevit, removeLike } from "src/firebase/client"
import { Container } from "../RedevitButton/styles"
import { Heart, Input, Number } from "./styles"

export const LikeButton = ({
  id,
  likesCount,
  userLoggedId,
  isLike,
  setIsLike,
}) => {
  const [change, setChange] = useState(false)

  const likeAction = async () => {
    setChange(true)
    try {
      if (isLike) {
        setIsLike(false)
        await removeLike(id, likesCount, userLoggedId)
      } else {
        setIsLike(true)
        await likeDevit(id, likesCount, userLoggedId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <label>
        <Input
          type="checkbox"
          onChange={likeAction}
          checked={isLike}
          change={change}
        />
        <Heart />
      </label>
      <Number>
        {likesCount.length > 0 && <span>{likesCount.length}</span>}
      </Number>
    </Container>
  )
}
