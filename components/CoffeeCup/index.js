import { Coffee, ContainerCup, Cup, SemiCircle } from "./styles"
import { useState } from "react"

export default function CoffeeCup() {
  const [height, setheight] = useState("23px")
  setTimeout(() => {
    setheight("90px")
  }, 0)
  return (
    <ContainerCup>
      <SemiCircle></SemiCircle>
      <Cup>
        <Coffee height={height}></Coffee>
      </Cup>
    </ContainerCup>
  )
}
