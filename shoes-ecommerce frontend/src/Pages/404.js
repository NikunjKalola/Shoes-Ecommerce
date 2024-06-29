// // import { Link } from "react-router-dom";

// // export default function PageNotFound() {
// //   return (
// //     <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
// //       <div className="text-center">
// //         <p className="text-base font-semibold text-indigo-600">404</p>
// //         <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
// //           Page not found
// //         </h1>
// //         <p className="mt-6 text-base leading-7 text-gray-600">
// //           Sorry, we couldn’t find the page you’re looking for.
// //         </p>
// //         <div className="mt-10 flex items-center justify-center gap-x-6">
// //           <Link
// //             to="/"
// //             className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// //           >
// //             Go back home
// //           </Link>
// //           <a href="#" className="text-sm font-semibold text-gray-900">
// //             Contact support <span aria-hidden="true">&rarr;</span>
// //           </a>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }



// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllOrdersAsync,
//   selectOrders,
//   updateOrderAsync,
// } from "../../order/orderSlice";
// import { useEffect, useState } from "react";

// export default function AdminOrders() {
//   const orders = useSelector(selectOrders);
//   const [editableOrder, setEditableOrder] = useState();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchAllOrdersAsync());
//     if (orders) {
//       console.log(orders);
//     }
//   }, [dispatch]);

//   const handleUpdate = (e, id) => {
//     const index = orders.findIndex((order) => order.id === id);
//     dispatch(updateOrderAsync({ ...orders[index], status: e.target.value }));
//     setEditableOrder(null);
//   };

//   const chooseColor = (status) => {
//     console.log(status);
//     if (status == "pending") return "blue";
//     else if (status == "dispatch") return "yellow";
//     else if (status == "delivered") return "green";
//     else if (status == "cancelled") return "red";
//     else return "black";
//   };
//   return (
//     <>
//       {/* component */}
//       {orders.length&&<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
//         <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-4 font-medium text-gray-900">
//                 Order
//               </th>
//               <th scope="col" className="px-6 py-4 font-medium text-gray-900">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-4 font-medium text-gray-900">
//                 Phone no.
//               </th>
//               <th scope="col" className="px-6 py-4 font-medium text-gray-900">
//                 Addresss
//               </th>
//               <th scope="col" className="px-6 py-4 font-medium text-gray-900">
//                 Price
//               </th>
//               <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//             {orders.map((order) => {
//               return (
//                 <tr className="hover:bg-gray-50">
//                   {order.items.map((item) => {
//                     return (
//                       <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
//                         <div className="relative h-10 w-10">
//                           <img
//                             className="h-full w-full rounded-full object-cover object-center"
//                             src={item.imageSrc}
//                             alt=""
//                           />
//                           <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white" />
//                         </div>
//                         <div className="text-sm">
//                           <div className="font-medium text-gray-700">
//                             {item.name}
//                           </div>
//                           <div className="text-gray-400">
//                             {"Qty " + item.quantity}
//                           </div>
//                         </div>
//                       </th>
//                     );
//                   })}

//                   <td className="px-6 py-4">
//                     {order.id === editableOrder ? (
//                       <select onChange={(e) => handleUpdate(e, order.id)}>
//                         <option value="pending">--choose status</option>
//                         <option value="pending">pending</option>
//                         <option value="dispatch">dispatch</option>
//                         <option value="delivered">delivered</option>
//                         <option value="cancelled">cancelled</option>
//                       </select>
//                     ) : (
//                       <span
//                         className={`inline-flex items-center gap-1 rounded-full bg-${chooseColor(
//                           order.status
//                         )}-50 px-2 py-1 text-xs font-semibold text-${chooseColor(
//                           order.status
//                         )}-600`}
//                       >
//                         <span
//                           class={`h-1.5 w-1.5 rounded-full bg-${chooseColor(
//                             order.status
//                           )}-600`}
//                         ></span>
//                         {order.status}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">{order.address.phone}</td>
//                   <td className="px-6 py-4">
//                     <div className="gap-2">
//                       <div className=" items-center gap-1  px-2 py-1 text-xss font-semibold text-black">
//                         <div>{order.address.firstName}</div>
//                         <div>{order.address.address}</div>

//                         <div>{order.address.city}</div>

//                         <div>{order.address.state}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">{"$ " + order.price}</td>

//                   <td className="px-6 py-4">
//                     <div className="flex justify-end gap-4">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="h-6 w-6"
//                         x-tooltip="tooltip"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                         />
//                       </svg>
//                       <svg
//                         onClick={() => setEditableOrder(order.id)}
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="h-6 w-6"
//                         x-tooltip="tooltip"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
//                         />
//                       </svg>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>}
//     </>
//   );
// }
