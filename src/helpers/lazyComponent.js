import React, { Suspense } from "react";
import BlockUI from "react-block-ui";

export const asyncComponent = (Component) => {
  return (props) => (
    <Suspense
      fallback={
        <BlockUI tag="div" blocking={true}>
          {" "}
        </BlockUI>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};
