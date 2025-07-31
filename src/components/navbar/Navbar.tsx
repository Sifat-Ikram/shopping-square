"use client";

import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <nav className="bg-[#cc5500] shadow-md px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Website name */}
        <Link href="/" className="text-xl font-bold text-white">
          NextShop
        </Link>

        {/* Middle: Search bar on tablet+, hidden on mobile */}
        <div className="hidden md:flex flex-grow mx-6 max-w-3xl">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full border border-white bg-[#cc5500] text-white placeholder-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white transition"
          />
        </div>

        {/* Right: Cart icon + search icon */}
        <div className="flex items-center space-x-4">
          {/* Search icon visible only on mobile */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-orange-600 transition"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle search"
          >
            <FiSearch size={24} color="white" />
          </button>

          {/* Cart icon */}
          <button
            className="p-2 rounded-md hover:bg-orange-600 transition"
            aria-label="Cart"
          >
            <FiShoppingCart size={24} color="white" />
          </button>
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
    </nav>
  );
}
