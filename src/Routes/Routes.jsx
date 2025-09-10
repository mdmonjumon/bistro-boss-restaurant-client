import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order/:category",
                element: <Order></Order>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // user routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: "/dashboard/cart",
                element: <Cart></Cart>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },





            // admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: "addItems",
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            }, {
                path: 'ManageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: "update/:id",
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-restaurant-server-rosy-nine.vercel.app/menu/${params.id}`)
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
])

export default router;