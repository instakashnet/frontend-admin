import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ component: Component, layout: Layout, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
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
