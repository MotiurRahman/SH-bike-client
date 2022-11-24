import userEvent from "@testing-library/user-event";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import Loading from "../../Component/Loading/Loading";
import useRole from "../../hooks/useRole";

const BuyerRoutes = ({ children }) => {
  const { user, loader } = useContext(AuthUserContext);
  const [role, isRoleLoading] = useRole(user?.email);
  const location = useLocation();

  if (loader || isRoleLoading) {
    return <Loading></Loading>;
  }

  if (user && role == "buyer") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoutes;
