"use client";

import React, { useEffect, useMemo, useState } from "react";
import FilterSidebar, { Filters } from "./FilterSidebar";
import Product from "@/types/Product";
import { useProducts } from "@/lib/hooks/useProducts";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";

interface ProductListProps {
  initialProducts: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ initialProducts }) => {
  // Use hook with initialData for hydration & client refetch
  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProducts({ initialData: initialProducts });
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  useEffect(() => {
    if (searchQuery) {
      setFilters((prev) => ({ ...prev, title: searchQuery }));
    }
  }, [searchQuery]);

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

  const handleSidebar = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  if (isLoading)
    return <div className="p-4 text-center">Loading products...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load products.
      </div>
    );

  return (
    <section className="relative flex flex-col gap-6 w-full min-h-screen border-t-[1px] border-gray-200">
      {/* Top Bar: Filter Toggle + Sort */}
      <div className="w-full flex items-center justify-between px-2 py-3 border-b border-gray-200 sm:hidden">
        {/* Filter Menu Icon */}
        <button
          onClick={handleSidebar}
          className="text-[#DC143C] text-lg flex items-center gap-1"
        >
          <FaBars /> Filters
        </button>
      </div>

      {/* Drawer Sidebar for Mobile */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-[90]"
            />

            {/* Drawer Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-[100] w-4/5 max-w-xs h-full bg-white shadow-lg border-r border-gray-200 p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#DC143C]">
                  Filters
                </h2>
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
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        {/* Sidebar Filter */}
        <div className="w-1/4 hidden md:block sticky top-[67px] self-start">
          <FilterSidebar categories={categories} onFilterChange={setFilters} />
        </div>

        {/* Product Grid */}
        <div className="flex-1 flex flex-col space-y-8 p-1 sm:p-2 md:p-3 lg:p-5">
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#DC143C]">
            Featured Products
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-2 lg:gap-4 xl:gap-6 w-full">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
