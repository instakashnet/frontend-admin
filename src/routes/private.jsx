import { Redirect, Route } from "react-router-dom";
import CustomErrorBoundary from "../hoc/error-boundary.component";

export const PrivateRoute = ({ component: Component, isSignedIn, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isSignedIn) {
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
        }

        return (
          <CustomErrorBoundary>
            <Layout>
              <Component {...props} />
            </Layout>
          </CustomErrorBoundary>
        );
      }}
    />
  );
};
