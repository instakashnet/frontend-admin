import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { injectStore } from './api/interceptors';
import App from './App';
import history from './helpers/history';
import * as serviceWorker from './serviceWorker';
import { HistoryListener } from './hoc/HistoryListener';
import store from './store';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

process.env.REACT_APP_STAGE === 'prod' &&
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.7,
  });

injectStore(store);

const app = (
  <Provider store={store}>
    <Router history={history}>
      <HistoryListener history={history}>
        <App />
      </HistoryListener>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
