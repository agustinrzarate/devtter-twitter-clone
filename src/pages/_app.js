import "../styles/normalize.css"
import AppLayout from "src/components/AppLayout"
import { Provider } from 'react-redux'
import {store} from "src/redux/store";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  )
}

export default MyApp;
