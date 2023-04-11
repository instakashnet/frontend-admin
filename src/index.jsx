import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { injectStore } from './api/interceptors'
import App from './App'
import history from './helpers/history'
import * as serviceWorker from './serviceWorker'
import { HistoryListener } from './hoc/HistoryListener'
import store from './store'

injectStore(store)

const app = (
  <Provider store={store}>
    <Router history={history}>
      <HistoryListener history={history}>
        <App />
      </HistoryListener>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
