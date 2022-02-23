import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./helpers/history";
import { injectStore } from "./api/interceptors";

import { HistoryListener } from "./hoc/HistoryListener";
import store from "./store";

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

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
