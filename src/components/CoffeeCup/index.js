import { Coffee, ContainerCup, Cup, SemiCircle } from "./styles"
import { useState } from "react"

export default function CoffeeCup() {
  const [height, setheight] = useState("23px")
  setTimeout(() => {
    setheight("90px")
  }, 0)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <ContainerCup>
        <SemiCircle></SemiCircle>
        <Cup>
          <Coffee height={height}></Coffee>
        </Cup>
      </ContainerCup>
    </div>
  )
}
