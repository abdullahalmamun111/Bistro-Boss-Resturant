import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/Home';
import Menu from '../Pages/Menu';
import Order from '../Pages/Order';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Secret from './Secret';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Pages/Dashboard';
import Cart from './Cart';
import AllUsers from '../Dashboard Components/AllUsers';
import AddItems from '../Dashboard Components/AddItems';
import AdminRoute from './AdminRoute';
import MangeItems from '../Dashboard Components/MangeItems';
import UpdateItem from '../Dashboard Components/UpdateItem';
import Payment from '../Dashboard Components/Payment';
import PaymentHistory from '../Dashboard Components/PaymentHistory';
import UserHome from '../Dashboard Components/UserHome';
import AdminHome from '../Dashboard Components/AdminHome';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu></Menu>
        },
        {
          path: 'shop/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element:  <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[

        // user routes only
        {
          path:'cart',
          element: <Cart></Cart>
        },
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path:'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        // admin routes only
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:'addItems',
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`https://bistro-boss-server-sepia-five.vercel.app/menu/${params.id}`)
        },
        {
          path:'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'manageitems',
          element:<AdminRoute><MangeItems></MangeItems></AdminRoute>
        }
      ]
    }
  ]);

export default router;