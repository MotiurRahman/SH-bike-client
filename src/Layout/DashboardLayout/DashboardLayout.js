import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import Loading from "../../Component/Loading/Loading";

import useRole from "../../hooks/useRole";
import NaveBar from "../../Shared/NaveBar/NaveBar";

const DashboardLayout = () => {
  const { user } = useContext(AuthUserContext);
  const [role, isRoleLoading] = useRole(user?.email);
  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  console.log(role, isRoleLoading);
  return (
    <div>
      <NaveBar></NaveBar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {role == "buyer" && (
              <li>
                <Link to="/dashboard/myorders">My Orders</Link>
              </li>
            )}

            {role == "seller" && (
              <>
                <li>
                  <Link to="/dashboard/myproducts">My Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/addproducts">Add A Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/mybuyers">My buyers</Link>
                </li>
              </>
            )}

            {role == "admin" && (
              <>
                <li>
                  <Link to="/dashboard/allsellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/allbuyers">All Buyers</Link>
                </li>
                <li>
                  <Link to="/dashboard/reported-items">Reported Items</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
