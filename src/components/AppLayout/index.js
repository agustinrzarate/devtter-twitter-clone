import useUser from "src/hooks/useUser"
import FooterNavigation from "../FooterNavigation";
import { App } from "./styles"
export default function AppLayout({ children }) {
  useUser();
  return (
    <App>
      <main>
        {children}
        <FooterNavigation />
      </main>
    </App>
  )
}
