"use client";

import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiSearch, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import CartSidebar from "../cart/Cart";

export default function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="bg-[#DC143C] shadow-md sticky top-0 z-40">
      <div className="sm:w-11/12 mx-auto max-sm:px-2 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Website name */}
          <Link href="/" className="text-xl font-bold text-white">
            NextShop
          </Link>

          {/* Middle: Search bar on tablet+, hidden on mobile */}
          <div className="hidden md:flex flex-grow mx-6 max-w-3xl">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full border border-white bg-[#DC143C] text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          {/* Right: Cart icon + search icon */}
          <div className="flex items-center space-x-4">
            {/* Search icon visible only on mobile */}
            <button
              className="md:hidden p-2 rounded-md hover:text-gray-400 transition"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Toggle search"
            >
              <FiSearch size={24} color="white" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-md cursor-pointer hover:text-gray-400 transition"
                aria-label="Cart"
              >
                <FiShoppingCart size={24} color="white" />
              </button>
              <Link href={"/order"}>
                <button
                  className="p-2 rounded-md cursor-pointer hover:text-gray-400 transition"
                  aria-label="Order"
                >
                  <FiShoppingBag size={24} color="white" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile search bar dropdown */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-2 overflow-hidden"
            >
              <input
                type="search"
                placeholder="Search products..."
                className="w-full border border-white bg-[#cc5500] text-white placeholder-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white transition"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
    </nav>
  );
}
