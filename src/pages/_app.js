import "../styles/normalize.css"
import AppLayout from "src/components/AppLayout"
import { Provider } from 'react-redux'
import {store} from "src/redux/store";
import "react-photo-view/dist/react-photo-view.css"


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
