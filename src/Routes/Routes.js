import AddProduct from "../Dashboard/AddProduct/AddProduct";
import AllBuyers from "../Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Dashboard/AllSellers/AllSellers";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DisplayError from "../Shared/DisplayError/DisplayError";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "*",
        element: <PageNotFound></PageNotFound>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard/myorders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/allusers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/addproducts",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/allsellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/allbuyers",
        element: <AllBuyers></AllBuyers>,
      },
    ],
  },
]);

export default router;
