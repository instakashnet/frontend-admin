import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesInit, loadUser } from "./store/actions";
import history from "./helpers/history";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import LazyComponent from "./helpers/lazyComponent";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/css/app.css";
import "./assets/scss/theme.scss";
import "./assets/scss/custom.scss";

const App = () => {
  const { isLoading, token } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(getCountriesInit());
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(loadUser(history));
  }, [dispatch]);

  return (
    <Router history={history}>
      <Switch>
        {publicRoutes.map((route, idx) => (
          <AppRoute isLoading={isLoading} path={route.path} layout={NonAuthLayout} component={route.component} key={idx} isAuthProtected={false} />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <AppRoute exact isLoading={isLoading} path={route.path} layout={VerticalLayout} component={LazyComponent(route.component)} key={idx} isAuthProtected={true} />
        ))}
      </Switch>
    </Router>
  );
};

export default App;
