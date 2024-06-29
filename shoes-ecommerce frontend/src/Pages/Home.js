import { useEffect } from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { useDispatch } from "react-redux";
import { fetchCartAsync } from "../features/cart/cartSlice";

function Home() {
  return (
    <>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </>
  );
}
export default Home;
