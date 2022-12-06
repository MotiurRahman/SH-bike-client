import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const NaveBar = () => {
  const { user, loader, logout } = useContext(AuthUserContext);
  const [role, isRoleLoading] = useRole(user?.email);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
      window.location.reload(true);
    });
  };

  const menuBar = (
    <>
      <li>
        <Link to="/">Home</Link>
        {role === "buyer" && <Link to={`/dashboard/myorders`}>Dashboard</Link>}
        {role === "seller" && (
          <Link to={`/dashboard/myproducts`}>Dashboard</Link>
        )}
        {role === "admin" && (
          <Link to={`/dashboard/allsellers`}>Dashboard</Link>
        )}
        <Link to="/blog">Blog</Link>

        {user?.uid ? (
          <>
            <Link>
              {role?.toUpperCase()}: {user?.displayName}
            </Link>
            {user?.photoURL && (
              <Link>
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="" />
                  </div>
                </div>
              </Link>
            )}
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <Link to="login">Login</Link>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar mt-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuBar}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          SH bike buy and sell
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuBar}</ul>
      </div>
      <div className="navbar-end">
        <label
          htmlFor="dashboard-drawer"
          tabIndex={0}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default NaveBar;
