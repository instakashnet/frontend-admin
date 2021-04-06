import React from "react";
import { Route, Redirect } from "react-router-dom";

import LoadingPage from "../pages/LoadingPage";

const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, isLoading, ...rest }) => (
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

export default AppRoute;
