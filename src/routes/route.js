import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AppRoute = ({ component: Component, token, layout: Layout, isAuthProtected, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
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
