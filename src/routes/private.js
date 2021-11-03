import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, token, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token || !localStorage.getItem("authUser")) {
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
