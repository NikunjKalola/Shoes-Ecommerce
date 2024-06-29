import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectItems } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { selectUserInfo, setSelectedAdd, updateUserAsync } from "../features/user/userSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { discountedPrice } from "../app/constant";
function Checkout() {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  let [price, setPrice] = useState(0);
  const navigate = useNavigate();
  let index = -1;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // dispatch(
    //   updateUserAsync({ ...userInfo, addresses: [...userInfo.addresses, data] })
    // );
    dispatch(setSelectedAdd(data))
    reset();
    navigate("/order");
  };

  const handleAddress = (e) => {
    index = e.target.value;
    setValue("firstName", userInfo.addresses[index].firstName);
    setValue("lastName", userInfo.addresses[index].lastName);
    setValue("address", userInfo.addresses[index].address);
    setValue("streetAddress", userInfo.addresses[index].streetAddress);
    setValue("country", userInfo.addresses[index].country);
    setValue("city", userInfo.addresses[index].city);
    setValue("state", userInfo.addresses[index].state);
    setValue("postalCode", userInfo.addresses[index].postalCode);
    setValue("phone", userInfo.addresses[index].phone);
  };
  //TODO : redirect to order sucess pages
  //clear cart after every order
  //change stocks number of items after order
  return (
    <>
      {items.length > 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 p-12 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3 ">
              <form className="" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Shipping Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                      Saved Address
                    </label>
                    <select
                      onChange={(e) => handleAddress(e)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option>Use a new address</option>
                      {userInfo.addresses.map((add, index) => {
                        return (
                          <option value={index} className="">
                            {add.firstName}
                          </option>
                        );
                      })}
                    </select>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            {...register("firstName", {
                              required: "First name is required",
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.firstName && (
                            <span className="text-red-500">
                              {errors.firstName.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("lastName", {
                              required: "Last name is required",
                            })}
                            id="lastName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.lastName && (
                            <span className="text-red-500">
                              {errors.lastName.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            id="address"
                            {...register("address", {
                              required: "Address is required",
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.address && (
                            <span className="text-red-500">
                              {errors.address.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="streetAddress"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Apartment, suite, etc. (optional)
                        </label>
                        <div className="mt-2">
                          <input
                            id="streetAddress"
                            {...register("streetAddress")}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", {})}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option id="country">India</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "City is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <span className="text-red-500">
                              {errors.city.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "State is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && (
                            <span className="text-red-500">
                              {errors.state.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("postalCode", {
                              required: "PostalCode is required",
                            })}
                            id="postalCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.postalCode && (
                            <span className="text-red-500">
                              {errors.postalCode.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            id="phone"
                            {...register("phone", {
                              required: "Phone is required",
                              
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.phone && (
                            <span className="text-red-500">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6  flex items-center justify-between gap-x-6">
                  <Link
                    to="/cart"
                    className="text-sm font-semibold  leading-6 text-gray-900"
                  >
                    Return to cart
                  </Link>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600   px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </form>
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
                                <p className="ml-4">Rs.{discountedPrice(item.product)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.color} / {item.size}
                              </p>
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

export default Checkout;
