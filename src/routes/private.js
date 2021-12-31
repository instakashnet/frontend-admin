import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, isSignedIn, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isSignedIn) {
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
