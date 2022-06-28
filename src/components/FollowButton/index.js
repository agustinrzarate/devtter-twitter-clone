import { useEffect, useState } from "react"
import { addFollow, unFollow } from "src/firebase/client"
import { Container, Input, Label, Span } from "./styles"

const textValues = {
  true: "Following",
  false: "Follow",
}

const followActions = {
  true: (user, userAccount) => unFollow(user, userAccount),
  false: (user, userAccount) => addFollow(user, userAccount),
}

export const FollowButton = ({ userAccount, user }) => {
  const follow = user?.follows.includes(userAccount.userId)
  const [isFollow, setIsFollow] = useState(follow)
  const [text, setText] = useState(textValues[isFollow])


  const followUser = async () => {
    try {
      await followActions[isFollow](user, userAccount)
      setIsFollow(!isFollow)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (follow) {
       setText('Following')
    }
    else {
      setText("Follow")
    }
  }, [follow])
  

  return (
    <Container onClick={followUser} text={text}>
      <Label>
        <Input type="checkbox" text={text} />
        <Span>{text}</Span>
      </Label>
    </Container>
  )
}
