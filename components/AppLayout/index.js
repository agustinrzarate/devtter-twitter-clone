import { App } from "./styles"
export default function AppLayout({ children }) {
  return (
    <App>
      <main>{children}</main>
    </App>
  )
}
