"use client";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
} from "@/lib/redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { checkoutItems } from "@/lib/redux/slices/checkoutSlice";
import Link from "next/link";
import Cart from "@/types/Cart";
import Product from "@/types/Product";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const dispatch = useDispatch();
  const items: Cart[] = useSelector(selectCartItems);

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-lg z-50 p-4 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold text-[#DC143C]">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-[#DC143C]"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Items Area */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {items.length === 0 ? (
          <p className="text-center text-gray-400 text-base sm:text-lg mt-8">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md bg-white border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Title and Quantity */}
              <div className="flex-1 flex flex-col">
                {/* Title + Delete */}
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-semibold text-gray-900 truncate max-w-[160px] sm:max-w-[220px]">
                    {item.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-[#DC143C] cursor-pointer transition flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
                {/* Price */}
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {item.price.toFixed(2)} BDT
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="w-5 h-5 flex items-center justify-center rounded-md border border-[#DC143C] hover:border-[#DC143C] text-gray-600 hover:text-[#DC143C] transition"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="text-base font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="w-5 h-5 flex items-center justify-center rounded-md border border-[#DC143C] hover:border-[#DC143C] text-gray-600 hover:text-[#DC143C] transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* total Price */}
                <p className="text-base font-semibold text-[#DC143C] mt-1">
                  Total: {(item.price * item.quantity).toFixed(2)} BDT
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total & Checkout */}
      {items.length > 0 && (
        <div className="mt-4 pt-4 border-t flex flex-col gap-3">
          <p className="text-lg font-bold text-[#DC143C] flex justify-between">
            <span>Total:</span>
            <span>
              BDT{" "}
              {items
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </p>

          <Link href={"/checkout"}>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  checkoutItems(items as (Product & { quantity: number })[])
                )
              }
              className="w-full bg-[#DC143C] hover:bg-[#c11235] cursor-pointer text-white py-3 rounded-xl font-semibold text-base transition"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </motion.aside>
  );
};

export default CartSidebar;
