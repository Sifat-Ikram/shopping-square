"use client";

import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { RootState } from "@/lib/redux/store";
import { placeOrder } from "@/lib/redux/slices/orderSlice";
import { clearCart } from "@/lib/redux/slices/cartSlice";
import { clearCheckout } from "@/lib/redux/slices/checkoutSlice";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  address: string;
  phone: string;
}

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = (data: FormData) => {
    dispatch(
      placeOrder({
        id: uuidv4(),
        name: data.name,
        address: data.address,
        phone: data.phone,
        items: cart,
        total,
        date: new Date().toISOString(),
      })
    );

    Swal.fire({
      icon: "success",
      title: "Order Placed",
      text: "Your order has been placed successfully!",
      confirmButtonColor: "#DC143C",
    });
    router.push("/")
    dispatch(clearCart());
    dispatch(clearCheckout());
    reset();
  };

  return (
    <div>
      {cart.length === 0 ? (
        <p className="text-lg font-medium text-center mt-10">
          There is no items in the cart
        </p>
      ) : (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-[#DC143C]">
            Checkout
          </h1>

          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-10"
          >
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4"
                >
                  <div>
                    <p className="text-md font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[#DC143C] font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right text-lg font-bold">
              Total:{" "}
              <span className="text-[#DC143C]">{total.toFixed(2)} BDT</span>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-10 sm:gap-3 md:gap-8"
          >
            {/* Left: Form inputs */}
            <div className="w-full sm:w-3/5 space-y-4">
              <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

              <div className="w-full">
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1">
                  Shipping Address
                </label>
                <textarea
                  {...register("address", { required: true })}
                  rows={3}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                  placeholder="123 Main Street, City, Country"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    Address is required
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  {...register("phone", { required: true })}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    Phone number is required
                  </p>
                )}
              </div>
            </div>

            {/* Right: Shipping summary + total + button */}
            <div className="w-full sm:flex-1 flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-4">
                Confirm Shipping Info
              </h2>
              <div className="bg-gray-50 p-4 space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {watch("name") || "—"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {watch("address") || "—"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {watch("phone") || "—"}
                </p>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span>Total:</span>
                  <span>{total.toFixed(2)} BDT</span>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-[#DC143C] cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-[#c11235] transition"
              >
                Place Order
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}
