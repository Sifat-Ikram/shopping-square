"use client";
import { useProducts } from "@/lib/hooks/useProducts";
import Product from "@/types/Product";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { notFound } from "next/navigation";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";

interface ProductDetailProps {
  slug: string;
  initialProducts: Product[];
}

const ProductDetailPage = ({ slug, initialProducts }: ProductDetailProps) => {
  const { products, isLoading, isError } = useProducts({
    initialData: initialProducts,
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const product = products?.find(
    (p) =>
      p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  );

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rate >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError || !product) return notFound();

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#DC143C] text-center">
        {product.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Image */}
        <motion.div
          className="relative w-full aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            priority
          />
        </motion.div>

        <AnimatePresence>
          {isZoomed && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-zoom-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Info */}
        <motion.div
          className="space-y-4 text-gray-800"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-xl font-bold text-[#DC143C]">
            BDT {product.price.toFixed(2)}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex">{renderStars(product.rating.rate)}</div>
            <span>
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Call-to-Action Buttons (optional future use) */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button className="bg-[#DC143C] text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all text-sm sm:text-base">
              Add to Cart
            </button>
            <button className="border border-[#DC143C] text-[#DC143C] px-5 py-2 rounded-lg hover:bg-[#DC143C]/10 transition-all text-sm sm:text-base">
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
