import userEvent from "@testing-library/user-event";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthUserContext } from "../AuthContext/AuthContext";
import Loading from "../Component/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthUserContext);
  const location = useLocation();

  if (loader) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
