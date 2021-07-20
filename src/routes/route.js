import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../store/actions";
import { Route, Redirect, useHistory } from "react-router-dom";

import LoadingPage from "../pages/LoadingPage";

const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, isLoading, ...rest }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.Alert.show);

  useEffect(() => {
    history.listen(() => {
      if (showAlert) dispatch(removeAlert());
    });
  }, [history, dispatch, showAlert]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return <LoadingPage />;

        if (isAuthProtected && !localStorage.getItem("authUser")) {
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
