import React, { useEffect } from "react";
import { Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRole } from "./hooks/useRole";
import { getCountriesInit, getBanks, getCurrenciesInit, loadUser } from "./store/actions";

// Import Routes
import * as routes from "./routes/";
import { CustomAlert } from "./components/UI/Alert";
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
  const { token, user } = useSelector((state) => state.Login);
  const [role] = useRole(user);
  const dispatch = useDispatch();
  const history = useHistory();

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
          <AppRoute path={route.path} layout={NonAuthLayout} component={route.component} key={route.path} isAuthProtected={false} />
        ))}
        {role &&
          routes[role].map((route) => <AppRoute exact path={route.path} layout={VerticalLayout} component={LazyComponent(route.component)} key={route.path} isAuthProtected />)}
      </Switch>
      {history.location.pathname !== "/login" && <CustomAlert className="fixed-alert" />}
    </>
  );
};

export default App;
