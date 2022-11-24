import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";

const DisplayError = () => {
  const error = useRouteError();
  const naviagte = useNavigate();
  const { logout } = useContext(AuthUserContext);
  const handleSignout = () => {
    logout().then(() => {
      naviagte("/login");
    });
  };
  return (
    <div>
      <p>Someting went wrong!!!</p>
      <p className="text-red-400">{error.statusTest || error.message}</p>
      <h4 className="text-3xl">
        Please{" "}
        <button className="btn btn-primary" onClick={handleSignout}>
          Logout
        </button>
        and log back in
      </h4>
    </div>
  );
};

export default DisplayError;
