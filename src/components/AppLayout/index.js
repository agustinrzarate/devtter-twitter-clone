import useUser from "src/hooks/useUser"
import { App } from "./styles"
export default function AppLayout({ children }) {
  useUser();
  return (
    <App>
      <main>{children}</main>
    </App>
  )
}
