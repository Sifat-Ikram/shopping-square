"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { deleteOrder, clearOrders } from "@/lib/redux/slices/orderSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.order.orders);
  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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

          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-md p-5 relative"
                >
                  <button
                    aria-label="Delete order"
                    onClick={() => dispatch(deleteOrder(order.id))}
                    className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-800 transition"
                  >
                    <FiTrash2 size={20} />
                  </button>

                  <h2 className="text-xl font-semibold mb-2 text-[#DC143C]">
                    Order ID: {order.id}
                  </h2>
                  <p className="mb-1">
                    <span className="font-medium">Name:</span> {order.name}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Address:</span>{" "}
                    {order.address}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Phone:</span> {order.phone}
                  </p>
                  <p className="mb-3 text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleString()}
                  </p>

                  <div>
                    <h3 className="font-semibold mb-2">Items:</h3>
                    <ul className="space-y-2 max-h-48 overflow-auto">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>
                            {item.title} x {item.quantity}
                          </span>
                          <span>
                            {(item.price * item.quantity).toFixed(2)} BDT
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 text-right font-bold text-lg">
                    Total: <span>{order.total.toFixed(2)} BDT</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
