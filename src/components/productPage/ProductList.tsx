"use client";

import React, { useMemo, useState } from "react";
import FilterSidebar, { Filters } from "./FilterSidebar";
import Product from "@/types/Product";
import { useProducts } from "@/lib/hooks/useProducts";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface ProductListProps {
  initialProducts: Product[];
  categories: string[];
}

const ProductList: React.FC<ProductListProps> = ({ initialProducts }) => {
  // Use hook with initialData for hydration & client refetch
  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProducts({ initialData: initialProducts });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"low" | "high" | "">("");

  // Filter state managed here (can also lift up if needed)
  const [filters, setFilters] = useState<Filters>({
    title: "",
    priceMin: 0,
    priceMax: 1000,
    category: "",
    rating: 0,
  });

  const categories = useMemo(() => {
    const set = new Set(products?.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    return (
      products?.filter((p) => {
        const matchTitle = p.title
          .toLowerCase()
          .includes(filters.title.toLowerCase());
        const matchPrice =
          p.price >= filters.priceMin && p.price <= filters.priceMax;
        const matchCategory =
          filters.category === "" || p.category === filters.category;
        const matchRating = Math.round(p.rating.rate) >= filters.rating;
        return matchTitle && matchPrice && matchCategory && matchRating;
      }) || []
    );
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOrder === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortOrder]);

  console.log(sortedProducts);

  if (isLoading)
    return <div className="p-4 text-center">Loading products...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load products.
      </div>
    );

  return (
    <section className="flex flex-col gap-6 w-full border-t-[1px] border-gray-200">
      {/* Top Bar: Filter Toggle + Sort */}
      <div className="w-full flex items-center justify-between px-2 py-3 bg-[#DC143C] text-white">
        {/* Filter Menu Icon */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="text-[#DC143C] text-xl"
        >
          <FaBars />
        </button>

        {/* Sort Select */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "low" | "high" | "")}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC143C]"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Drawer Sidebar for Mobile */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 w-4/5 max-w-xs h-full bg-white shadow-lg border-r border-gray-200 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#DC143C]">Filters</h2>
              <button
                className="text-gray-500 text-lg"
                onClick={() => setIsDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <FilterSidebar
              categories={categories}
              onFilterChange={(filters) => {
                setFilters(filters);
                setIsDrawerOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Filter */}
      <div className="w-1/5 hidden md:block">
        <FilterSidebar categories={categories} onFilterChange={setFilters} />
      </div>

      {/* Product Grid */}
    </section>
  );
};

export default ProductList;

{
  /* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div> */
}
