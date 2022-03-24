import AppLayout from "components/AppLayout"
import CoffeeCup from "components/CoffeeCup"

export default function Coffee() {
  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <CoffeeCup />
      </div>
    </AppLayout>
  )
}
