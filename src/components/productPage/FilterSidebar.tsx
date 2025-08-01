"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

export interface Filters {
  title: string;
  priceMin: number;
  priceMax: number;
  category: string;
  rating: number;
}

interface FilterProps {
  categories: string[];
  onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterProps> = ({
  categories,
  onFilterChange,
}) => {
  const defaultFilters: Filters = {
    title: "",
    priceMin: 0,
    priceMax: 1000,
    category: "",
    rating: 0,
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col space-y-7 md:space-y-5 w-full bg-white text-sm sm:text-base text-gray-800 flex-shrink-0
            p-4 md:p-2 lg:p-4 md:border-r md:border-gray-200"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-base lg:text-lg font-bold text-[#DC143C]">Filter Products</h2>
        <button
          aria-label="Reset filters"
          onClick={resetFilters}
          className="text-[#DC143C] text-sm lg:text-lg hover:text-red-600 transition"
        >
          <FiRefreshCw size={22} />
        </button>
      </div>

      <div className="flex flex-col space-y-5 px-2">
        {/* Title Search */}
        <div className="">
          <label className="block mb-1 font-medium">Search by title</label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
        </div>

        {/* Price Range */}
        <div className="">
          <label className="block mb-1 font-medium">
            Price: {filters.priceMin} - {filters.priceMax}
          </label>
          <input
            type="range"
            min={0}
            max={1000}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: parseInt(e.target.value) })
            }
            className="w-full accent-[#DC143C]"
          />
        </div>

        {/* Category Select */}
        <div className="">
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-3">
          <label className="block mb-2 font-medium">Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={20}
                className={`cursor-pointer transition ${
                  filters.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setFilters({ ...filters, rating: star })}
              />
            ))}
            <span className="ml-2 text-xs sm:text-sm text-gray-500">
              or higher
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default FilterSidebar;
