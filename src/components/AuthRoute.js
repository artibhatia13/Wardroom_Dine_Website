import React from "react";
import { Navigate } from "react-router-dom";
import { useUnitContext } from "../context/unitContext";

const AuthRoute = ({ children }) => {
  const { unit } = useUnitContext();

  if (!unit) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default AuthRoute;
