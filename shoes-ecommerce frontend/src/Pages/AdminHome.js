import { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { useDispatch } from "react-redux";
import { fetchCartAsync } from "../features/cart/cartSlice";
import AdminProductList from "../features/admin/components/AdminProductList";

function AdminHome() {
  return (
    <>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </>
  );
}
export default AdminHome;
