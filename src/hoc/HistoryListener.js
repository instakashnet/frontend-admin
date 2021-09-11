import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAlert } from "../store/actions";

import LoadingPage from "../pages/LoadingPage";

export const HistoryListener = ({ history, children }) => {
  const dispatch = useDispatch();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);

    return history.listen(() => {
      dispatch(removeAlert());
    });
  }, [dispatch, history]);

  if (isFirstRender) return <LoadingPage />;

  return children;
};
