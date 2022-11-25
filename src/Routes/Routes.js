import AddProduct from "../Dashboard/AddProduct/AddProduct";
import AllBuyers from "../Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Dashboard/AllSellers/AllSellers";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import MyBuyers from "../Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import MyWishList from "../Dashboard/MyWishList/MyWishList";
import ReportedItems from "../Dashboard/ReportedItems/ReportedItems";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Blog from "../Pages/Blog/Blog";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DisplayError from "../Shared/DisplayError/DisplayError";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import BuyerRoutes from "./BuyerRoutes/BuyerRoutes";
import SellerRoutes from "./SellerRoutes/SellerRoutes";

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
        path: "/blog",
        element: <Blog></Blog>,
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
        element: (
          <BuyerRoutes>
            <MyOrders></MyOrders>
          </BuyerRoutes>
        ),
      },
      {
        path: "/dashboard/mywishlist",
        element: (
          <BuyerRoutes>
            <MyWishList></MyWishList>
          </BuyerRoutes>
        ),
      },

      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoutes>
            <AddProduct></AddProduct>
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/myproducts",

        element: (
          <SellerRoutes>
            <MyProducts></MyProducts>
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRoutes>
            <MyBuyers></MyBuyers>
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/reported-items",
        element: (
          <AdminRoutes>
            <ReportedItems></ReportedItems>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoutes>
            <AllSellers></AllSellers>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoutes>
            <AllBuyers></AllBuyers>
          </AdminRoutes>
        ),
      },

      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
