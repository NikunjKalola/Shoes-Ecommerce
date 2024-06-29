import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";
import { createOrderAsync } from "./orderSlice";
import { selectSelectedAddress, selectUserInfo } from "../user/userSlice";
import { discountedPrice } from "../../app/constant";

export default function Order() {
  const dispatch = useDispatch();
  let [price, setPrice] = useState(0);
  const userInfo = useSelector(selectUserInfo);
  const selectedAddress = useSelector(selectSelectedAddress);

  useEffect(() => {
    if (!userInfo.addresses) {
      console.log("lop");
    }
  });
  const items = useSelector(selectItems);
  // let modifiedItems =
  // items.map((item)=>{
  //   modifiedItems.itemId = item.id
  //   modifiedItems.quantity = item.quantity
  // })
  const navigate = useNavigate();
  const handleOrder = () => {
    const order = {
      totalAmount: price,
      totalItems: items.length,
      items: items,
      user: userInfo.id,
      selectedAddress: selectedAddress,
      status: "pending",
    };
    console.log(order);
    dispatch(createOrderAsync(order));
    navigate("/order-success");
  };
  return (
    <>
      {items.length > 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 p-12 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3 ">
              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Applicant Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Personal details and application.
                  </p>
                </div>
                <div className="mt-6 p-6 border  border-gray-300">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Contact
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {userInfo.email}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Ship to
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {/* {user.addresses[0].address},&nbsp; */}
                        {selectedAddress.postalCode}&nbsp;
                        {selectedAddress.city}&nbsp;
                        {selectedAddress.state}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Shipping Method
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Standard. Free
                      </dd>
                    </div>

                    <div className="mt-6  flex items-center justify-between gap-x-6">
                      <Link
                        to="/cart"
                        className="text-sm font-semibold  leading-6 text-indigo-600"
                      >
                        Return to cart
                      </Link>
                      <button
                        onClick={handleOrder}
                        className="rounded-md bg-indigo-600   px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Place Order
                      </button>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Product Info sec */}
            <div className="lg:col-span-2 bg-white">
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
                                  Rs.{discountedPrice(item.product)}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.color} / {item.size}
                                </p>
                                <p className="ml-4 text-sm text-gray-500">Qty {item.quantity}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500"></div>
                              {/* {product.quantity} */}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t  border-gray-200 mt-12 py-6 ">
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
                  <p className="mt-2 text-sm text-gray-500">
                    Shipping and taxes calc ulated at checkout.
                  </p>
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/cart"></Navigate>
      )}
    </>
  );
}
