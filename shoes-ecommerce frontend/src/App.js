import { Counter } from "./features/counter/Counter";
import "./App.css";
import ProductList from "./features/product/components/ProductList";
import Navbar from "./features/navbar/Navbar";
import Home from "./Pages/Home";
import LogoutPage from "./Pages/LogoutPage";
import LoginPage from "./Pages/LoginPage";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import Cart from "./features/cart/Cart";
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Protected from "./features/auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchCartAsync } from "./features/cart/cartSlice";
import { useEffect } from "react";
import PageNotFound from "./Pages/404";
import Order from "./features/order/Order";
import OrderSuccess from "./Pages/OrderSuccessPage";
import UserOrdersPage from "./Pages/UserOrdersPage";
import { Logout } from "./features/auth/Logout";
import AdminProtected from "./features/auth/AdminProtected";
import AdminHome from "./Pages/AdminHome";
import AdminProductDetailPage from "./Pages/AdminProductDetailPage";
import AdminProductFormPage from "./Pages/AdminProductFormPage";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import UserProfile from "./features/user/UserProfile";
import UserProfilePage from "./Pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/:id",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome></AdminHome>
      </AdminProtected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-edit/:id",
    element: (
      <AdminProtected>
        <AdminProductFormPage></AdminProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-add",
    element: (
      <AdminProtected>
        <AdminProductFormPage></AdminProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/order",
    element: (
      <Protected>
        <Order></Order>
      </Protected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage></AdminOrdersPage>
      </AdminProtected>
    ),
  },
  {
    path: "/order-success",
    element: <OrderSuccess></OrderSuccess>,
  },
  {
    path: "/user/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/user/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <LogoutPage></LogoutPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
