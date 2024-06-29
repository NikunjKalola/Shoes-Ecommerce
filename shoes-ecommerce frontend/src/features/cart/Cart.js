import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreamentQuantity,
  deleteItemFromCartAsync,
  incrementAsync,
  incrementQuantity,
  selectCartQuantity,
  selectCount,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";
import { discountedPrice } from "../../app/constant";

function Cart() {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  let [price, setPrice] = useState(0);
  const handleQuantity = (e, product) => {
    let qty = product.quantity;
    if (e.target.value == "-" && qty > 1) {
      qty--;
    } else if (e.target.value == "+" && qty < product.product.stock) {
      qty++;
    }
    dispatch(updateCartAsync({ id: product.id, quantity: qty }));
  };
  const handleDelete = (e,product) => {
    console.log("dewldwlm" + product.id)
    dispatch(deleteItemFromCartAsync(product.id));
  };
  return (
    <>
      {items.length ? (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.imageSrc}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <div>{item.product.name}</div>
                          </h3>
                          <p className="ml-4">
                            Rs. {discountedPrice(item.product) * item.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {/* <div className="text-gray-500">
                          <label>
                            Qty
                            <select
                              className="ml-5"
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </label>
                        </div> */}
                        <div className="flex items-center justify-center">
                          <button
                            className="p-2 border border-gray-300 rounded-l"
                            onClick={(e) => handleQuantity(e, item)}
                            value="-"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="w-16 text-center border-t border-b border-gray-300"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="p-2 border border-gray-300 rounded-r"
                            onClick={(e) => handleQuantity(e, item)}
                            value="+"
                          >
                            +
                          </button>
                        </div>
                        {/* {product.quantity} */}
                        <div className="flex">
                          <button
                            onClick={(e) => handleDelete(e,item)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t sm:float-right border-gray-200 mt-12 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                Rs.
                {items.map((item) => {
                  price += item.quantity * discountedPrice(item.product);
                })}
                {price}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calc ulated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or &nbsp;&nbsp;
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </main>
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  );
}

export default Cart;
