import React, { useEffect } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { refreshToken } from "../store/actions";

export const RefreshSession = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return <>{children}</>;
};
