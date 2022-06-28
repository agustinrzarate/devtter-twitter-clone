import { useState } from "react"
import { redevit, removeRedevit } from "src/firebase/client"
import RetweetIcon from "../Icons/RetweetIcon"
import { Container, Input, Label, Number } from "./styles"

export const RedeviButton = ({
  id,
  sharedCount,
  userLoggedId,
  isRedevit,
  setIsRedevit,
}) => {
  const [change, setChange] = useState(false)

  const redevitAction = async () => {
    setChange(true)
    try {
      if (isRedevit) {
        setIsRedevit(false)
        await removeRedevit(id, sharedCount, userLoggedId)
      } else {
        setIsRedevit(true)
        await redevit(id, sharedCount, userLoggedId)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <Label isRedevit={isRedevit}>
        <Input
          type="checkbox"
          onChange={redevitAction}
          checked={isRedevit}
          change={change}
        />
        <RetweetIcon height={15} />
      </Label>

      <Number>
        {sharedCount.length > 0 && <span>{sharedCount.length}</span>}
      </Number>
    </Container>
  )
}
