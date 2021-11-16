import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRole } from "./hooks/useRole";
import { getCountriesInit, getBanks, getCurrenciesInit, loadUser } from "./store/actions";

// Import Routes
import * as routes from "./routes/";
import { PublicRoute } from "./routes/public";
import { PrivateRoute } from "./routes/private";

// layouts & components
import LazyComponent from "./helpers/lazyComponent";
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import { CustomAlert } from "./components/UI/Alert";

// Import scss
import "./assets/css/app.css";
import "./assets/scss/theme.scss";
import "./assets/scss/custom.scss";

const App = () => {
  const { token, user } = useSelector((state) => state.Login);
  const [role] = useRole(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getCountriesInit());
      dispatch(getCurrenciesInit());
      dispatch(getBanks());
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Switch>
        {routes.public.map((route) => (
          <PublicRoute path={route.path} layout={NonAuthLayout} component={route.component} token={token} key={route.path} />
        ))}
        {role &&
          routes[role].map((route) => <PrivateRoute exact path={route.path} layout={VerticalLayout} component={LazyComponent(route.component)} key={route.path} token={token} />)}
      </Switch>
      <CustomAlert className="fixed-alert" />
    </>
  );
};

export default App;
