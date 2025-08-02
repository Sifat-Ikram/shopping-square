"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { deleteOrder, clearOrders } from "@/lib/redux/slices/orderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { FaEye } from "react-icons/fa";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders placed yet.</p>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-6 text-[#DC143C]">
              Your Orders
            </h1>
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => dispatch(clearOrders())}
                className="bg-[#DC143C] hover:bg-[#c11235] cursor-pointer text-white py-2 px-4 rounded-xl transition"
              >
                Clear All Orders
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border rounded-xl overflow-hidden shadow-md">
              <thead className="bg-[#DC143C] text-white">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Total Items</th>
                  <th className="py-3 px-4">Total Amount (BDT)</th>
                  <th className="py-3 px-4">Order Date</th>
                  <th className="py-3 px-4">Actions</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <AnimatePresence>
                  {orders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="p-2 text-center font-medium text-[#DC143C]">
                        {order.id}
                      </td>
                      <td className="p-2 text-center">{order.name}</td>
                      <td className="p-2 text-center">
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {order.total.toFixed(2)}
                      </td>
                      <td className="p-2 text-center">
                        {new Date(order.date).toLocaleString()}
                      </td>
                      <td className="p-2 text-center items-center">
                        <button
                          onClick={() => {
                            const modal = document.getElementById(
                              "my_modal_4"
                            ) as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                          }}
                          className="cursor-pointer p-1 rounded-full border border-[#DC143C] text-[#DC143C] text-xs sm:text-sm hover:bg-[#DC143C] hover:text-white transition-colors duration-200"
                        >
                          <FaEye />
                        </button>
                        <dialog id="my_modal_4" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle bg-[#DC143C] text-white absolute right-[5px] top-[6px]">
                                ✕
                              </button>
                            </form>
                            <div className="flex flex-col mt-5">
                              <h2 className="text-xl text-left font-medium mb-2">
                                Order ID:{" "}
                                <span className="text-[#DC143C]">
                                  {order.id}
                                </span>
                              </h2>
                              <p className="mb-1 text-left">
                                <span className="font-medium">Name:</span>{" "}
                                {order.name}
                              </p>
                              <p className="mb-1 text-left">
                                <span className="font-medium">Address:</span>{" "}
                                {order.address}
                              </p>
                              <p className="mb-1 text-left">
                                <span className="font-medium">Phone:</span>{" "}
                                {order.phone}
                              </p>
                              <p className="mb-3 text-left text-sm text-gray-500">
                                Date: {new Date(order.date).toLocaleString()}
                              </p>

                              <div>
                                <h3 className="font-semibold mb-2 text-left">
                                  Items:
                                </h3>
                                <ul className="space-y-2 flex flex-col overflow-auto">
                                  {order.items.map((item) => (
                                    <li
                                      key={item.id}
                                      className="flex justify-between"
                                    >
                                      <div className="flex flex-row items-center gap-1 sm:gap-2 max-w-[70%]">
                                        <span
                                          className="truncate"
                                          title={item.title}
                                        >
                                          {item.title}
                                        </span>
                                        <span className="text-sm text-gray-500 whitespace-nowrap">
                                          x {item.quantity}
                                        </span>
                                      </div>
                                      <span>
                                        {(item.price * item.quantity).toFixed(
                                          2
                                        )}{" "}
                                        BDT
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mt-4 text-right font-bold text-lg">
                                Total: <span>{order.total.toFixed(2)} BDT</span>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </td>
                      <td className="p-2 text-center items-center">
                        <button
                          onClick={() => dispatch(deleteOrder(order.id))}
                          aria-label="Delete order"
                          className="text-[#DC143C] cursor-pointer transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
